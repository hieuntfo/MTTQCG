import React, { useState } from 'react';
import {
  DesignMode,
  AppLayer,
  UiState
} from '../../types';
import {
  RESIDENTIAL_GROUPS_27,
  NEWS_ARTICLES_SAMPLE,
  UPCOMING_SCHEDULE,
  MEMBER_ORGANIZATIONS
} from '../../data/mockData';
import { UxAnnotationBox } from '../common/UxAnnotationBox';
import { MttqEmblem } from '../common/Emblem';
import {
  Search,
  MapPin,
  Send,
  Calendar,
  Compass,
  Users,
  ShieldCheck,
  ChevronRight,
  Heart,
  FileText,
  Clock,
  ExternalLink
} from 'lucide-react';

interface PublicHomeViewProps {
  designMode: DesignMode;
  uiState: UiState;
  showAnnotations: boolean;
  onNavigate: (layer: AppLayer) => void;
  onSelectTdp: (tdpId: number) => void;
}

export const PublicHomeView: React.FC<PublicHomeViewProps> = ({
  designMode,
  uiState,
  showAnnotations,
  onNavigate,
  onSelectTdp
}) => {
  const isLoFi = designMode === 'LO_FI_WIREFRAME';
  const [quickSearch, setQuickSearch] = useState('');

  const filteredQuickTdp = RESIDENTIAL_GROUPS_27.filter((t) => {
    if (!quickSearch.trim()) return false;
    const q = quickSearch.toLowerCase();
    return t.name.toLowerCase().includes(q) || t.coverage.toLowerCase().includes(q) || t.leaderName.toLowerCase().includes(q);
  });

  return (
    <div className="space-y-8">
      {/* PRD Annotation Box when toggled on */}
      {showAnnotations && (
        <UxAnnotationBox
          layerCode="W1"
          layerName="Trang chủ Cổng thông tin Mặt trận Tổ quốc phường Cầu Giấy"
          targetUser="Người dân toàn phường, người cao tuổi, hội viên đoàn thể quét mã QR bảng tin"
          keyGoal="Trong 2 màn hình đầu tiên trên mobile, người dân thấy ngay tin quan trọng và tìm được tổ dân phố của mình"
          pokaYokeRules={[
            'Khối "Tìm tổ dân phố của bạn" được ưu tiên xếp ngay sau khối tin nổi bật',
            'Nhập tên ngõ hoặc phố (Duy Tân, Chùa Hà...) là tìm thấy ngay TDP và Trưởng ban CTMT tương ứng',
            'Băng cam kết Hòm thư số nổi bật với SLA 7 ngày làm việc và nút CTA màu nhấn',
            'Chuyên mục "Cầu Giấy – những câu chuyện đẹp" lan tỏa gương người tốt việc tốt cơ sở'
          ]}
          apiSource="GET /api/v1/mttq/public-home"
          slaRule="Cam kết cập nhật tin tức và thông báo mới ≤ 24h"
        />
      )}

      {/* 1. KHỐI TIN NỔI BẬT (PRD W1 mục 1: 1 tin lớn + 3 tin nhỏ) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Large featured article (8 Cols) */}
        <div className={`lg:col-span-8 p-5 rounded-2xl border flex flex-col justify-between ${
          isLoFi ? 'bg-white border-slate-300' : 'bg-white border-slate-200 shadow-xs'
        }`}>
          <div>
            <div className="flex items-center gap-2 mb-2 text-xs">
              <span className="font-bold text-red-700 bg-red-50 px-2 py-0.5 rounded">
                TIN NỔI BẬT HÔM NAY
              </span>
              <span className="text-slate-400">· 02/10/2026</span>
              <span className="text-slate-400">· Ban Thường trực</span>
            </div>

            {/* Simulated 16:9 photo container */}
            <div className={`w-full aspect-16/9 rounded-xl mb-4 flex flex-col items-center justify-center p-4 text-center border ${
              isLoFi 
                ? 'border-dashed border-slate-400 bg-slate-100 text-slate-500' 
                : 'bg-gradient-to-br from-red-950/80 via-slate-900 to-slate-950 text-white border-slate-800'
            }`}>
              {isLoFi ? (
                <>
                  <span className="text-xs font-mono font-bold">ẢNH 16:9 (KHÔNG CAROUSEL)</span>
                  <p className="text-[11px] text-slate-400 mt-1">Đoàn giám sát cộng đồng kiểm tra thực địa công trình ngõ 165 Cầu Giấy</p>
                </>
              ) : (
                <div className="space-y-1">
                  <ShieldCheck className="w-10 h-10 text-amber-400 mx-auto mb-2 opacity-90" />
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-300">
                    Bản sao số Cầu Giấy — Giám sát thực địa cơ sở
                  </span>
                  <p className="text-xs text-slate-200">
                    Ban Giám sát đầu tư của cộng đồng phối hợp Nhân dân TDP số 8 kiểm tra chất lượng thi công
                  </p>
                </div>
              )}
            </div>

            <h2 className="text-lg md:text-xl font-bold text-slate-900 leading-snug hover:text-red-700 cursor-pointer">
              {NEWS_ARTICLES_SAMPLE[0].title}
            </h2>
            <p className="text-xs md:text-sm text-slate-600 mt-2 leading-relaxed">
              {NEWS_ARTICLES_SAMPLE[0].summary}
            </p>
          </div>

          <div className="pt-4 border-t border-slate-100 mt-4 flex items-center justify-between text-xs">
            <span className="font-semibold text-slate-500">Chuyên mục: Dân chủ, giám sát – phản biện xã hội</span>
            <button
              onClick={() => onNavigate('L3_SUPERVISION')}
              className="text-red-600 font-bold hover:underline flex items-center gap-1"
            >
              <span>Xem chi tiết báo cáo</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* 3 smaller articles list (4 Cols) */}
        <div className="lg:col-span-4 space-y-3 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">
              Tin hoạt động Mặt trận
            </h3>
            <span className="text-xs text-slate-400">24h qua</span>
          </div>

          <div className="space-y-3 flex-1">
            {NEWS_ARTICLES_SAMPLE.slice(1).map((item) => (
              <div
                key={item.id}
                className={`p-3.5 rounded-xl border flex flex-col justify-between gap-1 transition-colors ${
                  isLoFi ? 'bg-white border-slate-300' : 'bg-white border-slate-200 hover:border-red-300 shadow-2xs'
                }`}
              >
                <div>
                  <span className="text-[10px] text-red-600 font-bold block mb-1">
                    {item.category}
                  </span>
                  <h4 className="font-semibold text-xs text-slate-900 line-clamp-2 hover:text-red-700 cursor-pointer">
                    {item.title}
                  </h4>
                </div>
                <div className="flex items-center justify-between text-[11px] text-slate-400 pt-2 border-t border-slate-100 mt-2">
                  <span>{item.date}</span>
                  <span className="font-mono text-slate-600">{item.tdpTag}</span>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={() => onNavigate('W4_REPRESENTATION')}
            className="w-full py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold text-center transition-colors"
          >
            Xem phân hệ Thông tin đại diện →
          </button>
        </div>
      </div>

      {/* 2. "TÌM TỔ DÂN PHỐ CỦA BẠN" (PRD W1 mục 2: EPICENTER NẰM TRONG 2 MÀN HÌNH ĐẦU) */}
      <div className={`p-6 rounded-2xl border ${
        isLoFi 
          ? 'bg-slate-100 border-slate-400' 
          : 'bg-gradient-to-r from-emerald-900 via-slate-900 to-slate-950 text-white border-emerald-700 shadow-md'
      }`}>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
          <div>
            <div className="flex items-center gap-2">
              <Compass className="w-4 h-4 text-emerald-400" />
              <span className="text-xs uppercase font-bold tracking-wider text-emerald-400">
                Tìm tổ dân phố của bạn · Bản đồ số 27 TDP
              </span>
            </div>
            <h2 className="text-lg md:text-xl font-bold mt-1">
              Bạn đang ở khu vực ngõ phố nào của phường Cầu Giấy?
            </h2>
            <p className="text-xs text-slate-300 mt-0.5">
              Gõ tên phố (Duy Tân, Cầu Giấy, Xuân Thủy...) để tìm ngay Trưởng ban CTMT và Nhà văn hóa TDP của bạn.
            </p>
          </div>

          <button
            onClick={() => onNavigate('W6_TDP_MAP')}
            className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-slate-950 rounded-lg text-xs font-bold shrink-0 flex items-center gap-1.5 transition-colors shadow-xs"
          >
            <span>Mở Bản đồ số 27 TDP</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Quick Search Input */}
        <div className="relative max-w-xl">
          <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
          <input
            type="text"
            placeholder="Ví dụ: ngõ 165 Cầu Giấy, Duy Tân, Chùa Hà, Cốm Vòng..."
            value={quickSearch}
            onChange={(e) => setQuickSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 bg-white text-slate-900 rounded-lg text-xs md:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400 shadow-sm"
          />
        </div>

        {/* Quick Search Instant Results */}
        {quickSearch && (
          <div className="mt-3 bg-white text-slate-900 rounded-xl p-3 border shadow-md space-y-2 max-h-60 overflow-y-auto">
            {filteredQuickTdp.length > 0 ? (
              filteredQuickTdp.map((t) => (
                <div
                  key={t.id}
                  onClick={() => onSelectTdp(t.id)}
                  className="p-2.5 rounded-lg hover:bg-slate-50 cursor-pointer flex items-center justify-between border-b last:border-0 border-slate-100"
                >
                  <div>
                    <strong className="text-xs text-slate-900 block">{t.name} — Trưởng ban: {t.leaderName}</strong>
                    <span className="text-[11px] text-slate-500">{t.coverage}</span>
                  </div>
                  <button className="text-xs text-emerald-700 font-bold hover:underline">
                    Vào trang TDP →
                  </button>
                </div>
              ))
            ) : (
              <div className="p-3 text-xs text-slate-500 text-center">
                Không tìm thấy tổ dân phố nào phù hợp. Vui lòng gọi Hotline phường <strong>024.3768.1201</strong> để được hướng dẫn.
              </div>
            )}
          </div>
        )}

        {/* 6 Popular TDP Quick Tags */}
        <div className="mt-4 pt-3 border-t border-white/10 flex flex-wrap items-center gap-2 text-xs">
          <span className="text-slate-400 text-[11px]">Tổ dân phố tiêu biểu:</span>
          {RESIDENTIAL_GROUPS_27.slice(0, 6).map((t) => (
            <button
              key={t.id}
              onClick={() => onSelectTdp(t.id)}
              className="px-2.5 py-1 rounded bg-white/10 hover:bg-white/20 text-slate-200 text-[11px] transition-colors"
            >
              {t.name}
            </button>
          ))}
        </div>
      </div>

      {/* 3. "CẦU GIẤY – NHỮNG CÂU CHUYỆN ĐẸP" (PRD W1 mục 3) */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Heart className="w-4 h-4 text-red-600 fill-red-600" />
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-800">
              Cầu Giấy – Những câu chuyện đẹp & Việc tử tế
            </h2>
          </div>
          <span className="text-xs text-slate-500">Lan tỏa việc tốt từ 27 TDP</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-2">
            <span className="text-[10px] font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded">
              Người tốt việc tốt
            </span>
            <h4 className="font-bold text-xs text-slate-900 leading-snug">
              Bác Đỗ Văn Thành — Trưởng ban CTMT hiến 20m² đất mở rộng ngõ xóm
            </h4>
            <p className="text-[11px] text-slate-500 line-clamp-2">
              Tấm gương sáng tại TDP 8 suốt 12 năm tận tụy vì bà con khu dân cư.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-2">
            <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
              Mô hình hay
            </span>
            <h4 className="font-bold text-xs text-slate-900 leading-snug">
              Tổ phụ nữ tự quản “Tuyến ngõ hoa không rác thải” tại phố Chùa Hà
            </h4>
            <p className="text-[11px] text-slate-500 line-clamp-2">
              Hội Phụ nữ TDP 3 nhân rộng mô hình phân loại rác tại nguồn.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-2">
            <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
              Việc tử tế
            </span>
            <h4 className="font-bold text-xs text-slate-900 leading-snug">
              Đội thanh niên tình nguyện “Áo xanh số” hỗ trợ người già TDP 19
            </h4>
            <p className="text-[11px] text-slate-500 line-clamp-2">
              Đoàn thanh niên đến tận nhà cài đặt an sinh xã hội cho thương bệnh binh.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-2">
            <span className="text-[10px] font-bold text-purple-600 bg-purple-50 px-2 py-0.5 rounded">
              An sinh xã hội
            </span>
            <h4 className="font-bold text-xs text-slate-900 leading-snug">
              Trao tặng mái ấm tình nghĩa cho cựu TNXP tại TDP 22
            </h4>
            <p className="text-[11px] text-slate-500 line-clamp-2">
              UB MTTQ phường và các nhà hảo tâm tài trợ sửa chữa nhà dột nát.
            </p>
          </div>
        </div>
      </div>

      {/* 4. BĂNG CTA HÒM THƯ "LẮNG NGHE NHÂN DÂN NÓI" (PRD W1 mục 7) */}
      <div className={`p-6 rounded-2xl border text-center space-y-3 ${
        isLoFi ? 'bg-slate-100 border-slate-300' : 'bg-red-50/70 border-red-300'
      }`}>
        <div className="inline-flex p-2.5 rounded-full bg-red-100 text-red-700 mb-1">
          <Send className="w-6 h-6" />
        </div>
        <h3 className="text-lg font-bold text-slate-900">
          Hòm thư số “Lắng nghe Nhân dân nói” — Cam kết phản hồi trong 7 ngày
        </h3>
        <p className="text-xs text-slate-600 max-w-xl mx-auto leading-relaxed">
          Mặt trận Tổ quốc phường Cầu Giấy là cầu nối ghi nhận mọi ý kiến đóng góp, phản ánh của Nhân dân và thực hiện quyền giám sát, phản biện xã hội.
        </p>

        <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={() => onNavigate('W14_MAILBOX')}
            className="px-6 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-lg font-bold text-xs shadow-xs transition-colors flex items-center gap-2"
          >
            <Send className="w-4 h-4" />
            <span>Gửi ý kiến ngay</span>
          </button>
          <button
            onClick={() => onNavigate('W14_MAILBOX')}
            className="px-5 py-2.5 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 rounded-lg font-semibold text-xs"
          >
            Tra cứu kết quả đã gửi
          </button>
        </div>
      </div>
    </div>
  );
};
