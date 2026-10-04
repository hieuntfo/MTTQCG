import React, { useState } from 'react';
import {
  DesignMode,
  AppLayer,
  UiState,
  SupervisionProject,
  SupervisionType
} from '../../types';
import {
  MTTQ_IMAGES,
  SUPERVISION_PROJECTS,
  RESIDENTIAL_GROUPS_27,
  BAN_THUONG_TRUC,
  COMMITTEE_MEMBERS_SAMPLE,
  MEMBER_ORGANIZATIONS,
  CITIZEN_FEEDBACK_LIST
} from '../../data/mockData';
import { MttqEmblem } from '../common/Emblem';
import {
  Home,
  Info,
  Newspaper,
  FileText,
  Calendar,
  BarChart2,
  Users,
  Compass,
  Phone,
  Search,
  Bell,
  ChevronRight,
  ExternalLink,
  ShieldCheck,
  Send,
  Heart,
  Target,
  Share2,
  CheckCircle2,
  Clock,
  MapPin,
  Building,
  Flag,
  ArrowRight,
  Menu,
  X,
  Plus,
  Download,
  AlertCircle,
  Copy,
  Printer,
  ChevronLeft
} from 'lucide-react';

interface VisualNewsPortalViewProps {
  designMode: DesignMode;
  uiState: UiState;
  onNavigate: (layer: AppLayer) => void;
  onSelectTdp: (tdpId: number) => void;
}

export type PortalSection = 'HOME_NEWS' | 'SUPERVISION' | 'REPRESENTATION' | 'TDP_MAP' | 'FEEDBACK';

