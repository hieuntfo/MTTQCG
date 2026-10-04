import React from 'react';
import {
  AppLayer,
  DesignMode,
  ViewportMode,
  UiState
} from '../../types';
import {
  Layers,
  Smartphone,
  Monitor,
  Type,
  Eye,
  Sliders,
  FileText,
  ShieldCheck,
  Users,
  Compass,
  AlertCircle,
  Newspaper
} from 'lucide-react';

interface WireframeToolbarProps {
  currentLayer: AppLayer;
  onSelectLayer: (layer: AppLayer) => void;
  designMode: DesignMode;
  onToggleDesignMode: (mode: DesignMode) => void;
  viewportMode: ViewportMode;
  onToggleViewportMode: (mode: ViewportMode) => void;
  isLargeText: boolean;
  onToggleLargeText: () => void;
  uiState: UiState;
  onSelectUiState: (state: UiState) => void;
  showAnnotations: boolean;
  onToggleAnnotations: () => void;
}

export const WireframeToolbar: React.FC<WireframeToolbarProps> = ({
  currentLayer,
  onSelectLayer,
  designMode,
  onToggleDesignMode,
  viewportMode,
  onToggleViewportMode,
  isLargeText,
  onToggleLargeText,
  uiState,
  onSelectUiState,
  showAnnotations,
  onToggleAnnotations,
}) => {
  return (
    <div className="bg-slate-900 border-b border-slate-800 text-white px-3 py-2 sticky top-0 z-50 text-xs shadow-md select-none print:hidden">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
        {/* Layer Quick Selectors */}
        <div className="flex items-center gap-2 overflow-x-auto py-1 scrollbar-none">
          <div className="flex items-center gap-1 font-semibold text-slate-300 pr-2 border-r border-slate-700">
            <Layers className="w-4 h-4 text-red-500" />
            <span>LỚP TRANG:</span>
          </div>

          {/* Special Visual News Portal Wireframe (theo Page FE.jpg) */}
          <button
            onClick={() => onSelectLayer('VISUAL_PORTAL')}
            className={`px-3 py-1 rounded font-bold transition-all whitespace-nowrap flex items-center gap-1.5 shadow-xs ${
              currentLayer === 'VISUAL_PORTAL'
                ? 'bg-amber-400 text-slate-950 ring-2 ring-white/50'
                : 'bg-amber-500/20 text-amber-300 hover:bg-amber-500/30 border border-amber-500/40'
            }`}
            title="Wireframe FE Dạng nhiều tin tức & hình ảnh trực quan (theo Page FE.jpg)"
          >
            <Newspaper className="w-3.5 h-3.5" />
            <span>Màn hình FE Tin tức (Nhiều ảnh)</span>
          </button>

          {/* Group 1: Vùng điều hành (Governance) */}
          <div className="flex items-center gap-1 bg-slate-800/80 p-0.5 rounded border border-slate-700">
            <button
              onClick={() => onSelectLayer('L0_LOGIN')}
              className={`px-2 py-1 rounded transition-colors whitespace-nowrap ${
                currentLayer === 'L0_LOGIN'
                  ? 'bg-amber-600 text-white font-medium'
                  : 'text-slate-400 hover:text-white'
              }`}
              title="L0: Màn hình Đăng nhập cán bộ"
            >
              L0 Đăng nhập
            </button>
            <button
              onClick={() => onSelectLayer('L1_HUB')}
              className={`px-2 py-1 rounded transition-colors whitespace-nowrap ${
                currentLayer === 'L1_HUB'
                  ? 'bg-amber-600 text-white font-medium'
                  : 'text-slate-400 hover:text-white'
              }`}
              title="L1: Bảng điều hành Hub 4 trụ cột"
            >
              L1 Hub 4 trụ
            </button>
            <button
              onClick={() => onSelectLayer('L2_MTTQ_UNIT')}
              className={`px-2 py-1 rounded transition-colors whitespace-nowrap ${
                currentLayer === 'L2_MTTQ_UNIT'
                  ? 'bg-red-700 text-white font-medium'
                  : 'text-slate-400 hover:text-white'
              }`}
              title="L2: Trang UB MTTQ phường Cầu Giấy"
            >
              L2 UB MTTQ
            </button>
            <button
              onClick={() => onSelectLayer('L3_SUPERVISION')}
              className={`px-2.5 py-1 rounded transition-colors whitespace-nowrap flex items-center gap-1 ${
                currentLayer === 'L3_SUPERVISION'
                  ? 'bg-red-600 text-white font-bold ring-1 ring-white/30'
                  : 'text-amber-400 hover:text-white font-medium'
              }`}
              title="L3: Báo cáo giám sát & Thanh tra nhân dân (Trọng tâm yêu cầu)"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              L3 Báo cáo giám sát
            </button>
            <button
              onClick={() => onSelectLayer('L3_FEEDBACK_MGMT')}
              className={`px-2 py-1 rounded transition-colors whitespace-nowrap ${
                currentLayer === 'L3_FEEDBACK_MGMT'
                  ? 'bg-red-700 text-white font-medium'
                  : 'text-slate-400 hover:text-white'
              }`}
              title="L3: Xử lý ý kiến Hòm thư số (Cán bộ)"
            >
              L3 Xử lý ý kiến
            </button>
          </div>

          {/* Group 2: Vùng công khai cho dân (Public W-series) */}
          <div className="flex items-center gap-1 bg-slate-800/80 p-0.5 rounded border border-slate-700">
            <button
              onClick={() => onSelectLayer('W1_PUBLIC_HOME')}
              className={`px-2 py-1 rounded transition-colors whitespace-nowrap ${
                currentLayer === 'W1_PUBLIC_HOME'
                  ? 'bg-blue-600 text-white font-medium'
                  : 'text-slate-400 hover:text-white'
              }`}
              title="W1: Trang chủ công khai Cổng thông tin MTTQ"
            >
              W1 Cổng MTTQ
            </button>
            <button
              onClick={() => onSelectLayer('W4_REPRESENTATION')}
              className={`px-2.5 py-1 rounded transition-colors whitespace-nowrap flex items-center gap-1 ${
                currentLayer === 'W4_REPRESENTATION'
                  ? 'bg-blue-600 text-white font-bold ring-1 ring-white/30'
                  : 'text-sky-400 hover:text-white font-medium'
              }`}
              title="W4: Phân hệ Thông tin đại diện - Ban TT & 67 UV (Trọng tâm yêu cầu)"
            >
              <Users className="w-3.5 h-3.5" />
              W4 Thông tin đại diện
            </button>
            <button
              onClick={() => onSelectLayer('W5_MEMBER_ORGS')}
              className={`px-2 py-1 rounded transition-colors whitespace-nowrap ${
                currentLayer === 'W5_MEMBER_ORGS'
                  ? 'bg-blue-600 text-white font-medium'
                  : 'text-slate-400 hover:text-white'
              }`}
              title="W5: 12 Tổ chức thành viên"
            >
              W5 12 Tổ chức
            </button>
            <button
              onClick={() => onSelectLayer('W6_TDP_MAP')}
              className={`px-2.5 py-1 rounded transition-colors whitespace-nowrap flex items-center gap-1 ${
                currentLayer === 'W6_TDP_MAP'
                  ? 'bg-emerald-600 text-white font-bold'
                  : 'text-emerald-400 hover:text-white font-medium'
              }`}
              title="W6: Bản đồ số & 27 Ban CTMT Tổ dân phố (Epicenter)"
            >
              <Compass className="w-3.5 h-3.5" />
              W6 27 TDP
            </button>
            <button
              onClick={() => onSelectLayer('W7_TDP_DETAIL')}
              className={`px-2 py-1 rounded transition-colors whitespace-nowrap ${
                currentLayer === 'W7_TDP_DETAIL'
                  ? 'bg-emerald-600 text-white font-medium'
                  : 'text-slate-400 hover:text-white'
              }`}
              title="W7: Trang chi tiết TDP (Cửa vào từ QR)"
            >
              W7 Chi tiết TDP
            </button>
            <button
              onClick={() => onSelectLayer('W14_MAILBOX')}
              className={`px-2 py-1 rounded transition-colors whitespace-nowrap ${
                currentLayer === 'W14_MAILBOX'
                  ? 'bg-rose-600 text-white font-medium'
                  : 'text-slate-400 hover:text-white'
              }`}
              title="W14: Hòm thư số 'Lắng nghe Nhân dân nói'"
            >
              W14 Hòm thư số
            </button>
          </div>

          {/* Blueprint & Architecture */}
          <button
            onClick={() => onSelectLayer('PRD_BLUEPRINT')}
            className={`px-2.5 py-1 rounded flex items-center gap-1 transition-colors whitespace-nowrap ${
              currentLayer === 'PRD_BLUEPRINT'
                ? 'bg-purple-600 text-white font-bold'
                : 'bg-purple-950/60 text-purple-300 hover:bg-purple-900 border border-purple-800'
            }`}
            title="Xem Sơ đồ kiến trúc lớp trang & Đặc tả PRD"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Sơ đồ PRD & Design</span>
          </button>
        </div>

        {/* Controls: Mode, Viewport, Font Size, States, Annotations */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Style Mode: Lo-Fi Wireframe vs Hi-Fi System */}
          <div className="flex items-center bg-slate-800 p-0.5 rounded border border-slate-700">
            <button
              onClick={() => onToggleDesignMode('LO_FI_WIREFRAME')}
              className={`px-2 py-1 rounded transition-colors flex items-center gap-1 ${
                designMode === 'LO_FI_WIREFRAME'
                  ? 'bg-slate-200 text-slate-900 font-semibold'
                  : 'text-slate-400 hover:text-white'
              }`}
              title="Chế độ Wireframe Lo-Fi Grayscale (Đúng chuẩn W0 PRD)"
            >
              <span>Lo-Fi Xám</span>
            </button>
            <button
              onClick={() => onToggleDesignMode('HI_FI_SYSTEM')}
              className={`px-2 py-1 rounded transition-colors flex items-center gap-1 ${
                designMode === 'HI_FI_SYSTEM'
                  ? 'bg-red-600 text-white font-semibold'
                  : 'text-slate-400 hover:text-white'
              }`}
              title="Chế độ Giao diện hoàn chỉnh (Hi-Fi Hệ thống)"
            >
              <span>Hi-Fi Màu</span>
            </button>
          </div>

          {/* Viewport switch: Desktop 1440px vs Mobile 390px */}
          <div className="flex items-center bg-slate-800 p-0.5 rounded border border-slate-700">
            <button
              onClick={() => onToggleViewportMode('DESKTOP')}
              className={`p-1.5 rounded transition-colors ${
                viewportMode === 'DESKTOP'
                  ? 'bg-slate-700 text-white'
                  : 'text-slate-400 hover:text-white'
              }`}
              title="Xem giao diện Desktop 1440px"
            >
              <Monitor className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => onToggleViewportMode('MOBILE')}
              className={`p-1.5 rounded transition-colors ${
                viewportMode === 'MOBILE'
                  ? 'bg-slate-700 text-white'
                  : 'text-slate-400 hover:text-white'
              }`}
              title="Xem giao diện Mobile 390px (Mô phỏng điện thoại)"
            >
              <Smartphone className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Aa Font Size Button */}
          <button
            onClick={onToggleLargeText}
            className={`px-2 py-1 rounded flex items-center gap-1 font-bold border transition-colors ${
              isLargeText
                ? 'bg-amber-500 text-slate-950 border-amber-400 ring-1 ring-amber-300'
                : 'bg-slate-800 text-slate-300 border-slate-700 hover:text-white'
            }`}
            title="Chế độ chữ to 125% cho người cao tuổi (F1 WCAG 2.1 AA)"
          >
            <Type className="w-3.5 h-3.5" />
            <span>Aa{isLargeText ? ' (125%)' : ''}</span>
          </button>

          {/* UI State Simulation: Default, Loading, Empty, Error */}
          <div className="hidden lg:flex items-center gap-1 bg-slate-800 px-1 py-0.5 rounded border border-slate-700">
            <Sliders className="w-3 h-3 text-slate-400" />
            <select
              value={uiState}
              onChange={(e) => onSelectUiState(e.target.value as UiState)}
              className="bg-transparent text-slate-200 text-xs focus:outline-none cursor-pointer"
              title="Mô phỏng các trạng thái giao diện theo PRD"
            >
              <option value="DEFAULT" className="bg-slate-900 text-white">Trạng thái: Chuẩn</option>
              <option value="LOADING" className="bg-slate-900 text-white">Trạng thái: Đang tải (Skeleton)</option>
              <option value="EMPTY" className="bg-slate-900 text-white">Trạng thái: Trống (Empty)</option>
              <option value="ERROR" className="bg-slate-900 text-white">Trạng thái: Lỗi kết nối</option>
            </select>
          </div>

          {/* Spec Annotations Toggle */}
          <button
            onClick={onToggleAnnotations}
            className={`px-2 py-1 rounded flex items-center gap-1 transition-colors ${
              showAnnotations
                ? 'bg-indigo-600 text-white font-medium'
                : 'bg-slate-800 text-slate-400 hover:text-white border border-slate-700'
            }`}
            title="Bật/Tắt chú thích đặc tả UX & ghi chú PRD"
          >
            <Eye className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Chú thích UX</span>
          </button>
        </div>
      </div>
    </div>
  );
};
