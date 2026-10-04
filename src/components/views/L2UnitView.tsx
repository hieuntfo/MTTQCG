import React from 'react';
import {
  DesignMode,
  AppLayer,
  UiState
} from '../../types';
import { UxAnnotationBox } from '../common/UxAnnotationBox';
import { MttqEmblem } from '../common/Emblem';
import { BAN_THUONG_TRUC, NEWS_ARTICLES_SAMPLE, UPCOMING_SCHEDULE } from '../../data/mockData';
import {
  Users,
  ShieldCheck,
  FileText,
  Calendar,
  Phone,
  Mail,
  Send,
  ChevronRight,
  ExternalLink,
  MapPin,
  CheckCircle2,
  Clock,
  Compass
} from 'lucide-react';

interface L2UnitViewProps {
  designMode: DesignMode;
  uiState: UiState;
  showAnnotations: boolean;
  onNavigate: (layer: AppLayer) => void;
}

export const L2UnitView: React.FC<L2UnitViewProps> = ({
  designMode,
  uiState,
  showAnnotations,
  onNavigate
}) => {
  const isLoFi = designMode === 'LO_FI_WIREFRAME';

  return (
    <div className="space-y-6">
      {/* PRD Annotation Box when toggled on */}
      {showAnnotations && (
        <UxAnnotationBox
          layerCode="L2"
          layerName="Template Trang đơn vị: Ủy ban MTTQ Việt Nam phường Cầu Giấy"
          targetUser="Cán bộ cơ quan UB MTTQ, tổ chức thành viên, nhân dân tra cứu hoạt động chuyên sâu của đơn vị"
          keyGoal="Chuẩn hóa theo S4 PRD: Hero đơn vị, 6 lối tắt, Tin hoạt động, Cơ cấu thu gọn, Lịch tuần, Văn bản mới, Liên hệ"
          pokaYokeRules={[
            'Đơn vị chỉ được đổi biểu trưng, khẩu hiệu và 1 màu nhấn; giữ nguyên header, sidebar, footer đồng nhất',
            'Không dùng carousel chuyển động gây khó chịu cho người cao tuổi, thay bằng 1 ảnh tĩnh trang trọng',
            'Các khối rỗng tự động ẩn, khối có dữ liệu phân chia nhãn [Công khai] và [Nội bộ]',
            'Footer chuẩn hóa: phường Cầu Giấy, TP Hà Nội (không còn cấp quận từ 01/7/2025)'
          ]}
          apiSource="GET /api/v1/mttq/unit-profile"
          slaRule="Đồng bộ lịch công tác tuần vào sáng thứ Hai hàng tuần"
        />
      )}

      {/* 1. HERO ĐƠN VỊ (PRD S4 mục 1) */}
      <div className={`p-6 rounded-2xl border ${
        isLoFi 
          ? 'bg-slate-100 border-slate-300' 
          : 'bg-gradient-to-r from-red-900 via-red-800 to-slate-900 text-white border-red-700 shadow-md'
      }`}>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          <div className="md:col-span-8 space-y-3">
            <div className="flex items-center gap-3">
              {isLoFi ? (
                <div className="w-14 h-14 border-2 border-dashed border-slate-500 rounded-full flex items-center justify-center font-bold text-xs bg-slate-200">
                  MTTQ
                </div>
              ) : (
                <MttqEmblem size={56} />
              )}
              <div>
                <span className={`text-xs uppercase font-bold tracking-wider ${
                  isLoFi ? 'text-red-700' : 'text-amber-400'
                }`}>
                  Hệ thống 4 trụ cột · Đơn vị trực thuộc L2
                </span>
                <h1 className={`text-xl md:text-2xl font-bold leading-tight ${
                  isLoFi ? 'text-slate-900' : 'text-white'
                }`}>
                  ỦY BAN MẶT TRẬN TỔ QUỐC VIỆT NAM PHƯỜNG CẦU GIẤY
                </h1>
              </div>
            </div>

            <p className={`text-xs md:text-sm italic font-medium max-w-2xl leading-relaxed ${
              isLoFi ? 'text-slate-700' : 'text-red-100'
            }`}>
              “Đại đoàn kết toàn dân tộc — Lắng nghe Nhân dân nói — Giám sát thực chất, phụng sự cộng đồng dân cư”
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                onClick={() => onNavigate('L3_SUPERVISION')}
                className={`px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-2 shadow-xs transition-colors ${
                  isLoFi ? 'bg-slate-900 text-white' : 'bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold'
                }`}
              >
                <ShieldCheck className="w-4 h-4" />
                <span>Vào phân hệ Báo cáo giám sát</span>
              </button>

              <button
                onClick={() => onNavigate('W14_MAILBOX')}
                className={`px-4 py-2 rounded-lg text-xs font-semibold flex items-center gap-2 transition-colors ${
                  isLoFi ? 'bg-white border border-slate-400 text-slate-800' : 'bg-white/10 hover:bg-white/20 text-white border border-white/20'
                }`}
              >
                <Send className="w-4 h-4" />
                <span>Tiếp nhận phản ánh cử tri</span>
              </button>
            </div>
          </div>

          {/* Hero right image card */}
          <div className="md:col-span-4 hidden md:block">
            <div className={`aspect-4/3 rounded-xl border flex flex-col items-center justify-center p-4 text-center ${
              isLoFi ? 'border-dashed border-slate-400 bg-slate-200 text-slate-600' : 'bg-black/30 border-white/20 text-slate-200'
            }`}>
              <Users className="w-10 h-10 mb-2 opacity-80" />
              <span className="text-xs font-bold">ẢNH HOẠT ĐỘNG THỰC TẾ</span>
              <p className="text-[10px] mt-1 text-slate-400">
                Đại hội đại biểu MTTQ phường Cầu Giấy nhiệm kỳ 2026 – 2031
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 2. LỐI TẮT TỐI ĐA 6 Ô (PRD S4 mục 2) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        <button
          onClick={() => onNavigate('W4_REPRESENTATION')}
          className={`p-3 rounded-xl border text-center transition-all hover:scale-102 ${
            isLoFi ? 'bg-white border-slate-300' : 'bg-white border-slate-200 hover:border-red-400 shadow-2xs'
          }`}
        >
          <Users className="w-5 h-5 mx-auto text-red-600 mb-1.5" />
          <span className="text-xs font-bold text-slate-800 block">Thông tin đại diện</span>
          <span className="text-[10px] text-slate-500">Ban TT & 67 UV</span>
        </button>

        <button
          onClick={() => onNavigate('L3_SUPERVISION')}
          className={`p-3 rounded-xl border text-center transition-all hover:scale-102 ${
            isLoFi ? 'bg-white border-slate-300' : 'bg-white border-slate-200 hover:border-red-400 shadow-2xs'
          }`}
        >
          <ShieldCheck className="w-5 h-5 mx-auto text-amber-600 mb-1.5" />
          <span className="text-xs font-bold text-slate-800 block">Báo cáo giám sát</span>
          <span className="text-[10px] text-slate-500">GSĐTCCĐ & TTND</span>
        </button>

        <button
          onClick={() => onNavigate('W6_TDP_MAP')}
          className={`p-3 rounded-xl border text-center transition-all hover:scale-102 ${
            isLoFi ? 'bg-white border-slate-300' : 'bg-white border-slate-200 hover:border-red-400 shadow-2xs'
          }`}
        >
          <Compass className="w-5 h-5 mx-auto text-emerald-600 mb-1.5" />
          <span className="text-xs font-bold text-slate-800 block">Bản đồ 27 TDP</span>
          <span className="text-[10px] text-slate-500">Ban CTMT cơ sở</span>
        </button>

        <button
          onClick={() => onNavigate('W5_MEMBER_ORGS')}
          className={`p-3 rounded-xl border text-center transition-all hover:scale-102 ${
            isLoFi ? 'bg-white border-slate-300' : 'bg-white border-slate-200 hover:border-red-400 shadow-2xs'
          }`}
        >
          <Users className="w-5 h-5 mx-auto text-blue-600 mb-1.5" />
          <span className="text-xs font-bold text-slate-800 block">12 Tổ chức TV</span>
          <span className="text-[10px] text-slate-500">Đoàn, Hội, LLVT</span>
        </button>

        <button
          onClick={() => alert('Mở Thư viện văn bản chỉ đạo của MTTQ TW, MTTQ TP Hà Nội và kế hoạch của UB MTTQ phường.')}
          className={`p-3 rounded-xl border text-center transition-all hover:scale-102 ${
            isLoFi ? 'bg-white border-slate-300' : 'bg-white border-slate-200 hover:border-red-400 shadow-2xs'
          }`}
        >
          <FileText className="w-5 h-5 mx-auto text-purple-600 mb-1.5" />
          <span className="text-xs font-bold text-slate-800 block">Văn bản chỉ đạo</span>
          <span className="text-[10px] text-slate-500">Luật, Điều lệ, HD</span>
        </button>

        <button
          onClick={() => onNavigate('W14_MAILBOX')}
          className={`p-3 rounded-xl border text-center transition-all hover:scale-102 ${
            isLoFi ? 'bg-white border-slate-300' : 'bg-white border-slate-200 hover:border-red-400 shadow-2xs'
          }`}
        >
          <Send className="w-5 h-5 mx-auto text-rose-600 mb-1.5" />
          <span className="text-xs font-bold text-slate-800 block">Hòm thư số</span>
          <span className="text-[10px] text-slate-500">SLA 7 ngày</span>
        </button>
      </div>

      {/* 3. TIN HOẠT ĐỘNG & CƠ CẤU TỔ CHỨC THU GỌN (PRD S4 mục 3) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: Tin hoạt động (1 tin lớn + 3 tin nhỏ) - 8 Cols */}
        <div className="lg:col-span-8 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
              <FileText className="w-4 h-4 text-red-600" />
              <span>Tin tức & Hoạt động Mặt trận</span>
            </h2>
            <span className="text-xs text-red-600 hover:underline cursor-pointer">
              Xem tất cả bài viết →
            </span>
          </div>

          {/* Hero Article */}
          {NEWS_ARTICLES_SAMPLE.slice(0, 1).map((news) => (
            <div
              key={news.id}
              className={`p-4 rounded-xl border ${
                isLoFi ? 'bg-white border-slate-300' : 'bg-white border-slate-200 shadow-2xs'
              }`}
            >
              <div className="flex items-center gap-2 mb-2 text-[11px] text-slate-500">
                <span className="font-semibold text-red-700 bg-red-50 px-2 py-0.5 rounded">
                  {news.category}
                </span>
                <span>·</span>
                <span>{news.date}</span>
                <span>·</span>
                <span>{news.author}</span>
              </div>

              <h3 className="text-base font-bold text-slate-900 leading-snug hover:text-red-700 cursor-pointer">
                {news.title}
              </h3>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                {news.summary}
              </p>
            </div>
          ))}

          {/* Smaller articles */}
          <div className="space-y-2">
            {NEWS_ARTICLES_SAMPLE.slice(1).map((news) => (
              <div
                key={news.id}
                className="p-3 bg-white rounded-lg border border-slate-200 hover:border-slate-300 flex items-start justify-between gap-3"
              >
                <div>
                  <span className="text-[10px] text-slate-500 font-medium">
                    {news.category} · {news.date}
                  </span>
                  <h4 className="font-semibold text-xs text-slate-900 hover:text-red-700 cursor-pointer mt-0.5">
                    {news.title}
                  </h4>
                </div>
                <span className="text-[10px] font-mono text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded shrink-0">
                  {news.tdpTag}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Cơ cấu tổ chức thu gọn & Lịch sắp tới - 4 Cols */}
        <div className="lg:col-span-4 space-y-4">
          {/* Cơ cấu tổ chức thu gọn */}
          <div className={`p-4 rounded-xl border space-y-3 ${
            isLoFi ? 'bg-slate-50 border-slate-300' : 'bg-white border-slate-200 shadow-2xs'
          }`}>
            <div className="flex items-center justify-between border-b pb-2">
              <h3 className="font-bold text-xs uppercase text-slate-800">Cơ cấu tổ chức MTTQ</h3>
              <button
                onClick={() => onNavigate('W4_REPRESENTATION')}
                className="text-xs text-red-600 hover:underline"
              >
                Xem sơ đồ →
              </button>
            </div>

            <div className="space-y-2 text-xs">
              <div className="p-2 rounded bg-slate-50 border border-slate-100 flex items-center justify-between">
                <div>
                  <strong className="block text-slate-900">Bà Nguyễn Thị Bích Hòa</strong>
                  <span className="text-[10px] text-slate-500">Chủ tịch Ủy ban MTTQ phường</span>
                </div>
                <span className="text-[10px] bg-red-100 text-red-800 px-2 py-0.5 rounded font-bold">Đứng đầu</span>
              </div>

              <div className="p-2 rounded bg-slate-50 border border-slate-100 flex items-center justify-between">
                <div>
                  <strong className="block text-slate-900">Ông Trần Văn Mạnh</strong>
                  <span className="text-[10px] text-slate-500">Phó Chủ tịch Thường trực</span>
                </div>
                <span className="text-[10px] bg-slate-200 text-slate-700 px-2 py-0.5 rounded font-semibold">Cấp phó</span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-center text-xs pt-1">
                <div className="p-2 bg-slate-100 rounded">
                  <span className="text-slate-500 block text-[10px]">Tổ chức thành viên</span>
                  <strong className="font-mono text-slate-900">12 đơn vị</strong>
                </div>
                <div className="p-2 bg-slate-100 rounded">
                  <span className="text-slate-500 block text-[10px]">Ban CTMT cơ sở</span>
                  <strong className="font-mono text-emerald-700">27 TDP</strong>
                </div>
              </div>
            </div>
          </div>

          {/* Lịch công tác sắp tới (3 mục) */}
          <div className={`p-4 rounded-xl border space-y-3 ${
            isLoFi ? 'bg-slate-50 border-slate-300' : 'bg-white border-slate-200 shadow-2xs'
          }`}>
            <div className="flex items-center justify-between border-b pb-2">
              <h3 className="font-bold text-xs uppercase text-slate-800 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-red-600" />
                <span>Lịch công tác tuần</span>
              </h3>
              <span className="text-[11px] text-slate-500">Tháng 10/2026</span>
            </div>

            <div className="space-y-2.5 text-xs">
              {UPCOMING_SCHEDULE.map((sch) => (
                <div key={sch.id} className="space-y-0.5">
                  <div className="flex items-center justify-between text-[11px] font-mono text-red-700 font-semibold">
                    <span>{sch.date}</span>
                    <span>{sch.time}</span>
                  </div>
                  <h4 className="font-semibold text-slate-800 line-clamp-1">{sch.title}</h4>
                  <span className="text-[10px] text-slate-500 block truncate">Địa điểm: {sch.location}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