export const VisualNewsPortalView: React.FC<VisualNewsPortalViewProps> = ({
  designMode,
  uiState,
  onNavigate,
  onSelectTdp
}) => {
  const isLoFi = designMode === 'LO_FI_WIREFRAME';

  // Active portal section tab
  const [activeTab, setActiveTab] = useState<PortalSection>('HOME_NEWS');
  const [activeSidebar, setActiveSidebar] = useState<string>('mttq');
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState<boolean>(false);
  
  // Active detail modal for news article
  const [selectedArticle, setSelectedArticle] = useState<{
    title: string;
    date: string;
    image: string;
    category: string;
    content: string[];
  } | null>(null);

  // Active supervision project for detail inspect
  const [inspectSupervision, setInspectSupervision] = useState<SupervisionProject | null>(SUPERVISION_PROJECTS[0]);

  // TDP search state inside map section
  const [tdpSearch, setTdpSearch] = useState('');
  const [selectedMapTdp, setSelectedMapTdp] = useState(RESIDENTIAL_GROUPS_27[7]);

  // Feedback form state
  const [feedbackDomain, setFeedbackDomain] = useState('URBAN_ENVIRONMENT');
  const [feedbackTdp, setFeedbackTdp] = useState(8);
  const [feedbackTitle, setFeedbackTitle] = useState('');
  const [feedbackContent, setFeedbackContent] = useState('');
  const [feedbackSubmittedCode, setFeedbackSubmittedCode] = useState<string | null>(null);
  const [feedbackLookupCode, setFeedbackLookupCode] = useState('CG-2026-0881');
  const [lookedUpItem, setLookedUpItem] = useState(CITIZEN_FEEDBACK_LIST[0]);

  // 8 Shortcut items with distinctive government colors
  const shortcuts = [
    { id: 'about', label: 'Giới thiệu chung', sub: 'Chức năng UB', color: 'bg-blue-600', icon: Info, action: () => setActiveTab('HOME_NEWS') },
    { id: 'duty', label: 'Chức năng nhiệm vụ', sub: 'Luật MTTQ', color: 'bg-emerald-600', icon: Target, action: () => setActiveTab('HOME_NEWS') },
    { id: 'org', label: 'Cơ cấu tổ chức', sub: 'Ban TT & 67 UV', color: 'bg-amber-600', icon: Users, action: () => setActiveTab('REPRESENTATION') },
    { id: 'supervision', label: 'Báo cáo giám sát', sub: 'GSĐTCCĐ & TTND', color: 'bg-purple-600', icon: ShieldCheck, action: () => setActiveTab('SUPERVISION') },
    { id: 'news', label: 'Tin tức sự kiện', sub: 'Hoạt động tuần', color: 'bg-red-600', icon: Newspaper, action: () => setActiveTab('HOME_NEWS') },
    { id: 'docs', label: 'Văn bản - Tài liệu', sub: 'Kho văn bản', color: 'bg-cyan-600', icon: FileText, action: () => alert('Mở Thư viện văn bản chỉ đạo của MTTQ và chính quyền phường Cầu Giấy.') },
    { id: 'tdp', label: 'Bản đồ 27 TDP', sub: 'Tổ dân phố số', color: 'bg-indigo-600', icon: Compass, action: () => setActiveTab('TDP_MAP') },
    { id: 'feedback', label: 'Hòm thư Nhân dân', sub: 'SLA 7 ngày', color: 'bg-rose-600', icon: Send, action: () => setActiveTab('FEEDBACK') },
  ];

  const handleFeedbackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!feedbackContent.trim()) return;
    const code = `CG-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    setFeedbackSubmittedCode(code);
  };

  return (
    <div className="bg-slate-100 min-h-screen text-slate-900 flex flex-col font-sans select-none">
      {/* 1. TOP BAR (Chuẩn Hệ thống điều hành theo Page FE.jpg với Logo chính thức) */}
      <header className="bg-blue-700 text-white px-4 py-2.5 flex items-center justify-between gap-4 shadow-sm z-30">
        <div className="flex items-center gap-3">
          <div
            onClick={() => setActiveTab('HOME_NEWS')}
            className="w-10 h-10 rounded-full bg-red-600 border border-yellow-400 flex items-center justify-center p-0.5 shrink-0 shadow-md cursor-pointer hover:scale-105 transition-transform"
            title="Biểu trưng Mặt trận Tổ quốc Việt Nam"
          >
            <MttqEmblem size={34} />
          </div>
          <div>
            <h1
              onClick={() => setActiveTab('HOME_NEWS')}
              className="text-xs md:text-sm font-bold uppercase tracking-wide leading-tight cursor-pointer hover:text-amber-200 transition-colors"
            >
              HỆ THỐNG ĐIỀU HÀNH ĐU – HĐND – UBND – UB MTTQ PHƯỜNG CẦU GIẤY
            </h1>
            <p className="text-[10px] text-blue-200">
              Cổng thông tin số & Bản sao số 27 Tổ dân phố · Thành phố Hà Nội
            </p>
          </div>
        </div>

        {/* Global Search & Notifications */}
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="hidden md:flex items-center bg-white/10 hover:bg-white/15 rounded-lg px-3 py-1.5 border border-white/20 text-xs w-64 text-white placeholder-blue-200">
            <Search className="w-3.5 h-3.5 mr-2 text-blue-200 shrink-0" />
            <input
              type="text"
              placeholder="Tìm kiếm thông tin, văn bản, thủ tục..."
              className="bg-transparent focus:outline-none w-full text-xs text-white placeholder:text-blue-200"
            />
          </div>

          <button
            onClick={() => alert('Thông báo mới: Ban Thường trực UB MTTQ đôn đốc kiểm tra hiện trường ngõ 165 Cầu Giấy lúc 14h00.')}
            className="p-1.5 rounded-full hover:bg-white/10 text-white relative"
            title="Thông báo mới"
          >
            <Bell className="w-4 h-4" />
            <span className="w-2 h-2 rounded-full bg-red-500 absolute top-1 right-1 ring-2 ring-blue-700" />
          </button>

          <div className="hidden sm:flex items-center gap-2 pl-2 border-l border-white/20">
            <div className="w-8 h-8 rounded-full bg-red-700 border-2 border-amber-300 flex items-center justify-center text-xs font-bold shadow-xs">
              QT
            </div>
            <div className="text-left text-[11px] leading-tight">
              <span className="font-semibold block">Vũ Quốc Tuấn</span>
              <span className="text-[9px] text-blue-200">Cán bộ chuyên trách MTTQ</span>
            </div>
          </div>

          {/* Mobile hamburger menu toggle */}
          <button
            onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
            className="md:hidden p-1.5 rounded-lg hover:bg-white/10 text-white"
            aria-label="Menu điều hướng"
          >
            {mobileSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer (14 mục cho màn hình nhỏ) */}
      {mobileSidebarOpen && (
        <div className="md:hidden bg-slate-900 text-slate-300 p-3 space-y-1 border-b border-slate-800 animate-in fade-in slide-in-from-top-2 z-40 text-xs">
          <button
            onClick={() => { setMobileSidebarOpen(false); setActiveTab('HOME_NEWS'); }}
            className={`w-full text-left px-3 py-2 rounded flex items-center gap-2 ${activeTab === 'HOME_NEWS' ? 'bg-blue-600 text-white font-bold' : 'hover:bg-slate-800'}`}
          >
            <Home className="w-4 h-4 text-blue-400" />
            <span>Trang chủ & Tin tức sự kiện</span>
          </button>
          <button
            onClick={() => { setMobileSidebarOpen(false); setActiveTab('SUPERVISION'); }}
            className={`w-full text-left px-3 py-2 rounded flex items-center gap-2 ${activeTab === 'SUPERVISION' ? 'bg-purple-600 text-white font-bold' : 'hover:bg-slate-800 text-purple-300'}`}
          >
            <ShieldCheck className="w-4 h-4 text-purple-400" />
            <span>Phân hệ Báo cáo giám sát (L3)</span>
          </button>
          <button
            onClick={() => { setMobileSidebarOpen(false); setActiveTab('REPRESENTATION'); }}
            className={`w-full text-left px-3 py-2 rounded flex items-center gap-2 ${activeTab === 'REPRESENTATION' ? 'bg-amber-600 text-white font-bold' : 'hover:bg-slate-800 text-amber-300'}`}
          >
            <Users className="w-4 h-4 text-amber-400" />
            <span>Phân hệ Thông tin đại diện (W4)</span>
          </button>
          <button
            onClick={() => { setMobileSidebarOpen(false); setActiveTab('TDP_MAP'); }}
            className={`w-full text-left px-3 py-2 rounded flex items-center gap-2 ${activeTab === 'TDP_MAP' ? 'bg-emerald-600 text-white font-bold' : 'hover:bg-slate-800 text-emerald-300'}`}
          >
            <Compass className="w-4 h-4 text-emerald-400" />
            <span>Bản đồ số 27 Tổ dân phố (W6)</span>
          </button>
          <button
            onClick={() => { setMobileSidebarOpen(false); setActiveTab('FEEDBACK'); }}
            className={`w-full text-left px-3 py-2 rounded flex items-center gap-2 ${activeTab === 'FEEDBACK' ? 'bg-rose-600 text-white font-bold' : 'hover:bg-slate-800 text-rose-300'}`}
          >
            <Send className="w-4 h-4 text-rose-400" />
            <span>Hòm thư số Nhân dân (SLA 7 ngày)</span>
          </button>
        </div>
      )}

      {/* 2. BODY LAYOUT: LEFT SIDEBAR + MAIN CONTENT (Chuẩn Page FE.jpg) */}
      <div className="flex-1 flex overflow-hidden">
        {/* LEFT SIDEBAR (14 mục theo Page FE.jpg) */}
        <aside className="w-56 bg-slate-900 text-slate-300 hidden md:flex flex-col justify-between py-3 border-r border-slate-800 text-xs shrink-0 select-none">
          <div className="space-y-1 px-2 overflow-y-auto">
            <button
              onClick={() => { setActiveSidebar('home'); setActiveTab('HOME_NEWS'); }}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-left transition-colors ${
                activeSidebar === 'home' && activeTab === 'HOME_NEWS' ? 'bg-blue-600 text-white font-semibold' : 'hover:bg-slate-800 text-slate-300'
              }`}
            >
              <Home className="w-4 h-4" />
              <span>Trang chủ</span>
            </button>

            <button
              onClick={() => { setActiveSidebar('intro'); setActiveTab('HOME_NEWS'); }}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-left transition-colors ${
                activeSidebar === 'intro' ? 'bg-blue-600 text-white font-semibold' : 'hover:bg-slate-800 text-slate-300'
              }`}
            >
              <Info className="w-4 h-4" />
              <span>Giới thiệu chung</span>
            </button>

            <button
              onClick={() => { setActiveSidebar('news'); setActiveTab('HOME_NEWS'); }}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-left transition-colors ${
                activeSidebar === 'news' ? 'bg-blue-600 text-white font-semibold' : 'hover:bg-slate-800 text-slate-300'
              }`}
            >
              <Newspaper className="w-4 h-4" />
              <span>Tin tức - Sự kiện</span>
            </button>

            <button
              onClick={() => alert('Mở Thư viện văn bản chỉ đạo của MTTQ và chính quyền phường Cầu Giấy.')}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-left transition-colors ${
                activeSidebar === 'docs' ? 'bg-blue-600 text-white font-semibold' : 'hover:bg-slate-800 text-slate-300'
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>Văn bản - Tài liệu</span>
            </button>

            <button
              onClick={() => alert('Chức năng Thủ tục hành chính & Dịch vụ công trực tuyến.')}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-left transition-colors ${
                activeSidebar === 'admin' ? 'bg-blue-600 text-white font-semibold' : 'hover:bg-slate-800 text-slate-300'
              }`}
            >
              <Target className="w-4 h-4" />
              <span>Thủ tục hành chính</span>
            </button>

            <button
              onClick={() => alert('Xem Lịch công tác tuần của Thường trực UB MTTQ và UBND phường.')}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-left transition-colors ${
                activeSidebar === 'schedule' ? 'bg-blue-600 text-white font-semibold' : 'hover:bg-slate-800 text-slate-300'
              }`}
            >
              <Calendar className="w-4 h-4" />
              <span>Lịch công tác</span>
            </button>

            <button
              onClick={() => { setActiveSidebar('reports'); setActiveTab('SUPERVISION'); }}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-left transition-colors ${
                activeSidebar === 'reports' || activeTab === 'SUPERVISION' ? 'bg-purple-600 text-white font-semibold' : 'hover:bg-slate-800 text-slate-300'
              }`}
            >
              <BarChart2 className="w-4 h-4 text-purple-400" />
              <span>Báo cáo - Giám sát</span>
            </button>

            <button
              onClick={() => { setActiveSidebar('citizen'); setActiveTab('FEEDBACK'); }}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-left transition-colors ${
                activeSidebar === 'citizen' || activeTab === 'FEEDBACK' ? 'bg-rose-600 text-white font-semibold' : 'hover:bg-slate-800 text-slate-300'
              }`}
            >
              <Users className="w-4 h-4 text-rose-400" />
              <span>Công dân & Ý kiến</span>
            </button>

            {/* MTTQ và các đoàn thể (Được làm nổi bật đặc biệt) */}
            <div className="pt-2 pb-1">
              <span className="px-3 text-[10px] font-bold uppercase tracking-wider text-slate-500">
                Trụ cột Mặt trận
              </span>
            </div>

            <button
              onClick={() => {
                setActiveSidebar('mttq');
                setActiveTab('REPRESENTATION');
              }}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-left shadow-xs font-bold ${
                activeTab === 'REPRESENTATION' ? 'bg-red-600 text-white' : 'bg-red-950/70 hover:bg-red-900 text-white'
              }`}
            >
              <div className="flex items-center gap-2">
                <MttqEmblem size={22} />
                <span>Ủy ban MTTQ phường</span>
              </div>
              <ChevronRight className="w-3.5 h-3.5 text-white/80" />
            </button>

            <button
              onClick={() => { setActiveSidebar('members'); setActiveTab('REPRESENTATION'); }}
              className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-left hover:bg-slate-800 text-slate-300"
            >
              <Building className="w-4 h-4 text-emerald-400" />
              <span>12 Tổ chức thành viên</span>
            </button>

            <button
              onClick={() => { setActiveSidebar('tdp'); setActiveTab('TDP_MAP'); }}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-left transition-colors ${
                activeTab === 'TDP_MAP' ? 'bg-emerald-600 text-white font-bold' : 'hover:bg-slate-800 text-slate-300'
              }`}
            >
              <Compass className="w-4 h-4 text-blue-400" />
              <span>27 Tổ dân phố số</span>
            </button>

            <button
              onClick={() => onNavigate('L1_HUB')}
              className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-left hover:bg-slate-800 text-slate-300"
            >
              <Flag className="w-4 h-4 text-amber-400" />
              <span>HĐND & UBND phường</span>
            </button>

            <button
              onClick={() => alert('Hệ thống Bản sao số và Dịch vụ công Chuyển đổi số phường Cầu Giấy.')}
              className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-left hover:bg-slate-800 text-slate-300"
            >
              <Share2 className="w-4 h-4 text-purple-400" />
              <span>Chuyển đổi số</span>
            </button>

            <button
              onClick={() => alert('Liên hệ Ban Thường trực UB MTTQ phường Cầu Giấy: Số 1 đường Cầu Giấy. Hotline: 024.3768.1201')}
              className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-left hover:bg-slate-800 text-slate-300"
            >
              <Phone className="w-4 h-4" />
              <span>Liên hệ</span>
            </button>
          </div>

          {/* Bottom Sidebar Callout */}
          <div className="p-3 mx-2 bg-slate-800/80 rounded-xl border border-slate-700/60 text-center space-y-1">
            <span className="text-[10px] text-blue-300 font-bold block uppercase tracking-wider">
              Chính quyền số
            </span>
            <p className="text-[11px] text-slate-200 font-semibold leading-tight">
              Kiến tạo tương lai Phường Cầu Giấy
            </p>
          </div>
        </aside>

        {/* MAIN CONTENT VIEWPORT */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6">
          {/* HERO BANNER VỚI ẢNH PHONG CẢNH CHUẨN CẦU GIẤY & BIỂU TRƯNG CHÍNH THỨC */}
          <div className="relative rounded-2xl overflow-hidden shadow-md border border-slate-200 bg-slate-900 min-h-[220px] md:min-h-[260px] flex items-center">
            {/* Background scenic photo: Cầu Giấy park & modern skyline */}
            <img
              src={MTTQ_IMAGES.heroBanner}
              alt="Toàn cảnh đô thị và công viên Cầu Giấy"
              className="absolute inset-0 w-full h-full object-cover opacity-60"
            />
            {/* Dark gradient overlay for text legibility */}
            <div className="absolute inset-0 bg-gradient-to-r from-red-950/95 via-slate-950/85 to-slate-900/60" />

            <div className="relative z-10 p-6 md:p-8 max-w-2xl space-y-3 text-white">
              <div className="flex items-center gap-3.5">
                {/* Official MTTQ Emblem */}
                <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-red-600 border-2 border-amber-300 flex items-center justify-center p-1 shrink-0 shadow-xl">
                  <MttqEmblem size={52} />
                </div>
                <div>
                  <span className="text-[11px] md:text-xs font-bold uppercase tracking-wider text-amber-300 block">
                    Khối Dân vận — Đảng ủy · HĐND · UBND · UB MTTQ phường
                  </span>
                  <h2 className="text-xl md:text-2xl font-extrabold leading-tight">
                    ỦY BAN MẶT TRẬN TỔ QUỐC PHƯỜNG CẦU GIẤY
                  </h2>
                </div>
              </div>

              <p className="text-xs md:text-sm text-slate-200 leading-relaxed font-medium">
                Ủy ban MTTQ Việt Nam phường Cầu Giấy luôn phát huy sức mạnh khối đại đoàn kết toàn dân tộc, lắng nghe Nhân dân nói, đẩy mạnh giám sát và phản biện xã hội vì một Cầu Giấy văn minh, hiện đại.
              </p>

              {/* Action buttons on hero */}
              <div className="pt-2 flex flex-wrap items-center gap-3">
                <button
                  onClick={() => setActiveTab('FEEDBACK')}
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-xs font-bold flex items-center gap-2 shadow-md transition-transform active:scale-95"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Gửi ý kiến phản ánh</span>
                </button>

                <button
                  onClick={() => setActiveTab('SUPERVISION')}
                  className={`px-4 py-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                    activeTab === 'SUPERVISION' ? 'bg-amber-400 text-slate-950 font-bold' : 'bg-white/20 hover:bg-white/30 text-white'
                  }`}
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-amber-300" />
                  <span>Báo cáo giám sát</span>
                </button>

                <button
                  onClick={() => setActiveTab('REPRESENTATION')}
                  className={`px-4 py-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                    activeTab === 'REPRESENTATION' ? 'bg-amber-400 text-slate-950 font-bold' : 'bg-white/20 hover:bg-white/30 text-white'
                  }`}
                >
                  <Users className="w-3.5 h-3.5 text-blue-300" />
                  <span>Cơ cấu 67 Ủy viên</span>
                </button>

                <button
                  onClick={() => setActiveTab('TDP_MAP')}
                  className={`px-4 py-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                    activeTab === 'TDP_MAP' ? 'bg-amber-400 text-slate-950 font-bold' : 'bg-white/20 hover:bg-white/30 text-white'
                  }`}
                >
                  <Compass className="w-3.5 h-3.5 text-emerald-300" />
                  <span>Bản đồ 27 TDP</span>
                </button>
              </div>
            </div>

            {/* Artistic badge right corner */}
            <div className="hidden lg:block absolute right-8 top-1/2 -translate-y-1/2 text-right">
              <div className="inline-block p-4 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-white shadow-xl text-center space-y-1">
                <span className="text-2xl block font-serif italic text-amber-300">
                  “Đại đoàn kết”
                </span>
                <span className="text-xs font-medium text-slate-200 uppercase tracking-widest block">
                  Vì Cầu Giấy nghĩa tình
                </span>
              </div>
            </div>
          </div>

          {/* 8 SHORTCUT CARDS (Hàng 8 ô lối tắt đầy màu sắc theo chuẩn Page FE.jpg) */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
            {shortcuts.map((sc) => {
              const IconComp = sc.icon;
              return (
                <button
                  key={sc.id}
                  onClick={sc.action}
                  className="p-3 bg-white rounded-xl border border-slate-200 hover:border-slate-300 hover:shadow-md transition-all text-center flex flex-col items-center justify-center gap-2 group cursor-pointer"
                >
                  <div className={`w-10 h-10 rounded-xl ${sc.color} text-white flex items-center justify-center shadow-xs group-hover:scale-110 transition-transform`}>
                    <IconComp className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-800 group-hover:text-red-600 transition-colors leading-tight">
                      {sc.label}
                    </h4>
                    <span className="text-[10px] text-slate-400 block mt-0.5">
                      {sc.sub}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* SECTION CONTROLLER SUB-BAR */}
          <div className="bg-white p-2 rounded-xl border border-slate-200 flex items-center justify-between text-xs overflow-x-auto gap-2">
            <div className="flex items-center gap-1">
              <span className="font-semibold text-slate-500 px-2 uppercase text-[10px] tracking-wider">Đang xem:</span>
              <button
                onClick={() => setActiveTab('HOME_NEWS')}
                className={`px-3 py-1.5 rounded-lg font-bold transition-colors ${activeTab === 'HOME_NEWS' ? 'bg-blue-600 text-white' : 'text-slate-600 hover:bg-slate-100'}`}
              >
                Trang tin tức & Hoạt động
              </button>
              <button
                onClick={() => setActiveTab('SUPERVISION')}
                className={`px-3 py-1.5 rounded-lg font-bold transition-colors ${activeTab === 'SUPERVISION' ? 'bg-purple-600 text-white' : 'text-slate-600 hover:bg-slate-100'}`}
              >
                Báo cáo giám sát (L3)
              </button>
              <button
                onClick={() => setActiveTab('REPRESENTATION')}
                className={`px-3 py-1.5 rounded-lg font-bold transition-colors ${activeTab === 'REPRESENTATION' ? 'bg-amber-600 text-white' : 'text-slate-600 hover:bg-slate-100'}`}
              >
                Thông tin đại diện (W4 & W5)
              </button>
              <button
                onClick={() => setActiveTab('TDP_MAP')}
                className={`px-3 py-1.5 rounded-lg font-bold transition-colors ${activeTab === 'TDP_MAP' ? 'bg-emerald-600 text-white' : 'text-slate-600 hover:bg-slate-100'}`}
              >
                Bản đồ 27 TDP (W6 & W7)
              </button>
              <button
                onClick={() => setActiveTab('FEEDBACK')}
                className={`px-3 py-1.5 rounded-lg font-bold transition-colors ${activeTab === 'FEEDBACK' ? 'bg-rose-600 text-white' : 'text-slate-600 hover:bg-slate-100'}`}
              >
                Hòm thư Nhân dân (W14)
              </button>
            </div>

            {activeTab !== 'HOME_NEWS' && (
              <button
                onClick={() => setActiveTab('HOME_NEWS')}
                className="text-xs text-slate-500 hover:text-red-600 font-semibold px-2 py-1 flex items-center gap-1 shrink-0"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
                <span>Về trang chủ tin tức</span>
              </button>
            )}
          </div>

          {/* TAB 1: HOME NEWS & VISUAL PORTAL (DEFAULT) */}
          {activeTab === 'HOME_NEWS' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* LEFT COLUMN: 8 COLS (TIN TỨC & HOẠT ĐỘNG GIÁM SÁT) */}
              <div className="lg:col-span-8 space-y-6">
                {/* SECTION: TIN TỨC - SỰ KIỆN GIÁM SÁT (1 Tin to + 4 tin nhỏ) */}
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
                  <div className="flex items-center justify-between border-b pb-3">
                    <div className="flex items-center gap-2">
                      <Newspaper className="w-5 h-5 text-red-600" />
                      <h3 className="font-bold text-sm uppercase text-slate-900 tracking-wide">
                        Tin tức – Sự kiện Giám sát & Đại đoàn kết Cầu Giấy
                      </h3>
                    </div>
                    <button
                      onClick={() => setActiveTab('SUPERVISION')}
                      className="text-xs text-red-600 font-semibold hover:underline flex items-center gap-1"
                    >
                      <span>Xem thêm</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-start">
                    {/* Big Hero News (7 Cols) */}
                    <div className="md:col-span-7 space-y-3">
                      <div
                        onClick={() => setSelectedArticle({
                          title: 'Mặt trận Tổ quốc phường Cầu Giấy ra quân kiểm tra thực địa, đôn đốc tiến độ dự án thoát nước ngõ 165 Cầu Giấy',
                          date: '04 Tháng 10, 2026',
                          category: 'Giám sát đầu tư của cộng đồng',
                          image: MTTQ_IMAGES.supervisionField,
                          content: [
                            'Sáng ngày 04/10/2026, Ban Thường trực UB MTTQ Việt Nam phường Cầu Giấy phối hợp cùng Ban Giám sát đầu tư của cộng đồng (GSĐTCCĐ) và đại diện Nhân dân Tổ dân phố số 8 đã tiến hành kiểm tra đột xuất tại công trường dự án cải tạo, nâng cấp hệ thống thoát nước ngõ 165 Cầu Giấy.',
                            'Tại thời điểm kiểm tra, đoàn giám sát ghi nhận đơn vị thi công đã hoàn thành lắp đặt tuyến cống tròn D600 dài 320m. Tuy nhiên, đơn vị thi công vẫn để tồn tại việc tập kết đất cát bừa bãi và chưa rào chắn cảnh báo an toàn tại 03 hố ga ngách 165/12, tiềm ẩn nguy cơ mất an toàn cho người già và các cháu học sinh.',
                            'Đoàn giám sát đã lập biên bản yêu cầu nhà thầu khắc phục ngay trong 24 giờ, che chắn toàn bộ hố ga bằng lưới phản quang và cam kết hoàn trả mặt bằng ngõ trước ngày 15/10/2026. UB MTTQ phường sẽ tiếp tục theo dõi, đôn đốc UBND phường giám sát việc thực hiện đúng cam kết.'
                          ]
                        })}
                        className="relative rounded-xl overflow-hidden aspect-16/9 bg-slate-900 group cursor-pointer shadow-xs"
                      >
                        <img
                          src={MTTQ_IMAGES.supervisionField}
                          alt="Đoàn giám sát kiểm tra công trình ngõ 165 Cầu Giấy"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute top-3 left-3 bg-red-600 text-white px-2.5 py-1 rounded-md text-xs font-bold shadow-md">
                          04 Tháng 10
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
                        <div className="absolute bottom-3 left-3 right-3 text-white">
                          <span className="text-[10px] text-amber-300 font-bold uppercase tracking-wider block">
                            Giám sát đầu tư của cộng đồng
                          </span>
                          <h4 className="font-bold text-sm leading-snug line-clamp-2">
                            Mặt trận Tổ quốc phường Cầu Giấy ra quân kiểm tra thực địa, đôn đốc tiến độ dự án thoát nước ngõ 165 Cầu Giấy
                          </h4>
                        </div>
                      </div>

                      <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                        Sáng ngày 04/10/2026, Ban Thường trực UB MTTQ phường phối hợp Ban Giám sát đầu tư của cộng đồng và Nhân dân TDP số 8 đã kiểm tra toàn diện chất lượng đào đặt cống D600, yêu cầu nhà thầu che chắn hố ga an toàn và cam kết hoàn trả mặt đường đúng tiến độ.
                      </p>

                      <button
                        onClick={() => setActiveTab('SUPERVISION')}
                        className="text-xs text-red-600 font-bold hover:underline flex items-center gap-1"
                      >
                        <span>Xem chi tiết hồ sơ giám sát</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* 4 Small News List (5 Cols) */}
                    <div className="md:col-span-5 space-y-3">
                      {/* Item 1 */}
                      <div
                        onClick={() => setSelectedArticle({
                          title: 'Ban GSĐTCCĐ công bố kết luận giám sát đợt 3 tại TDP 7 và TDP 10',
                          date: '03/10/2026',
                          category: 'Kết luận thanh tra nhân dân',
                          image: MTTQ_IMAGES.treePlantingGreen,
                          content: [
                            'Ngày 03/10/2026, Ban Thường trực UB MTTQ phường Cầu Giấy đã chính thức ký kết luận giám sát đợt 3 liên quan đến công tác quản lý trật tự vỉa hè và cây xanh tuyến phố Duy Tân và Thành Thái.',
                            'Kết luận đã kiến nghị Công an phường và Đội Quản lý TTXD đô thị phối hợp giải tỏa các bãi đỗ xe trái phép lấn chiếm lối đi của người đi bộ, đồng thời bổ sung thêm 20 cây xanh bóng mát trước khu vực nhà văn hóa TDP 10.'
                          ]
                        })}
                        className="flex items-start gap-3 p-2 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer border border-transparent hover:border-slate-200"
                      >
                        <img
                          src={MTTQ_IMAGES.treePlantingGreen}
                          alt="Tuyến ngõ tự quản xanh"
                          className="w-18 h-14 rounded-lg object-cover shrink-0"
                        />
                        <div className="space-y-0.5">
                          <span className="text-[10px] text-slate-400 font-mono">03/10/2026</span>
                          <h5 className="font-bold text-xs text-slate-900 leading-snug line-clamp-2 hover:text-red-600">
                            Ban GSĐTCCĐ công bố kết luận giám sát đợt 3 tại TDP 7 và TDP 10
                          </h5>
                        </div>
                      </div>

                      {/* Item 2 */}
                      <div
                        onClick={() => setSelectedArticle({
                          title: 'Trao tặng 45 suất quà an sinh xã hội cho người có công và hộ cận nghèo',
                          date: '01/10/2026',
                          category: 'An sinh xã hội & Dân vận',
                          image: MTTQ_IMAGES.charityWelfare,
                          content: [
                            'Hưởng ứng Tháng cao điểm Vì người nghèo năm 2026, Ủy ban MTTQ Việt Nam phường Cầu Giấy đã tổ chức buổi lễ trao tặng 45 suất quà an sinh xã hội cho các hộ gia đình chính sách, người có công và hộ có hoàn cảnh khó khăn tại TDP 4, 12 và 19.',
                            'Mỗi suất quà trị giá 1.500.000 đồng trích từ Quỹ Vì người nghèo của phường và sự ủng hộ của các doanh nghiệp đóng trên địa bàn.'
                          ]
                        })}
                        className="flex items-start gap-3 p-2 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer border border-transparent hover:border-slate-200"
                      >
                        <img
                          src={MTTQ_IMAGES.charityWelfare}
                          alt="Trao quà an sinh xã hội"
                          className="w-18 h-14 rounded-lg object-cover shrink-0"
                        />
                        <div className="space-y-0.5">
                          <span className="text-[10px] text-slate-400 font-mono">01/10/2026</span>
                          <h5 className="font-bold text-xs text-slate-900 leading-snug line-clamp-2 hover:text-red-600">
                            Trao tặng 45 suất quà an sinh xã hội cho người có công và hộ cận nghèo
                          </h5>
                        </div>
                      </div>

                      {/* Item 3 */}
                      <div
                        onClick={() => setSelectedArticle({
                          title: 'Hiệp thương thống nhất danh sách 67 Ủy viên UB MTTQ phường khóa mới nhiệm kỳ 2026 – 2031',
                          date: '29/09/2026',
                          category: 'Công tác tổ chức cán bộ',
                          image: MTTQ_IMAGES.culturalFestival,
                          content: [
                            'Ủy ban MTTQ Việt Nam phường Cầu Giấy đã tổ chức thành công Hội nghị hiệp thương lần thứ ba, thống nhất danh sách 67 Ủy viên Ủy ban MTTQ phường đại diện đầy đủ cho khối các tổ chức thành viên, 27 Ban CTMT các tổ dân phố, các nhân sĩ trí thức và chức sắc tôn giáo.',
                            'Bà Nguyễn Thị Bích Hòa tái đắc cử chức danh Chủ tịch Ủy ban MTTQ phường nhiệm kỳ 2026 – 2031.'
                          ]
                        })}
                        className="flex items-start gap-3 p-2 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer border border-transparent hover:border-slate-200"
                      >
                        <img
                          src={MTTQ_IMAGES.culturalFestival}
                          alt="Hội nghị đại biểu MTTQ"
                          className="w-18 h-14 rounded-lg object-cover shrink-0"
                        />
                        <div className="space-y-0.5">
                          <span className="text-[10px] text-slate-400 font-mono">29/09/2026</span>
                          <h5 className="font-bold text-xs text-slate-900 leading-snug line-clamp-2 hover:text-red-600">
                            Hiệp thương thống nhất danh sách 67 Ủy viên UB MTTQ phường khóa mới
                          </h5>
                        </div>
                      </div>

                      {/* Item 4 */}
                      <div
                        onClick={() => setActiveTab('TDP_MAP')}
                        className="flex items-start gap-3 p-2 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer border border-transparent hover:border-slate-200"
                      >
                        <div className="w-18 h-14 rounded-lg bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-700 font-bold text-xs shrink-0">
                          27 TDP
                        </div>
                        <div className="space-y-0.5">
                          <span className="text-[10px] text-slate-400 font-mono">28/09/2026</span>
                          <h5 className="font-bold text-xs text-slate-900 leading-snug line-clamp-2 hover:text-red-600">
                            27 Tổ dân phố đồng loạt dán mã QR Hòm thư số tại các bảng tin
                          </h5>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* SECTION: HOẠT ĐỘNG NỔI BẬT (4 Thẻ ảnh trực quan Cầu Giấy theo chuẩn Page FE.jpg) */}
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
                  <div className="flex items-center justify-between border-b pb-3">
                    <div className="flex items-center gap-2">
                      <Heart className="w-5 h-5 text-red-600" />
                      <h3 className="font-bold text-sm uppercase text-slate-900 tracking-wide">
                        Hoạt động cộng đồng & Phong trào nổi bật
                      </h3>
                    </div>
                    <span className="text-xs text-slate-400">Hình ảnh địa danh Cầu Giấy</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {/* Card 1: Giám sát công trình */}
                    <div
                      onClick={() => setActiveTab('SUPERVISION')}
                      className="group cursor-pointer space-y-2"
                    >
                      <div className="aspect-4/3 rounded-xl overflow-hidden bg-slate-100 border border-slate-200 shadow-2xs">
                        <img
                          src={MTTQ_IMAGES.supervisionField}
                          alt="Giám sát ngõ 165 Cầu Giấy"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                        />
                      </div>
                      <span className="text-[10px] text-slate-400 font-mono block">04/10/2026</span>
                      <h4 className="text-xs font-bold text-slate-900 group-hover:text-red-600 leading-snug line-clamp-2">
                        Giám sát thi công hoàn trả mặt ngõ 165 Cầu Giấy
                      </h4>
                    </div>

                    {/* Card 2: Đại đoàn kết */}
                    <div
                      onClick={() => setSelectedArticle({
                        title: 'Ngày hội Đại đoàn kết toàn dân tộc tại 27 tổ dân phố phường Cầu Giấy',
                        date: '02/10/2026',
                        category: 'Phong trào đại đoàn kết',
                        image: MTTQ_IMAGES.culturalFestival,
                        content: [
                          'Hàng năm vào dịp kỷ niệm Ngày truyền thống Mặt trận Tổ quốc Việt Nam (18/11), 27 tổ dân phố trên địa bàn phường Cầu Giấy đồng loạt tổ chức Ngày hội Đại đoàn kết toàn dân tộc với các hoạt động giao lưu văn nghệ, biểu dương các gia đình văn hóa tiêu biểu và trao học bổng cho học sinh nghèo vượt khó.'
                        ]
                      })}
                      className="group cursor-pointer space-y-2"
                    >
                      <div className="aspect-4/3 rounded-xl overflow-hidden bg-slate-100 border border-slate-200 shadow-2xs">
                        <img
                          src={MTTQ_IMAGES.culturalFestival}
                          alt="Ngày hội Đại đoàn kết Cầu Giấy"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                        />
                      </div>
                      <span className="text-[10px] text-slate-400 font-mono block">02/10/2026</span>
                      <h4 className="text-xs font-bold text-slate-900 group-hover:text-red-600 leading-snug line-clamp-2">
                        Ngày hội Đại đoàn kết toàn dân tộc tại 27 tổ dân phố
                      </h4>
                    </div>

                    {/* Card 3: Nhà sinh hoạt văn hóa */}
                    <div
                      onClick={() => setActiveTab('TDP_MAP')}
                      className="group cursor-pointer space-y-2"
                    >
                      <div className="aspect-4/3 rounded-xl overflow-hidden bg-slate-100 border border-slate-200 shadow-2xs">
                        <img
                          src={MTTQ_IMAGES.culturalHouse}
                          alt="Nhà văn hóa cộng đồng Cầu Giấy"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                        />
                      </div>
                      <span className="text-[10px] text-slate-400 font-mono block">28/09/2026</span>
                      <h4 className="text-xs font-bold text-slate-900 group-hover:text-red-600 leading-snug line-clamp-2">
                        Sinh hoạt chi bộ và Ban CTMT tại Nhà văn hóa TDP 12
                      </h4>
                    </div>

                    {/* Card 4: Tuyến ngõ xanh */}
                    <div
                      onClick={() => setActiveTab('TDP_MAP')}
                      className="group cursor-pointer space-y-2"
                    >
                      <div className="aspect-4/3 rounded-xl overflow-hidden bg-slate-100 border border-slate-200 shadow-2xs">
                        <img
                          src={MTTQ_IMAGES.treePlantingGreen}
                          alt="Tuyến ngõ tự quản xanh Cầu Giấy"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                        />
                      </div>
                      <span className="text-[10px] text-slate-400 font-mono block">25/09/2026</span>
                      <h4 className="text-xs font-bold text-slate-900 group-hover:text-red-600 leading-snug line-clamp-2">
                        Tuyến ngõ tự quản xanh – sạch – đẹp do phụ nữ tự quản
                      </h4>
                    </div>
                  </div>
                </div>

                {/* SECTION: PHÂN HỆ BÁO CÁO GIÁM SÁT TRỰC QUAN (Visual Monitoring Cards) */}
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
                  <div className="flex items-center justify-between border-b pb-3">
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="w-5 h-5 text-purple-600" />
                      <div>
                        <h3 className="font-bold text-sm uppercase text-slate-900 tracking-wide">
                          Công trình đang chịu sự giám sát của Nhân dân (GSĐTCCĐ)
                        </h3>
                        <span className="text-[11px] text-slate-500">Giám sát thực chất · Công khai tiến độ & kiến nghị xử lý</span>
                      </div>
                    </div>
                    <button
                      onClick={() => setActiveTab('SUPERVISION')}
                      className="px-3 py-1.5 bg-red-50 text-red-700 font-bold rounded-lg text-xs hover:bg-red-100 transition-colors"
                    >
                      Mở bảng điều hành giám sát →
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {SUPERVISION_PROJECTS.slice(0, 2).map((proj) => (
                      <div
                        key={proj.id}
                        onClick={() => {
                          setInspectSupervision(proj);
                          setActiveTab('SUPERVISION');
                        }}
                        className="p-4 rounded-xl border border-slate-200 hover:border-purple-300 hover:shadow-xs transition-all space-y-3 cursor-pointer bg-slate-50/50"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-purple-100 text-purple-800">
                            {proj.code}
                          </span>
                          <span className="text-[11px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                            SLA còn {proj.slaDaysLeft} ngày
                          </span>
                        </div>

                        <h4 className="text-xs font-bold text-slate-900 line-clamp-2">
                          {proj.title}
                        </h4>

                        <div className="space-y-1 text-xs">
                          <div className="flex items-center justify-between text-[11px] text-slate-500">
                            <span>Tiến độ thi công:</span>
                            <span className="font-bold text-slate-900 font-mono">{proj.progressPercent}%</span>
                          </div>
                          <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                            <div
                              className="bg-purple-600 h-full rounded-full"
                              style={{ width: `${proj.progressPercent}%` }}
                            />
                          </div>
                        </div>

                        <div className="p-2.5 bg-white rounded-lg border border-slate-100 text-[11px] text-slate-600 space-y-1">
                          <span className="font-semibold text-slate-800 block">Kiến nghị của Mặt trận:</span>
                          <p className="line-clamp-2 italic">{proj.recommendations[0]}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* RIGHT COLUMN: 4 COLS (CƠ CẤU TỔ CHỨC ĐẠI DIỆN + LIÊN KẾT NHANH) */}
              <div className="lg:col-span-4 space-y-6">
                {/* PHÂN HỆ CƠ CẤU TỔ CHỨC ĐẠI DIỆN (Sơ đồ tổ chức theo Page FE.jpg) */}
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
                  <div className="flex items-center justify-between border-b pb-3">
                    <div className="flex items-center gap-2">
                      <Users className="w-5 h-5 text-blue-600" />
                      <h3 className="font-bold text-sm uppercase text-slate-900 tracking-wide">
                        Cơ cấu tổ chức đại diện
                      </h3>
                    </div>
                    <button
                      onClick={() => setActiveTab('REPRESENTATION')}
                      className="text-xs text-red-600 font-semibold hover:underline"
                    >
                      Xem sơ đồ →
                    </button>
                  </div>

                  {/* Organizational Tree Diagram (Chuẩn Page FE.jpg) */}
                  <div className="space-y-2 text-xs">
                    {/* Root Box */}
                    <div
                      onClick={() => setActiveTab('REPRESENTATION')}
                      className="p-2.5 bg-blue-700 text-white font-bold text-center rounded-lg shadow-xs cursor-pointer hover:bg-blue-800 transition-colors"
                    >
                      ỦY BAN MTTQ PHƯỜNG CẦU GIẤY
                      <span className="block text-[10px] font-normal text-blue-100 mt-0.5">
                        Nhiệm kỳ 2026 – 2031 (67 Ủy viên)
                      </span>
                    </div>

                    {/* Branches */}
                    <div className="grid grid-cols-2 gap-2 text-center text-[11px]">
                      <div
                        onClick={() => setActiveTab('REPRESENTATION')}
                        className="p-2 bg-blue-50 border border-blue-200 rounded-lg text-blue-900 font-semibold cursor-pointer hover:bg-blue-100"
                      >
                        Bà Nguyễn Thị Bích Hòa
                        <span className="block text-[9px] text-slate-500 font-normal">Chủ tịch UB MTTQ</span>
                      </div>
                      <div
                        onClick={() => setActiveTab('REPRESENTATION')}
                        className="p-2 bg-blue-50 border border-blue-200 rounded-lg text-blue-900 font-semibold cursor-pointer hover:bg-blue-100"
                      >
                        Ông Trần Văn Mạnh
                        <span className="block text-[9px] text-slate-500 font-normal">Phó Chủ tịch TT</span>
                      </div>
                    </div>

                    {/* 3 Child Pillars */}
                    <div className="grid grid-cols-3 gap-1.5 text-center text-[10px]">
                      <div
                        onClick={() => setActiveTab('REPRESENTATION')}
                        className="p-2 bg-slate-50 border border-slate-200 rounded-lg font-medium text-slate-700 cursor-pointer hover:bg-red-50 hover:text-red-700 hover:border-red-200"
                      >
                        12 Tổ chức thành viên
                      </div>
                      <div
                        onClick={() => setActiveTab('TDP_MAP')}
                        className="p-2 bg-slate-50 border border-slate-200 rounded-lg font-medium text-slate-700 cursor-pointer hover:bg-emerald-50 hover:text-emerald-700 hover:border-emerald-200"
                      >
                        27 Ban CTMT Tổ dân phố
                      </div>
                      <div
                        onClick={() => setActiveTab('SUPERVISION')}
                        className="p-2 bg-slate-50 border border-slate-200 rounded-lg font-medium text-slate-700 cursor-pointer hover:bg-purple-50 hover:text-purple-700 hover:border-purple-200"
                      >
                        Ban TTND & GSĐTCCĐ
                      </div>
                    </div>
                  </div>
                </div>

                {/* LIÊN KẾT NHANH (Theo Page FE.jpg) */}
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
                  <h3 className="font-bold text-xs uppercase text-slate-800 tracking-wide border-b pb-2 flex items-center gap-2">
                    <Target className="w-4 h-4 text-red-600" />
                    <span>Liên kết nghiệp vụ nhanh</span>
                  </h3>

                  <div className="space-y-1.5 text-xs">
                    <button
                      onClick={() => setActiveTab('FEEDBACK')}
                      className="w-full p-2.5 rounded-xl border border-slate-200 hover:border-red-400 hover:bg-red-50/50 flex items-center justify-between text-slate-800 font-semibold group transition-all"
                    >
                      <span className="flex items-center gap-2">
                        <Send className="w-4 h-4 text-red-600" />
                        <span>Gửi ý kiến tới Hòm thư số</span>
                      </span>
                      <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-red-600" />
                    </button>

                    <button
                      onClick={() => setActiveTab('FEEDBACK')}
                      className="w-full p-2.5 rounded-xl border border-slate-200 hover:border-blue-400 hover:bg-blue-50/50 flex items-center justify-between text-slate-800 font-semibold group transition-all"
                    >
                      <span className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-blue-600" />
                        <span>Tra cứu kết quả (SLA 7 ngày)</span>
                      </span>
                      <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600" />
                    </button>

                    <button
                      onClick={() => setActiveTab('TDP_MAP')}
                      className="w-full p-2.5 rounded-xl border border-slate-200 hover:border-emerald-400 hover:bg-emerald-50/50 flex items-center justify-between text-slate-800 font-semibold group transition-all"
                    >
                      <span className="flex items-center gap-2">
                        <Compass className="w-4 h-4 text-emerald-600" />
                        <span>Bản đồ số & Trưởng ban 27 TDP</span>
                      </span>
                      <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-600" />
                    </button>

                    <button
                      onClick={() => setActiveTab('REPRESENTATION')}
                      className="w-full p-2.5 rounded-xl border border-slate-200 hover:border-purple-400 hover:bg-purple-50/50 flex items-center justify-between text-slate-800 font-semibold group transition-all"
                    >
                      <span className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-purple-600" />
                        <span>Lịch tiếp dân của Ban Thường trực</span>
                      </span>
                      <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-purple-600" />
                    </button>
                  </div>
                </div>

                {/* BANNER ĐỒ HỌA CHUYỂN ĐỔI SỐ (Theo Page FE.jpg với ảnh Discovery Complex Cầu Giấy) */}
                <div
                  onClick={() => setActiveTab('TDP_MAP')}
                  className="relative rounded-2xl overflow-hidden shadow-md cursor-pointer hover:shadow-lg transition-all group"
                >
                  <img
                    src={MTTQ_IMAGES.discoveryComplex}
                    alt="Cầu Giấy chuyển đổi số"
                    className="w-full h-36 object-cover group-hover:scale-105 transition-transform"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/60 to-transparent p-4 flex flex-col justify-end text-white">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-amber-300 block">
                      Bản sao số Cầu Giấy
                    </span>
                    <h4 className="text-xs font-extrabold leading-tight">
                      MẶT TRẬN TỔ QUỐC TIÊN PHONG CHUYỂN ĐỔI SỐ
                    </h4>
                    <p className="text-[10px] text-slate-200 mt-0.5">
                      27 Tổ dân phố số — Kết nối không khoảng cách
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: VISUAL BÁO CÁO GIÁM SÁT & THANH TRA NHÂN DÂN (L3 CHUYÊN SÂU) */}
          {activeTab === 'SUPERVISION' && (
            <div className="space-y-6 animate-in fade-in">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b pb-4 bg-white p-5 rounded-2xl border border-slate-200">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 text-xs font-mono font-bold rounded bg-purple-100 text-purple-800">
                      PHÂN HỆ NGHIỆP VỤ MTTQ
                    </span>
                    <span className="text-xs text-slate-500">· Năm công tác 2026</span>
                  </div>
                  <h2 className="text-xl md:text-2xl font-bold tracking-tight text-slate-900 mt-1">
                    Báo cáo giám sát & Thanh tra nhân dân phường Cầu Giấy
                  </h2>
                  <p className="text-xs text-slate-600 mt-0.5">
                    Ban Giám sát đầu tư của cộng đồng (GSĐTCCĐ) và Ban Thanh tra nhân dân kiểm tra 100% công trình dân sinh tại 27 TDP.
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => alert('Xuất báo cáo giám sát gửi HĐND phường Cầu Giấy định kỳ.')}
                    className="px-3.5 py-2 rounded-lg text-xs font-medium border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 flex items-center gap-1.5"
                  >
                    <Download className="w-3.5 h-3.5 text-slate-500" />
                    <span>Xuất báo cáo HĐND</span>
                  </button>
                  <button
                    onClick={() => setActiveTab('FEEDBACK')}
                    className="px-3.5 py-2 rounded-lg text-xs font-bold bg-red-600 hover:bg-red-700 text-white flex items-center gap-1.5 shadow-xs"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Gửi kiến nghị giám sát</span>
                  </button>
                </div>
              </div>

              {/* 4 Metric Counters */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-4 rounded-xl border bg-white border-slate-200">
                  <span className="text-xs text-slate-500 block">Tổng số đợt giám sát 2026</span>
                  <div className="flex items-baseline justify-between mt-1">
                    <span className="text-2xl font-bold font-mono text-slate-900">18</span>
                    <span className="text-[11px] text-emerald-600 font-semibold">100% đúng quy định</span>
                  </div>
                </div>
                <div className="p-4 rounded-xl border bg-white border-slate-200">
                  <span className="text-xs text-slate-500 block">Đang tiến hành tại TDP</span>
                  <div className="flex items-baseline justify-between mt-1">
                    <span className="text-2xl font-bold font-mono text-blue-600">04</span>
                    <span className="text-[11px] text-slate-500">Tại TDP 7, 8, 10, 16</span>
                  </div>
                </div>
                <div className="p-4 rounded-xl border bg-white border-slate-200">
                  <span className="text-xs text-slate-500 block">Kiến nghị đã ban hành</span>
                  <div className="flex items-baseline justify-between mt-1">
                    <span className="text-2xl font-bold font-mono text-amber-600">12</span>
                    <span className="text-[11px] text-amber-600 font-medium">2 chờ UBND phản hồi</span>
                  </div>
                </div>
                <div className="p-4 rounded-xl border bg-white border-slate-200">
                  <span className="text-xs text-slate-500 block">Tỷ lệ cơ quan khắc phục</span>
                  <div className="flex items-baseline justify-between mt-1">
                    <span className="text-2xl font-bold font-mono text-emerald-600">92.5%</span>
                    <span className="text-[11px] text-slate-500">Đạt KPI PRD (≥ 90%)</span>
                  </div>
                </div>
              </div>

              {/* Supervision Projects Visual Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {SUPERVISION_PROJECTS.map((proj) => (
                  <div
                    key={proj.id}
                    className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-purple-100 text-purple-800">
                          {proj.code}
                        </span>
                        <span className="text-xs text-slate-500 font-medium">Tổ dân phố số {proj.tdpId}</span>
                      </div>
                      <span className="text-xs font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                        {proj.slaDaysLeft > 0 ? `SLA còn ${proj.slaDaysLeft} ngày` : 'Đã nghiệm thu'}
                      </span>
                    </div>

                    <div>
                      <h3 className="font-bold text-sm text-slate-900 leading-snug">
                        {proj.title}
                      </h3>
                      <div className="flex items-center gap-2 text-xs text-slate-500 mt-1">
                        <MapPin className="w-3.5 h-3.5 text-red-500 shrink-0" />
                        <span>{proj.location}</span>
                      </div>
                    </div>

                    {/* Progress */}
                    <div className="space-y-1 text-xs">
                      <div className="flex items-center justify-between text-slate-600 text-[11px]">
                        <span>Tiến độ thực tế:</span>
                        <span className="font-bold font-mono text-slate-900">{proj.progressPercent}%</span>
                      </div>
                      <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                        <div
                          className="bg-purple-600 h-full rounded-full transition-all"
                          style={{ width: `${proj.progressPercent}%` }}
                        />
                      </div>
                    </div>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs space-y-2">
                      <span className="font-semibold text-slate-800 block">Kết luận hiện trường:</span>
                      <p className="text-slate-600 leading-relaxed">{proj.findingsSummary}</p>
                    </div>

                    <div className="p-3 rounded-xl bg-amber-50/70 border border-amber-200 text-xs space-y-1">
                      <span className="font-semibold text-amber-900 block">Kiến nghị xử lý gửi UBND:</span>
                      <p className="text-slate-800 italic">{proj.recommendations[0]}</p>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
                      <span className="text-slate-500">Chủ trì: {proj.inspectorLeader}</span>
                      <button
                        onClick={() => setSelectedArticle({
                          title: proj.title,
                          date: proj.startDate,
                          category: 'Hồ sơ giám sát thực địa',
                          image: MTTQ_IMAGES.supervisionField,
                          content: [
                            `Dự án: ${proj.title}`,
                            `Địa bàn: ${proj.location}`,
                            `Đơn vị chịu giám sát: ${proj.targetAgency}`,
                            `Kinh phí: ${proj.budget || 'Ngân sách dân sinh'}`,
                            `Nội dung kết luận: ${proj.findingsSummary}`,
                            `Kiến nghị xử lý: ${proj.recommendations.join('. ')}`,
                            `Báo cáo khắc phục: ${proj.agencyResponse || 'Đang chờ giải trình'}`
                          ]
                        })}
                        className="text-red-600 font-bold hover:underline flex items-center gap-1"
                      >
                        <span>Xem toàn bộ hồ sơ</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: VISUAL THÔNG TIN ĐẠI DIỆN (W4 & W5 CHUYÊN SÂU) */}
          {activeTab === 'REPRESENTATION' && (
            <div className="space-y-6 animate-in fade-in">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b pb-4 bg-white p-5 rounded-2xl border border-slate-200">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 text-xs font-mono font-bold rounded bg-amber-100 text-amber-800">
                      CƠ CẤU ĐẠI DIỆN NHIỆM KỲ 2026 – 2031
                    </span>
                    <span className="text-xs text-slate-500">· Cập nhật ngày 01/10/2026</span>
                  </div>
                  <h2 className="text-xl md:text-2xl font-bold tracking-tight text-slate-900 mt-1">
                    Phân hệ thông tin đại diện MTTQ phường Cầu Giấy
                  </h2>
                  <p className="text-xs text-slate-600 mt-0.5">
                    Ban Thường trực, 67 Ủy viên Ủy ban MTTQ và 12 Tổ chức thành viên trực thuộc.
                  </p>
                </div>

                <div className="text-xs text-slate-500 bg-slate-50 p-2.5 rounded-xl border text-center font-mono">
                  Hiệp thương đủ 5 khối · 67 Ủy viên
                </div>
              </div>

              {/* Ban Thường trực: Thẻ Chủ tịch hàng đầu */}
              {BAN_THUONG_TRUC.slice(0, 1).map((chair) => (
                <div
                  key={chair.id}
                  className="p-6 rounded-2xl bg-gradient-to-r from-red-50 via-white to-amber-50/50 border border-red-200 shadow-xs"
                >
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-center">
                    <div className="md:col-span-3 flex justify-center">
                      <div className="w-36 h-48 rounded-xl overflow-hidden bg-slate-100 border-2 border-red-300 shadow-sm flex flex-col items-center justify-center p-3 text-center">
                        <div className="w-16 h-16 rounded-full bg-red-700 text-white font-bold text-xl flex items-center justify-center mb-2 shadow-sm">
                          BH
                        </div>
                        <span className="text-xs font-bold text-slate-900">{chair.name}</span>
                        <span className="text-[10px] text-red-700 font-bold uppercase mt-0.5">Chủ tịch UB MTTQ</span>
                      </div>
                    </div>

                    <div className="md:col-span-9 space-y-3 text-xs">
                      <div>
                        <span className="inline-block px-2.5 py-0.5 rounded text-xs font-bold uppercase tracking-wider bg-red-600 text-white mb-1.5">
                          {chair.role}
                        </span>
                        <h3 className="text-xl font-bold text-slate-900">{chair.name}</h3>
                        <p className="text-xs text-slate-600 font-medium">{chair.title}</p>
                      </div>

                      <div className="p-3 rounded-xl bg-white border border-slate-200 space-y-1">
                        <span className="font-semibold text-slate-700 block">Phân công nhiệm vụ:</span>
                        <p className="text-slate-600 leading-relaxed">{chair.assignedArea}</p>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                        <div className="flex items-center gap-2 text-slate-700">
                          <Phone className="w-4 h-4 text-red-600 shrink-0" />
                          <span>Công vụ: <strong>{chair.phone}</strong></span>
                        </div>
                        <div className="flex items-center gap-2 text-slate-700">
                          <Calendar className="w-4 h-4 text-red-600 shrink-0" />
                          <span>Lịch tiếp dân: <strong>Thứ Năm hàng tuần</strong></span>
                        </div>
                        <div className="flex items-center gap-2 text-slate-700 truncate">
                          <span className="truncate">{chair.email}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* 4 Phó Chủ tịch & Thường trực */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {BAN_THUONG_TRUC.slice(1).map((m) => (
                  <div key={m.id} className="p-4 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-2">
                    <span className="text-[10px] font-bold text-red-700 bg-red-50 px-2 py-0.5 rounded inline-block">
                      {m.role}
                    </span>
                    <h4 className="font-bold text-sm text-slate-900">{m.name}</h4>
                    <p className="text-[11px] text-slate-500 line-clamp-1">{m.title}</p>
                    <p className="text-xs text-slate-600 bg-slate-50 p-2 rounded line-clamp-2">{m.assignedArea}</p>
                    <div className="pt-2 border-t text-[11px] text-slate-500 flex items-center justify-between">
                      <span>ĐT:</span>
                      <strong className="text-slate-800">{m.phone}</strong>
                    </div>
                  </div>
                ))}
              </div>

              {/* 12 Tổ chức thành viên */}
              <div className="space-y-3 pt-4">
                <h3 className="font-bold text-sm uppercase text-slate-800 tracking-wide">
                  12 Tổ chức thành viên trực thuộc UB MTTQ phường
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs">
                  {MEMBER_ORGANIZATIONS.slice(0, 6).map((org) => (
                    <div key={org.id} className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-xs text-slate-900">{org.name}</span>
                        <span className="text-[10px] text-slate-400 font-mono">{org.memberCount} hội viên</span>
                      </div>
                      <p className="text-slate-500 text-[11px] line-clamp-2">{org.description}</p>
                      <div className="pt-2 border-t flex items-center justify-between text-[11px]">
                        <span className="text-slate-600">Người đứng đầu: <strong>{org.leaderName}</strong></span>
                        <span className="text-red-600 font-mono">{org.contactPhone}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: VISUAL BẢN ĐỒ 27 TỔ DÂN PHỐ (W6 & W7 CHUYÊN SÂU) */}
          {activeTab === 'TDP_MAP' && (
            <div className="space-y-6 animate-in fade-in">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b pb-4 bg-white p-5 rounded-2xl border border-slate-200">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 text-xs font-mono font-bold rounded bg-emerald-100 text-emerald-800">
                      BẢN ĐỒ SỐ & 27 TỔ DÂN PHỐ
                    </span>
                    <span className="text-xs text-slate-500">· Epicenter kết nối cơ sở</span>
                  </div>
                  <h2 className="text-xl md:text-2xl font-bold tracking-tight text-slate-900 mt-1">
                    Bản đồ số 26 vùng quy hoạch & 27 Trưởng ban Công tác Mặt trận
                  </h2>
                  <p className="text-xs text-slate-600 mt-0.5">
                    Mỗi tổ dân phố có 1 trang riêng và 1 mã QR dán tại bảng tin nhà văn hóa.
                  </p>
                </div>

                <div className="relative w-full md:w-72">
                  <Search className="w-3.5 h-3.5 absolute left-3 top-3 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Tìm theo ngõ, phố (Duy Tân, Cầu Giấy...)"
                    value={tdpSearch}
                    onChange={(e) => setTdpSearch(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 rounded-lg border border-slate-300 focus:outline-none focus:border-red-500"
                  />
                </div>
              </div>

              {/* Grid: Selected TDP Card with authentic image + 27 TDP list */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                <div className="lg:col-span-7 space-y-4">
                  {/* Selected TDP Landing Banner with Authentic Cultural House Photo */}
                  <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4">
                    <div className="relative rounded-xl overflow-hidden aspect-16/9 bg-slate-900">
                      <img
                        src={MTTQ_IMAGES.culturalHouse}
                        alt="Nhà văn hóa tổ dân phố"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                      <div className="absolute bottom-4 left-4 right-4 text-white">
                        <span className="text-[10px] bg-red-600 px-2 py-0.5 rounded font-mono font-bold">
                          {selectedMapTdp.code}
                        </span>
                        <h3 className="text-lg font-bold mt-1">{selectedMapTdp.name} — Phường Cầu Giấy</h3>
                        <p className="text-xs text-slate-200 mt-0.5">{selectedMapTdp.coverage}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                      <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                        <span className="text-slate-500 block text-[11px]">Trưởng ban Công tác Mặt trận:</span>
                        <strong className="text-slate-900 text-sm block">{selectedMapTdp.leaderName}</strong>
                        <a
                          href={`tel:${selectedMapTdp.leaderPhone}`}
                          className="inline-flex items-center gap-1 text-emerald-700 font-bold hover:underline pt-1"
                        >
                          <Phone className="w-3.5 h-3.5" />
                          <span>Gọi {selectedMapTdp.leaderPhone}</span>
                        </a>
                      </div>

                      <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                        <span className="text-slate-500 block text-[11px]">Nhà sinh hoạt văn hóa TDP:</span>
                        <strong className="text-slate-900 block text-xs">{selectedMapTdp.culturalHouseAddress}</strong>
                        <span className="text-[10px] text-slate-400">Quy mô: {selectedMapTdp.households} hộ ({selectedMapTdp.population} nhân khẩu)</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t">
                      <span className="text-xs text-slate-500">Mã QR dán tại bảng tin xóm: Sẵn sàng in</span>
                      <button
                        onClick={() => {
                          setFeedbackTdp(selectedMapTdp.id);
                          setActiveTab('FEEDBACK');
                        }}
                        className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 shadow-xs"
                      >
                        <Send className="w-3.5 h-3.5" />
                        <span>Gửi ý kiến phản ánh ({selectedMapTdp.name})</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Right: List of 27 TDP */}
                <div className="lg:col-span-5 space-y-2 max-h-[560px] overflow-y-auto pr-1">
                  {RESIDENTIAL_GROUPS_27.filter((t) => {
                    if (!tdpSearch.trim()) return true;
                    const q = tdpSearch.toLowerCase();
                    return t.name.toLowerCase().includes(q) || t.coverage.toLowerCase().includes(q) || t.leaderName.toLowerCase().includes(q);
                  }).map((tdp) => (
                    <div
                      key={tdp.id}
                      onClick={() => setSelectedMapTdp(tdp)}
                      className={`p-3 rounded-xl border cursor-pointer transition-all flex items-center justify-between text-xs ${
                        selectedMapTdp.id === tdp.id ? 'bg-red-50 border-red-500 shadow-xs' : 'bg-white border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <strong className="text-slate-900">{tdp.name}</strong>
                          <span className="text-[10px] text-slate-400 font-mono">{tdp.code}</span>
                        </div>
                        <span className="text-slate-600 block text-[11px] mt-0.5">Trưởng ban: {tdp.leaderName}</span>
                        <span className="text-slate-400 block text-[10px] line-clamp-1">{tdp.coverage}</span>
                      </div>
                      <ChevronRight className="w-4 h-4 text-slate-400 shrink-0" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: VISUAL HÒM THƯ NHÂN DÂN & TRA CỨU (W14 CHUYÊN SÂU) */}
          {activeTab === 'FEEDBACK' && (
            <div className="space-y-6 max-w-4xl mx-auto animate-in fade-in">
              <div className="border-b pb-4 bg-white p-5 rounded-2xl border border-slate-200">
                <span className="px-2 py-0.5 text-xs font-mono font-bold rounded bg-rose-100 text-rose-800">
                  HÒM THƯ SỐ LẮNG NGHE NHÂN DÂN NÓI
                </span>
                <h2 className="text-xl md:text-2xl font-bold tracking-tight text-slate-900 mt-1">
                  Tiếp nhận & Phản hồi ý kiến Nhân dân trong 7 ngày làm việc
                </h2>
                <p className="text-xs text-slate-600 mt-0.5">
                  Thực hiện chức năng giám sát của Nhân dân; bảo mật dữ liệu cá nhân theo Luật số 91/2025/QH15.
                </p>
              </div>

              {/* Form Card */}
              {!feedbackSubmittedCode ? (
                <form
                  onSubmit={handleFeedbackSubmit}
                  className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4 text-xs"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="font-semibold text-slate-700 block mb-1">
                        Lĩnh vực phản ánh <span className="text-red-500">*</span>
                      </label>
                      <select
                        value={feedbackDomain}
                        onChange={(e) => setFeedbackDomain(e.target.value)}
                        className="w-full p-2.5 bg-slate-50 rounded-lg border border-slate-300 focus:outline-none focus:border-red-500 font-medium"
                      >
                        <option value="URBAN_ENVIRONMENT">Môi trường & Trật tự đô thị Cầu Giấy</option>
                        <option value="CONSTRUCTION_PERMIT">Trật tự xây dựng & Giám sát công trình ngõ phố</option>
                        <option value="SOCIAL_SECURITY">Chế độ chính sách & An sinh xã hội</option>
                        <option value="COMMUNITY_RELATIONS">Hòa giải mâu thuẫn ngõ xóm</option>
                      </select>
                    </div>

                    <div>
                      <label className="font-semibold text-slate-700 block mb-1">
                        Tổ dân phố liên quan <span className="text-red-500">*</span>
                      </label>
                      <select
                        value={feedbackTdp}
                        onChange={(e) => setFeedbackTdp(Number(e.target.value))}
                        className="w-full p-2.5 bg-slate-50 rounded-lg border border-slate-300 focus:outline-none focus:border-red-500 font-medium"
                      >
                        {RESIDENTIAL_GROUPS_27.map((g) => (
                          <option key={g.id} value={g.id}>
                            {g.name} — Trưởng ban: {g.leaderName}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">
                      Tiêu đề tóm tắt ý kiến <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Ví dụ: Đề nghị nạo vét hố ga thoát nước ngõ 165 Cầu Giấy..."
                      value={feedbackTitle}
                      onChange={(e) => setFeedbackTitle(e.target.value)}
                      className="w-full p-2.5 bg-white rounded-lg border border-slate-300 focus:outline-none focus:border-red-500"
                    />
                  </div>

                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">
                      Nội dung phản ánh chi tiết <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      rows={4}
                      required
                      placeholder="Mô tả cụ thể thời gian, địa điểm, sự việc để UB MTTQ và Ban CTMT dễ dàng xác minh..."
                      value={feedbackContent}
                      onChange={(e) => setFeedbackContent(e.target.value)}
                      className="w-full p-2.5 bg-white rounded-lg border border-slate-300 focus:outline-none focus:border-red-500"
                    />
                  </div>

                  <div className="p-3 bg-slate-50 rounded-xl border text-[11px] text-slate-600">
                    Cam kết bảo mật dữ liệu cá nhân theo <strong>Luật Bảo vệ dữ liệu cá nhân số 91/2025/QH15</strong>. Thời hạn trả lời tối đa <strong>7 ngày làm việc</strong>.
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-bold text-xs shadow-md transition-colors"
                  >
                    Gửi ý kiến tới Ủy ban MTTQ phường Cầu Giấy
                  </button>
                </form>
              ) : (
                <div className="bg-white p-8 rounded-2xl border border-slate-200 text-center space-y-4 shadow-sm">
                  <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900">Gửi ý kiến thành công!</h3>
                  <p className="text-xs text-slate-600">
                    Ý kiến của bạn đã được chuyển tới Ban Thường trực UB MTTQ phường và Trưởng ban CTMT TDP {feedbackTdp}.
                  </p>
                  <div className="p-4 bg-slate-50 rounded-xl border max-w-sm mx-auto space-y-1">
                    <span className="text-xs text-slate-500">Mã tra cứu tiến độ của bạn:</span>
                    <strong className="text-2xl font-mono text-red-600 block">{feedbackSubmittedCode}</strong>
                    <span className="text-[11px] text-slate-400">Thời hạn phản hồi dự kiến: 11/10/2026</span>
                  </div>
                  <button
                    onClick={() => {
                      setFeedbackSubmittedCode(null);
                      setFeedbackTitle('');
                      setFeedbackContent('');
                    }}
                    className="px-4 py-2 bg-slate-800 text-white rounded-lg text-xs font-semibold"
                  >
                    Gửi thêm ý kiến khác
                  </button>
                </div>
              )}
            </div>
          )}
        </main>
      </div>

      {/* READ ARTICLE MODAL DIALOG */}
      {selectedArticle && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[85vh] overflow-hidden flex flex-col shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95">
            <div className="p-4 bg-slate-900 text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-xs bg-red-600 px-2 py-0.5 rounded font-bold">
                  {selectedArticle.category}
                </span>
                <span className="text-xs text-slate-400 font-mono">{selectedArticle.date}</span>
              </div>
              <button
                onClick={() => setSelectedArticle(null)}
                className="p-1 rounded-lg hover:bg-white/10 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-4 text-xs md:text-sm">
              <h2 className="text-lg md:text-xl font-bold text-slate-900 leading-snug">
                {selectedArticle.title}
              </h2>

              <div className="rounded-xl overflow-hidden aspect-16/9 bg-slate-100 border">
                <img
                  src={selectedArticle.image}
                  alt={selectedArticle.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="space-y-3 text-slate-700 leading-relaxed">
                {selectedArticle.content.map((p, idx) => (
                  <p key={idx}>{p}</p>
                ))}
              </div>

              <div className="p-3 bg-red-50 rounded-xl border border-red-200 text-red-900 text-xs flex items-center justify-between">
                <span>Bạn có ý kiến, kiến nghị liên quan đến nội dung này?</span>
                <button
                  onClick={() => {
                    setSelectedArticle(null);
                    setActiveTab('FEEDBACK');
                  }}
                  className="px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white rounded-lg font-bold text-xs"
                >
                  Gửi tới Hòm thư Mặt trận
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* FOOTER CHUẨN HÀNH CHÍNH (Theo Page FE.jpg: phường Cầu Giấy, TP. Hà Nội) */}
      <footer className="bg-slate-900 text-white text-xs py-4 px-6 border-t border-slate-800">
        <div className="flex flex-col md:flex-row items-center justify-between gap-3 text-slate-400 text-[11px]">
          <div className="flex items-center gap-3">
            <MttqEmblem size={26} />
            <span>
              <strong>ỦY BAN MẶT TRẬN TỔ QUỐC VIỆT NAM PHƯỜNG CẦU GIẤY</strong> · Địa chỉ: Số 1, đường Cầu Giấy, phường Cầu Giấy, TP. Hà Nội
            </span>
          </div>
          <div className="flex items-center gap-4">
            <span>Điện thoại: 024.3768.1201</span>
            <span>·</span>
            <span>Email: ub.mttq@caugiay.hanoi.gov.vn</span>
          </div>
        </div>
      </footer>
    </div>
  );
};
