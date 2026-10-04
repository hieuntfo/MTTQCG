import React, { useState } from 'react';
import {
  AppLayer,
  DesignMode,
  SystemZone
} from '../../types';
import { MttqEmblem } from './Emblem';
import {
  Search,
  Bell,
  User,
  LogOut,
  ChevronRight,
  Menu,
  X,
  MessageSquarePlus,
  Send,
  Lock,
  ExternalLink
} from 'lucide-react';

interface HeaderProps {
  zone: SystemZone;
  currentLayer: AppLayer;
  onNavigate: (layer: AppLayer) => void;
  designMode: DesignMode;
  isLargeText: boolean;
  onToggleLargeText: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  zone,
  currentLayer,
  onNavigate,
  designMode,
  isLargeText,
  onToggleLargeText
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const isLoFi = designMode === 'LO_FI_WIREFRAME';

  // Navigation items for Public Zone
  const publicNavItems = [
    { label: 'Trang chủ', layer: 'W1_PUBLIC_HOME' as AppLayer },
    { label: 'Thông tin đại diện', layer: 'W4_REPRESENTATION' as AppLayer },
    { label: '12 Tổ chức thành viên', layer: 'W5_MEMBER_ORGS' as AppLayer },
    { label: 'Tổ dân phố & Bản đồ (27 TDP)', layer: 'W6_TDP_MAP' as AppLayer },
    { label: 'Báo cáo giám sát công khai', layer: 'L3_SUPERVISION' as AppLayer },
  ];

