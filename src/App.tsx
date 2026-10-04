import React, { useState } from 'react';
import {
  AppLayer,
  DesignMode,
  ViewportMode,
  UiState,
  SystemZone
} from './types';
import { WireframeToolbar } from './components/wireframe/WireframeToolbar';
import { Header } from './components/common/Header';
import { Footer } from './components/common/Footer';
import { L0LoginView } from './components/views/L0LoginView';
import { L1HubView } from './components/views/L1HubView';
import { L2UnitView } from './components/views/L2UnitView';
import { L3SupervisionView } from './components/views/L3SupervisionView';
import { L3FeedbackMgmtView } from './components/views/L3FeedbackMgmtView';
import { PublicHomeView } from './components/views/PublicHomeView';
import { RepresentationView } from './components/views/RepresentationView';
import { CommunityMapTdpView } from './components/views/CommunityMapTdpView';
import { TdpDetailView } from './components/views/TdpDetailView';
import { PublicFeedbackView } from './components/views/PublicFeedbackView';
import { PrdBlueprintView } from './components/views/PrdBlueprintView';
import { VisualNewsPortalView } from './components/views/VisualNewsPortalView';
import { AlertCircle, RefreshCw, Smartphone } from 'lucide-react';

export default function App() {
  // Default to VISUAL_PORTAL as requested by the user ("Quá nhiều text, hãy cho tôi wireframe FE dạng nhiều tin tức. Có nhiều hình ảnh trực quan.")
  const [currentLayer, setCurrentLayer] = useState<AppLayer>('VISUAL_PORTAL');
  const [designMode, setDesignMode] = useState<DesignMode>('HI_FI_SYSTEM');
  const [viewportMode, setViewportMode] = useState<ViewportMode>('DESKTOP');
  const [isLargeText, setIsLargeText] = useState(false);
  const [uiState, setUiState] = useState<UiState>('DEFAULT');
  const [showAnnotations, setShowAnnotations] = useState(true);

  // Contextual params
  const [activeTdpId, setActiveTdpId] = useState<number>(8);

  // Determine current system zone
  const getZone = (layer: AppLayer): SystemZone => {
    if (['L0_LOGIN', 'L1_HUB', 'L2_MTTQ_UNIT', 'L3_SUPERVISION', 'L3_FEEDBACK_MGMT'].includes(layer)) {
      return 'GOVERNANCE';
    }
    return 'PUBLIC';
  };

  const currentZone = getZone(currentLayer);

  // Navigation handlers
  const handleNavigate = (layer: AppLayer) => {
    setCurrentLayer(layer);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectTdp = (tdpId: number) => {
    setActiveTdpId(tdpId);
    setCurrentLayer('W7_TDP_DETAIL');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSendFeedbackForTdp = (tdpId: number) => {
    setActiveTdpId(tdpId);
    setCurrentLayer('W14_MAILBOX');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Render view body
  const renderCurrentView = () => {
    // If simulated UI state is ERROR
    if (uiState === 'ERROR') {
      return (
        <div className="py-16 text-center space-y-4 max-w-md mx-auto">
          <div className="w-14 h-14 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto">
            <AlertCircle className="w-8 h-8" />
          </div>
          <h3 className="text-base font-bold text-slate-900">
            Lỗi kết nối máy chủ điều hành (503 Service Unavailable)
          </h3>
          <p className="text-xs text-slate-500">
            Không thể tải dữ liệu phân hệ {currentLayer}. Vui lòng kiểm tra lại đường truyền mạng hoặc liên hệ quản trị viên.
          </p>
          <button
            onClick={() => setUiState('DEFAULT')}
            className="px-4 py-2 bg-red-600 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 mx-auto"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Thử lại ngay</span>
          </button>
        </div>
      );
    }

    // If simulated UI state is LOADING (Skeleton)
    if (uiState === 'LOADING') {
      return (
        <div className="space-y-4 animate-pulse">
          <div className="h-8 bg-slate-200 rounded w-1/3" />
          <div className="h-4 bg-slate-100 rounded w-1/2" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
            <div className="h-48 bg-slate-100 rounded-xl" />
            <div className="h-48 bg-slate-100 rounded-xl" />
            <div className="h-48 bg-slate-100 rounded-xl" />
          </div>
          <div className="h-64 bg-slate-100 rounded-xl" />
        </div>
      );
    }

    // Normal rendering
    switch (currentLayer) {
      case 'VISUAL_PORTAL':
        return (
          <VisualNewsPortalView
            designMode={designMode}
            uiState={uiState}
            onNavigate={handleNavigate}
            onSelectTdp={handleSelectTdp}
          />
        );
      case 'L0_LOGIN':
        return (
          <L0LoginView
            designMode={designMode}
            uiState={uiState}
            showAnnotations={showAnnotations}
            onLoginSuccess={() => handleNavigate('L1_HUB')}
            onGoToPublic={() => handleNavigate('W1_PUBLIC_HOME')}
          />
        );
      case 'L1_HUB':
        return (
          <L1HubView
            designMode={designMode}
            uiState={uiState}
            showAnnotations={showAnnotations}
            onNavigate={handleNavigate}
          />
        );
      case 'L2_MTTQ_UNIT':
        return (
          <L2UnitView
            designMode={designMode}
            uiState={uiState}
            showAnnotations={showAnnotations}
            onNavigate={handleNavigate}
          />
        );
      case 'L3_SUPERVISION':
        return (
          <L3SupervisionView
            designMode={designMode}
            uiState={uiState}
            showAnnotations={showAnnotations}
            onNavigateToFeedback={() => handleNavigate('L3_FEEDBACK_MGMT')}
          />
        );
      case 'L3_FEEDBACK_MGMT':
        return (
          <L3FeedbackMgmtView
            designMode={designMode}
            uiState={uiState}
            showAnnotations={showAnnotations}
          />
        );
      case 'W1_PUBLIC_HOME':
        return (
          <PublicHomeView
            designMode={designMode}
            uiState={uiState}
            showAnnotations={showAnnotations}
            onNavigate={handleNavigate}
            onSelectTdp={handleSelectTdp}
          />
        );
      case 'W4_REPRESENTATION':
      case 'W5_MEMBER_ORGS':
        return (
          <RepresentationView
            designMode={designMode}
            uiState={uiState}
            showAnnotations={showAnnotations}
            onSelectTdp={handleSelectTdp}
          />
        );
      case 'W6_TDP_MAP':
        return (
          <CommunityMapTdpView
            designMode={designMode}
            uiState={uiState}
            showAnnotations={showAnnotations}
            onSelectTdp={handleSelectTdp}
            onSendFeedbackForTdp={handleSendFeedbackForTdp}
          />
        );
      case 'W7_TDP_DETAIL':
        return (
          <TdpDetailView
            tdpId={activeTdpId}
            designMode={designMode}
            uiState={uiState}
            showAnnotations={showAnnotations}
            onBackToMap={() => handleNavigate('W6_TDP_MAP')}
            onGoToMailbox={handleSendFeedbackForTdp}
          />
        );
      case 'W14_MAILBOX':
        return (
          <PublicFeedbackView
            initialTdpId={activeTdpId}
            designMode={designMode}
            uiState={uiState}
            showAnnotations={showAnnotations}
            onBackToHome={() => handleNavigate('W1_PUBLIC_HOME')}
            onGoToTdp={handleSelectTdp}
          />
        );
      case 'PRD_BLUEPRINT':
        return (
          <PrdBlueprintView
            designMode={designMode}
            onNavigate={handleNavigate}
          />
        );
      default:
        return <PublicHomeView designMode={designMode} uiState={uiState} showAnnotations={showAnnotations} onNavigate={handleNavigate} onSelectTdp={handleSelectTdp} />;
    }
  };

  return (
    <div className={`min-h-screen flex flex-col font-sans transition-all ${
      isLargeText ? 'text-[115%]' : ''
    } ${
      designMode === 'LO_FI_WIREFRAME' ? 'bg-slate-100/70 grayscale-[25%]' : 'bg-slate-50'
    }`}>
      {/* 1. Universal Wireframe & Architecture Controller Toolbar */}
      <WireframeToolbar
        currentLayer={currentLayer}
        onSelectLayer={handleNavigate}
        designMode={designMode}
        onToggleDesignMode={setDesignMode}
        viewportMode={viewportMode}
        onToggleViewportMode={setViewportMode}
        isLargeText={isLargeText}
        onToggleLargeText={() => setIsLargeText(!isLargeText)}
        uiState={uiState}
        onSelectUiState={setUiState}
        showAnnotations={showAnnotations}
        onToggleAnnotations={() => setShowAnnotations(!showAnnotations)}
      />

      {/* 2. Viewport Simulator Handler (Desktop 1440px vs Mobile 390px) */}
      {viewportMode === 'MOBILE' ? (
        <div className="flex-1 py-8 px-4 flex flex-col items-center justify-center bg-slate-950">
          <div className="mb-3 text-center text-xs text-slate-400 flex items-center gap-1.5">
            <Smartphone className="w-4 h-4 text-emerald-400" />
            <span>Mô phỏng thiết bị di động (Mobile Viewport: 390px) — Trải nghiệm quét mã QR tại bảng tin TDP</span>
          </div>

          {/* Realistic iPhone / Mobile Bezel Container */}
          <div className="w-[390px] h-[844px] bg-white rounded-[44px] shadow-2xl border-[10px] border-slate-800 flex flex-col overflow-hidden relative ring-1 ring-white/10">
            {/* Mobile notch / Dynamic island */}
            <div className="w-full h-8 bg-black flex items-center justify-between px-6 text-[11px] text-white font-medium select-none shrink-0 z-50">
              <span>9:41</span>
              <div className="w-20 h-4 bg-slate-900 rounded-full mx-auto" />
              <div className="flex items-center gap-1">
                <span>5G</span>
                <span>100%</span>
              </div>
            </div>

            {/* Scrollable Mobile Content */}
            <div className="flex-1 overflow-y-auto overflow-x-hidden flex flex-col">
              <Header
                zone={currentZone}
                currentLayer={currentLayer}
                onNavigate={handleNavigate}
                designMode={designMode}
                isLargeText={isLargeText}
                onToggleLargeText={() => setIsLargeText(!isLargeText)}
              />
              <main className="flex-1 p-4">
                {renderCurrentView()}
              </main>
              <Footer designMode={designMode} />
            </div>

            {/* Home indicator bar */}
            <div className="w-32 h-1 bg-slate-400 rounded-full mx-auto my-1.5 shrink-0" />
          </div>
        </div>
      ) : currentLayer === 'VISUAL_PORTAL' ? (
        /* Full Dedicated Visual Portal View (Matching Page FE.jpg with native sidebar, header, footer) */
        <div className="flex-1 flex flex-col">
          {renderCurrentView()}
        </div>
      ) : (
        /* Full Desktop Experience (1440px) for Other Layers */
        <div className="flex-1 flex flex-col">
          <Header
            zone={currentZone}
            currentLayer={currentLayer}
            onNavigate={handleNavigate}
            designMode={designMode}
            isLargeText={isLargeText}
            onToggleLargeText={() => setIsLargeText(!isLargeText)}
          />

          <main className="flex-1 max-w-7xl w-full mx-auto px-4 py-6">
            {renderCurrentView()}
          </main>

          <Footer designMode={designMode} />
        </div>
      )}
    </div>
  );
}
