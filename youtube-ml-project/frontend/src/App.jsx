import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Swal from 'sweetalert2';
import Hero from './components/Hero';
import HowItWorks from './components/HowItWorks';
import InputForm from './components/InputForm';
import LoadingState from './components/LoadingState';
import PredictionCards from './components/PredictionCards';
import Charts from './components/Charts';
import AIExplanation from './components/AIExplanation';
import WhatIfPanel from './components/WhatIfPanel';
import { predictVideo } from './api/predict';

function computeLocalExtras(formData, scaleRatio = 1) {
  const title = formData.title || '';
  const description = formData.description || '';
  const tags = formData.tags || '';
  const lower = title.toLowerCase();
  
  // Sentiment
  const pos = ['amazing','best','great','awesome','top','ultimate','new','incredible','master','unlock','transform'];
  const neg = ['worst','bad','fail','never','stop','avoid','terrible'];
  let sent = 0;
  pos.forEach(w => { if (lower.includes(w)) sent += 0.2; });
  neg.forEach(w => { if (lower.includes(w)) sent -= 0.2; });
  sent = Math.max(-1, Math.min(1, sent));

  // Clickbait
  const power = ['shocking','unbelievable','secret','exposed','amazing','insane','ultimate','truth','never','must watch', 'reasons', 'top', 'why'];
  let cb = 0;
  const words = title.split(' ');
  const caps = words.filter(w => w === w.toUpperCase() && w.length > 1).length / (words.length || 1);
  cb += caps * 2;
  if (/\d/.test(title)) cb += 1.5;
  cb += (title.match(/!/g) || []).length * 1.0;
  power.forEach(w => { if (lower.includes(w)) cb += 2; });
  if (title.includes('?')) cb += 1.5;
  const tl = title.length;
  cb += Math.max(0, 1 - Math.abs(tl - 60) / 60);
  cb = Math.min(10, Math.round(cb * 10) / 10);

  // SEO
  let seo = 0;
  if (tl >= 50 && tl <= 70) seo += 25; else seo += Math.max(0, 25 - Math.abs(tl - 60) / 2);
  const dl = description.length;
  seo += dl > 250 ? 25 : (dl / 250) * 25;
  const tagList = tags.includes('|') ? tags.split('|') : tags.split(',');
  seo += Math.min(tagList.filter(t => t.trim()).length, 12) * 1.5;
  const tSet = new Set(lower.split(' '));
  const dSet = new Set(description.toLowerCase().split(' '));
  const overlap = [...tSet].filter(w => dSet.has(w)).length;
  if (tSet.size > 0) seo += (overlap / tSet.size) * 15;
  seo = Math.min(80, Math.round(seo * 10) / 10);

  return { title_sentiment: sent, clickbait_score: cb, seo_score: seo };
}

export default function App() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState(null);
  const [extras, setExtras] = useState(null);
  
  // Theme Toggle State
  const [isLight, setIsLight] = useState(false);

  useEffect(() => {
    if (isLight) document.body.classList.add('light-mode');
    else document.body.classList.remove('light-mode');
  }, [isLight]);

  const howRef = useRef(null);
  const formRef = useRef(null);
  const resRef = useRef(null);

  const scrollHow = () => howRef.current?.scrollIntoView({ behavior: 'smooth' });
  const scrollForm = () => formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });

  const handleSubmit = async (data) => {
    setFormData(data); setLoading(true); setResult(null);
    setExtras(computeLocalExtras(data));

    setTimeout(() => resRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 200);

    try {
      const payload = {
        title: data.title, description: data.description, tags: data.tags,
        video_length: Number(data.video_length), category_id: data.category_id,
        upload_hour: Number(data.upload_hour),
      };

      const res = await predictVideo(payload);
      const subsRatio = Math.max(1, data.channel_subscriber_count / 100000);
      res.predicted_likes *= subsRatio;

      await new Promise(r => setTimeout(r, 1500));
      setResult(res); setLoading(false);
      setTimeout(() => resRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100);
    } catch (err) {
      setLoading(false);
      Swal.fire({
        icon: 'error', title: 'Analysis Failed', text: err?.response?.data?.detail || 'Could not reach backend.',
        background: isLight ? '#fff' : '#1A1A1A', color: isLight ? '#000' : '#fff', confirmButtonColor: '#E11D48',
      });
    }
  };

  const handleReset = () => { setResult(null); setFormData(null); setExtras(null); setTimeout(() => scrollForm(), 100); };

  return (
    <>
      <nav className="navbar">
        <a href="#" className="nav-logo">
          <div className="logo-icon">IQ</div>
          CreatorAI
        </a>
        <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
          <ul className="nav-links">
            <li><a onClick={scrollHow}>How it Works</a></li>
            <li><a onClick={scrollForm}>Analyzer</a></li>
          </ul>
          <button className="theme-toggle" onClick={() => setIsLight(!isLight)} title="Toggle Dark/Light Mode">
            {isLight ? '🌙' : '☀️'}
          </button>
        </div>
      </nav>

      <Hero onStart={scrollForm} onHowItWorks={scrollHow} />
      <div ref={howRef}><HowItWorks /></div>
      <div ref={formRef}><InputForm onSubmit={handleSubmit} loading={loading} /></div>

      <div ref={resRef} style={{ minHeight: loading || result ? '100vh' : 0 }}>
        <AnimatePresence mode="wait">
          {loading && (
            <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <LoadingState />
            </motion.div>
          )}

          {result && !loading && (
            <motion.div key="results" className="results-section" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <div className="card-glass" style={{ padding: '36px 40px', borderRadius: 20, marginBottom: 40, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
                <div>
                  <div className="section-tag" style={{ color: 'var(--good)', margin: 0 }}>Analysis Complete</div>
                  <h2 style={{ fontFamily: 'Space Grotesk', fontSize: '1.8rem', fontWeight: 800 }}>Video Prediction</h2>
                  <p style={{ color: 'var(--text-soft)' }}>For "{formData?.title}"</p>
                </div>
                <button className="btn-ghost" onClick={handleReset}>↩ Analyze New Video</button>
              </div>

              <PredictionCards result={result} extras={extras} />
              <Charts result={result} extras={extras} formData={formData} isLight={isLight} />
              <AIExplanation result={result} formData={formData} extras={extras} />
              <WhatIfPanel baseLikes={result.predicted_likes} baseEngagement={result.engagement_rate} formData={formData} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <footer style={{ padding: '48px 60px', borderTop: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', color: 'var(--muted)', fontSize: '0.9rem' }}>
        <div>
          <strong style={{ color: 'var(--text)', fontFamily: 'Space Grotesk' }}>CreatorAI</strong>
          <div style={{ marginTop: 4 }}>© 2026 AI-Powered Creator Tools. Predict your potential.</div>
        </div>
        <div style={{ display: 'flex', gap: 24 }}>
          <a style={{ cursor: 'pointer' }}>Privacy</a>
          <a style={{ cursor: 'pointer' }}>Terms</a>
        </div>
      </footer>
    </>
  );
}