  if (zone === 'GOVERNANCE') {
    // S1: VÙNG ĐIỀU HÀNH (Sau đăng nhập)
    return (
      <header className={`w-full border-b select-none transition-colors ${
        isLoFi 
          ? 'bg-slate-100 border-slate-300 text-slate-800' 
          : 'bg-slate-900 border-slate-800 text-white shadow-sm'
      }`}>
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
          {/* Brand Lockup */}
          <div className="flex items-center gap-3 shrink-0">
            {isLoFi ? (
              <div className="w-10 h-10 border-2 border-dashed border-slate-600 rounded-full flex items-center justify-center font-bold text-xs bg-slate-200">
                LOGO
              </div>
            ) : (
              <MttqEmblem size={38} />
            )}
            <div>
              <div className="flex items-center gap-2">
                <span className={`font-bold tracking-tight text-sm md:text-base leading-tight ${
                  isLoFi ? 'text-slate-900' : 'text-slate-100'
                }`}>
                  Hệ thống điều hành Phường Cầu Giấy
                </span>
                <span className={`hidden sm:inline-block text-[10px] px-1.5 py-0.5 rounded font-medium ${
                  isLoFi ? 'bg-slate-300 text-slate-800' : 'bg-red-900/60 text-red-200 border border-red-700/50'
                }`}>
                  Nội bộ 4 trụ cột
                </span>
              </div>
              <p className={`text-[11px] leading-tight hidden md:block ${
                isLoFi ? 'text-slate-500' : 'text-slate-400'
              }`}>
                Đảng ủy · HĐND · UBND · Ủy ban Mặt trận Tổ quốc Việt Nam
              </p>
            </div>
          </div>

          {/* Center: Global Search (Ctrl + K) */}
          <div className="hidden md:flex items-center flex-1 max-w-md mx-2">
            <div className={`relative w-full flex items-center rounded border transition-all ${
              isLoFi
                ? 'bg-white border-slate-400 focus-within:border-slate-800'
                : 'bg-slate-800/90 border-slate-700 focus-within:border-red-500 text-slate-200'
            }`}>
              <Search className="w-4 h-4 ml-3 text-slate-400 shrink-0" />
              <input
                type="text"
                placeholder="Tìm văn bản, giám sát, phản ánh, cán bộ 27 TDP... (Ctrl K)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setTimeout(() => setSearchFocused(false), 200)}
                className="w-full py-1.5 px-2.5 text-xs bg-transparent focus:outline-none placeholder:text-slate-400"
              />
              <span className={`text-[10px] px-1.5 py-0.5 mr-2 rounded border font-mono ${
                isLoFi ? 'bg-slate-100 border-slate-300 text-slate-500' : 'bg-slate-700 border-slate-600 text-slate-400'
              }`}>
                ⌘K
              </span>
            </div>
          </div>

          {/* Right Action Zone */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Notification bell */}
            <div className="relative">
              <button
                className={`p-2 rounded-lg relative transition-colors ${
                  isLoFi ? 'hover:bg-slate-200 text-slate-700' : 'hover:bg-slate-800 text-slate-300'
                }`}
                title="3 thông báo mới: 1 báo cáo giám sát đến hạn, 2 phản ánh TDP chờ xử lý"
              >
                <Bell className="w-4 h-4" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-600 rounded-full ring-2 ring-slate-900" />
              </button>
            </div>

            {/* Account Profile Menu */}
            <div className={`flex items-center gap-2 pl-2 border-l ${
              isLoFi ? 'border-slate-300' : 'border-slate-700'
            }`}>
              <div className="text-right hidden sm:block">
                <div className={`text-xs font-semibold ${isLoFi ? 'text-slate-900' : 'text-white'}`}>
                  Vũ Quốc Tuấn
                </div>
                <div className={`text-[10px] ${isLoFi ? 'text-slate-500' : 'text-slate-400'}`}>
                  Ủy viên TT · Ban TTND & GSĐTCCĐ
                </div>
              </div>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${
                isLoFi ? 'bg-slate-300 text-slate-800' : 'bg-red-700 text-white'
              }`}>
                QT
              </div>
              <button
                onClick={() => onNavigate('W1_PUBLIC_HOME')}
                className={`p-1.5 rounded transition-colors text-slate-400 hover:text-red-400`}
                title="Về Cổng thông tin công khai cho nhân dân"
              >
                <ExternalLink className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* S1: Contextual Breadcrumb Bar */}
        <div className={`px-4 py-1.5 border-t text-xs flex items-center gap-2 overflow-x-auto ${
          isLoFi ? 'bg-slate-200 border-slate-300 text-slate-600' : 'bg-slate-950/80 border-slate-800 text-slate-400'
        }`}>
          <button
            onClick={() => onNavigate('L1_HUB')}
            className="hover:underline flex items-center gap-1 font-medium"
          >
            Hub 4 trụ cột
          </button>
          <ChevronRight className="w-3 h-3 text-slate-500 shrink-0" />
          <button
            onClick={() => onNavigate('L2_MTTQ_UNIT')}
            className={`hover:underline flex items-center gap-1 ${
              currentLayer === 'L2_MTTQ_UNIT' ? (isLoFi ? 'font-bold text-slate-900' : 'font-bold text-white') : ''
            }`}
          >
            UB MTTQ Việt Nam phường
          </button>
          {currentLayer === 'L3_SUPERVISION' && (
            <>
              <ChevronRight className="w-3 h-3 text-slate-500 shrink-0" />
              <span className={isLoFi ? 'font-bold text-slate-900' : 'font-bold text-amber-400'}>
                Nghiệp vụ: Báo cáo giám sát & Thanh tra nhân dân
              </span>
            </>
          )}
          {currentLayer === 'L3_FEEDBACK_MGMT' && (
            <>
              <ChevronRight className="w-3 h-3 text-slate-500 shrink-0" />
              <span className={isLoFi ? 'font-bold text-slate-900' : 'font-bold text-red-400'}>
                Nghiệp vụ: Tiếp nhận & Xử lý Ý kiến người dân
              </span>
            </>
          )}
        </div>
      </header>
    );
  }

  // W0 & S1: VÙNG CÔNG KHAI (Dành cho người dân quét QR bảng tin)
  return (
    <header className={`w-full border-b select-none transition-colors ${
      isLoFi 
        ? 'bg-white border-slate-300 text-slate-900' 
        : 'bg-white border-slate-200 text-slate-900 shadow-xs'
    }`}>
      {/* Top Banner Stripe */}
      <div className={`py-1 px-4 text-xs font-medium flex items-center justify-between ${
        isLoFi ? 'bg-slate-100 text-slate-600 border-b border-slate-200' : 'bg-red-700 text-white'
      }`}>
        <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
          <div className="flex items-center gap-2 text-[11px] sm:text-xs">
            <span>CỔNG THÔNG TIN SỐ ỦY BAN MTTQ VIỆT NAM PHƯỜNG CẦU GIẤY</span>
            <span className="hidden sm:inline opacity-75">·</span>
            <span className="hidden sm:inline opacity-90">Bản sao số Cầu Giấy 27 Tổ dân phố</span>
          </div>

          <div className="flex items-center gap-3 text-xs">
            <button
              onClick={onToggleLargeText}
              className="hover:underline flex items-center gap-1 font-bold px-1.5 py-0.5 rounded bg-black/10"
              title="Phóng to cỡ chữ cho người cao tuổi"
            >
              Aa {isLargeText ? 'Chữ to' : ''}
            </button>
            <button
              onClick={() => onNavigate('L0_LOGIN')}
              className="hover:underline flex items-center gap-1 opacity-90 hover:opacity-100"
              title="Dành cho cán bộ, chuyên viên, trưởng ban CTMT"
            >
              <Lock className="w-3 h-3" />
              <span>Cán bộ đăng nhập</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Public Nav Bar */}
      <div className="max-w-7xl mx-auto px-4 h-18 flex items-center justify-between gap-4">
        {/* Brand identity */}
        <div
          onClick={() => onNavigate('W1_PUBLIC_HOME')}
          className="flex items-center gap-3 cursor-pointer group"
        >
          {isLoFi ? (
            <div className="w-12 h-12 border-2 border-dashed border-slate-500 rounded-full flex items-center justify-center font-bold text-xs bg-slate-100">
              LOGO
            </div>
          ) : (
            <MttqEmblem size={48} />
          )}
          <div>
            <div className="text-xs uppercase font-bold tracking-wider text-red-700 leading-tight">
              Ủy ban Mặt trận Tổ quốc Việt Nam
            </div>
            <div className="text-base sm:text-lg font-bold text-slate-900 leading-tight group-hover:text-red-700 transition-colors">
              PHƯỜNG CẦU GIẤY
            </div>
            <div className="text-[11px] text-slate-500">
              Thành phố Hà Nội · Điểm chạm số vì Nhân dân
            </div>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 text-sm font-medium">
          {publicNavItems.map((item) => {
            const isActive = currentLayer === item.layer;
            return (
              <button
                key={item.layer}
                onClick={() => onNavigate(item.layer)}
                className={`px-3 py-2 rounded-md transition-colors ${
                  isActive
                    ? isLoFi
                      ? 'bg-slate-200 text-slate-900 font-bold'
                      : 'bg-red-50 text-red-700 font-semibold'
                    : 'text-slate-700 hover:text-red-700 hover:bg-slate-50'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Primary Action Button: "Gửi ý kiến" */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigate('W14_MAILBOX')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold text-xs sm:text-sm shadow-sm transition-transform active:scale-95 ${
              isLoFi
                ? 'bg-slate-900 text-white hover:bg-slate-800'
                : 'bg-red-600 text-white hover:bg-red-700'
            }`}
            title="Gửi ý kiến, kiến nghị, phản ánh tới UB MTTQ phường (Cam kết phản hồi trong 7 ngày)"
          >
            <Send className="w-4 h-4" />
            <span>Gửi ý kiến</span>
          </button>

          {/* Mobile hamburger menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-slate-700 hover:text-slate-900 rounded-md hover:bg-slate-100"
            aria-label="Mở menu điều hướng"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation (PRD: Menu ngăn kéo theo cấp) */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 py-3 space-y-2 animate-in fade-in slide-in-from-top-2">
          {publicNavItems.map((item) => (
            <button
              key={item.layer}
              onClick={() => {
                onNavigate(item.layer);
                setMobileMenuOpen(false);
              }}
              className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium ${
                currentLayer === item.layer
                  ? 'bg-red-50 text-red-700 font-bold'
                  : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              {item.label}
            </button>
          ))}
          <div className="pt-2 border-t border-slate-100 flex flex-col gap-2">
            <button
              onClick={() => {
                onNavigate('W14_MAILBOX');
                setMobileMenuOpen(false);
              }}
              className="w-full py-2.5 bg-red-600 text-white font-semibold text-center rounded-lg text-sm"
            >
              Gửi ý kiến cho Mặt trận
            </button>
            <button
              onClick={() => {
                onNavigate('L0_LOGIN');
                setMobileMenuOpen(false);
              }}
              className="w-full py-2 text-slate-600 hover:text-slate-900 text-center text-xs font-medium"
            >
              Cán bộ đăng nhập hệ thống điều hành
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
