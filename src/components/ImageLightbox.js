import React, { useState, useCallback, createContext, useContext } from 'react';
import { Box, IconButton, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import { motion, AnimatePresence } from 'framer-motion';

const LightboxContext = createContext();

export function LightboxProvider({ children }) {
  const [state, setState] = useState({ open: false, src: '', alt: '', caption: '' });

  const openLightbox = useCallback((src, alt, caption) => {
    setState({ open: true, src, alt, caption: caption || alt });
    document.body.style.overflow = 'hidden';
  }, []);

  const closeLightbox = useCallback(() => {
    setState((s) => ({ ...s, open: false }));
    document.body.style.overflow = '';
  }, []);

  return (
    <LightboxContext.Provider value={openLightbox}>
      {children}
      <AnimatePresence>
        {state.open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            style={{
              position: 'fixed', inset: 0, zIndex: 9999,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}
          >
            {/* Backdrop */}
            <Box
              onClick={closeLightbox}
              sx={{
                position: 'absolute', inset: 0,
                background: 'rgba(4,8,16,0.92)',
                backdropFilter: 'blur(20px)',
              }}
            />

            {/* Close button */}
            <IconButton
              onClick={closeLightbox}
              sx={{
                position: 'absolute', top: 20, right: 20, zIndex: 2,
                color: '#fff', background: 'rgba(255,255,255,0.08)',
                '&:hover': { background: 'rgba(255,255,255,0.15)' },
              }}
            >
              <CloseIcon />
            </IconButton>

            {/* Image */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
              style={{ position: 'relative', zIndex: 1, maxWidth: '92vw', maxHeight: '88vh' }}
            >
              <img
                src={state.src}
                alt={state.alt}
                style={{
                  maxWidth: '92vw',
                  maxHeight: '82vh',
                  objectFit: 'contain',
                  borderRadius: '12px',
                  boxShadow: '0 24px 80px rgba(0,0,0,0.6)',
                }}
              />
              {state.caption && (
                <Typography
                  variant="body2"
                  sx={{
                    textAlign: 'center', mt: 2,
                    color: 'rgba(255,255,255,0.6)',
                    fontSize: '0.85rem',
                  }}
                >
                  {state.caption}
                </Typography>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </LightboxContext.Provider>
  );
}

export function useLightbox() {
  return useContext(LightboxContext);
}

/* ── Known image dimensions (prevents CLS) ── */
const IMAGE_DIMS = {
  '/benchmarks/ucognet_01_test_coverage.png': [2352, 1127],
  '/benchmarks/ucognet_02_regime_radar.png': [1859, 1591],
  '/benchmarks/ucognet_03_confidence_signals.png': [3045, 1245],
  '/benchmarks/ucognet_04_routing_heatmap.png': [1743, 1027],
  '/benchmarks/ucognet_05_reward_composition.png': [2394, 1188],
  '/benchmarks/ucognet_07_evidence_asymmetry.png': [2833, 1245],
  '/benchmarks/ucognet_08_mutation_intensity.png': [3051, 1245],
  '/benchmarks/ucognet_09_rollout_pipeline.png': [2610, 1624],
  '/benchmarks/ucognet_11_architecture_pyramid.png': [2089, 1540],
  '/benchmarks/ucognet_12_shaping_guardrails.png': [3053, 1245],
  '/benchmarks/ucognet_14_integration_flow.png': [2430, 1371],
  '/benchmarks/ucognet_15_capability_boundaries.png': [1748, 1492],
  '/benchmarks/fig01_module_radar.png': [2649, 2246],
  '/benchmarks/fig02_campaign_heatmap.png': [3059, 1677],
  '/benchmarks/fig05_ablation_study.png': [2530, 1615],
  '/benchmarks/fig06_energy_trajectories.png': [4770, 1527],
  '/benchmarks/fig09_budget_pareto.png': [2278, 1647],
  '/benchmarks/fig10_symbiosis_matrix.png': [2356, 1960],
};

/** Clickable image wrapper — shows zoom icon on hover, opens lightbox on click.
 *  `priority` — set on the LCP / above-fold image to disable lazy-load & boost fetch priority.
 */
export default function ClickableImage({ src, alt, caption, sx, imgStyle, priority, ...props }) {
  const openLightbox = useLightbox();
  const dims = IMAGE_DIMS[src];
  const [w, h] = dims || [];
  const webpSrc = src.endsWith('.png') ? src.replace('.png', '.webp') : null;

  return (
    <Box
      onClick={() => openLightbox(src, alt, caption)}
      sx={{
        position: 'relative',
        cursor: 'zoom-in',
        overflow: 'hidden',
        '&:hover .zoom-overlay': { opacity: 1 },
        '&:hover img': { transform: 'scale(1.015)' },
        ...sx,
      }}
      {...props}
    >
      <picture>
        {webpSrc && <source srcSet={webpSrc} type="image/webp" />}
        <img
          src={src}
          alt={alt}
          width={w}
          height={h}
          loading={priority ? undefined : 'lazy'}
          decoding={priority ? 'sync' : 'async'}
          fetchPriority={priority ? 'high' : undefined}
          style={{
            width: '100%',
            height: 'auto',
            display: 'block',
            transition: 'transform 0.4s ease',
            ...imgStyle,
          }}
        />
      </picture>
      <Box
        className="zoom-overlay"
        sx={{
          position: 'absolute', inset: 0,
          background: 'rgba(0,180,216,0.06)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          opacity: 0,
          transition: 'opacity 0.3s ease',
        }}
      >
        <Box sx={{
          width: 44, height: 44, borderRadius: '50%',
          background: 'rgba(0,0,0,0.5)',
          backdropFilter: 'blur(8px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          border: '1px solid rgba(255,255,255,0.15)',
        }}>
          <ZoomInIcon sx={{ color: '#fff', fontSize: 22 }} />
        </Box>
      </Box>
    </Box>
  );
}
