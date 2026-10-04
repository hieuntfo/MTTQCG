import React from 'react';
import {
  DesignMode,
  ResidentialGroup,
  UiState
} from '../../types';
import { RESIDENTIAL_GROUPS_27, NEWS_ARTICLES_SAMPLE } from '../../data/mockData';
import { UxAnnotationBox } from '../common/UxAnnotationBox';
import {
  MapPin,
  Phone,
  Home,
  Users,
  Calendar,
  Send,
  Printer,
  Download,
  Share2,
  ChevronLeft,
  QrCode,
  ShieldCheck,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

interface TdpDetailViewProps {
  tdpId: number;
  designMode: DesignMode;
  uiState: UiState;
  showAnnotations: boolean;
  onBackToMap: () => void;
  onGoToMailbox: (tdpId: number) => void;
}

export const TdpDetailView: React.FC<TdpDetailViewProps> = ({
  tdpId,
  designMode,
  uiState,
  showAnnotations,
  onBackToMap,
  onGoToMailbox
}) => {
  const isLoFi = designMode === 'LO_FI_WIREFRAME';

  const tdp = RESIDENTIAL_GROUPS_27.find((g) => g.id === tdpId) || RESIDENTIAL_GROUPS_27[7];

  return (
    <div className="space-y-6 pb-20">
      {/* PRD Annotation Box when toggled on */}
      {showAnnotations && (
        <UxAnnotationBox
          layerCode="W7"
          layerName="Trang chi tiết Tổ dân phố (Cửa vào trực tiếp từ Mã QR Bảng tin)"
          targetUser="Người dân trong tổ quét mã QR tại bảng tin; cán bộ theo dõi địa bàn"
          keyGoal="Hành trình tối giản: từ lúc quét QR tại bảng tin tới form gửi ý kiến ≤ 2 chạm; thấy mặt người quen (Trưởng ban CTMT)"
          pokaYokeRules={[
            'URL TDP cố định /to-dan-pho/{ma-tdp}, không đổi khi thay đổi nhân sự sau đại hội để QR in không bị hỏng',
            'Số điện thoại Trưởng ban CTMT có nút bấm là gọi trực tiếp',
            'Thanh CTA dính đáy màn hình (Sticky Bottom Bar) dẫn thẳng tới Hòm thư số với trường TDP được điền sẵn',
            'Khối Mã QR in ấn có độ phân giải cao sẵn sàng xuất PDF để Ban CTMT dán bảng tin xóm'
          ]}
          apiSource={`GET /api/v1/mttq/tdp/${tdp.code}`}
          slaRule="Tốc độ tải trang < 2.5s trên mạng di động 4G"
        />
      )}

      {/* Back button and breadcrumb */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBackToMap}
          className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-red-700 transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Quay lại Bản đồ 27 Tổ dân phố</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={() => alert(`Mã QR chuẩn in ấn khổ A4 cho ${tdp.name} đang được chuẩn bị in.`)}
            className="flex items-center gap-1 px-3 py-1.5 rounded text-xs border border-slate-300 hover:bg-slate-50 text-slate-700"
          >
            <Printer className="w-3.5 h-3.5 text-slate-500" />
            <span>In QR bảng tin</span>
          </button>
        </div>
      </div>

      {/* Main Hero Header */}
      <div className={`p-6 rounded-xl border ${
        isLoFi ? 'bg-slate-100 border-slate-300' : 'bg-gradient-to-r from-red-50 via-white to-slate-50 border-red-200 shadow-xs'
      }`}>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className={`px-2 py-0.5 rounded font-mono text-xs font-bold ${
                isLoFi ? 'bg-slate-300 text-slate-800' : 'bg-red-700 text-white'
              }`}>
                {tdp.code}
              </span>
              <span className="text-xs text-slate-500">Phường Cầu Giấy, TP Hà Nội</span>
            </div>
            <h1 className="text-2xl font-bold text-slate-900">{tdp.name}</h1>
            <p className="text-xs text-slate-600 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-red-600 shrink-0" />
              <span><strong>Phạm vi địa bàn:</strong> {tdp.coverage}</span>
            </p>
          </div>

          <div className="flex items-center gap-4 text-xs">
            <div className="text-center p-3 rounded-lg bg-white border border-slate-200">
              <span className="text-slate-500 block text-[11px]">Số hộ gia đình</span>
              <span className="text-lg font-bold font-mono text-slate-900">{tdp.households}</span>
            </div>
            <div className="text-center p-3 rounded-lg bg-white border border-slate-200">
              <span className="text-slate-500 block text-[11px]">Nhân khẩu</span>
              <span className="text-lg font-bold font-mono text-slate-900">{tdp.population}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Grid: Trưởng ban & Địa điểm sinh hoạt */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Card 1: Trưởng ban Công tác Mặt trận */}
        <div className={`p-5 rounded-xl border flex flex-col justify-between ${
          isLoFi ? 'bg-white border-slate-300' : 'bg-white border-slate-200 shadow-xs'
        }`}>
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-red-700 block mb-3">
              Đại diện Ban Công tác Mặt trận
            </span>

            <div className="flex items-center gap-4">
              <div className={`w-16 h-20 rounded-lg flex flex-col items-center justify-center font-bold text-xs shrink-0 border ${
                isLoFi ? 'border-dashed border-slate-400 bg-slate-100 text-slate-600' : 'bg-red-50 border-red-200 text-red-700'
              }`}>
                {isLoFi ? (
                  <span>ẢNH 3:4</span>
                ) : (
                  <div className="w-10 h-10 rounded-full bg-red-700 text-white font-bold flex items-center justify-center text-sm shadow-xs">
                    {tdp.leaderName.split(' ').slice(-1)[0][0]}
                  </div>
                )}
                <span className="text-[9px] text-slate-500 mt-1">Trưởng ban</span>
              </div>

              <div className="space-y-1">
                <h3 className="text-base font-bold text-slate-900">{tdp.leaderName}</h3>
                <p className="text-xs text-slate-500 font-medium">Trưởng ban Công tác Mặt trận {tdp.name}</p>
                <p className="text-xs text-slate-600">Thành viên Ban TTND & Tổ hòa giải cơ sở</p>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
            <span className="text-xs text-slate-500">Số điện thoại liên hệ:</span>
            <a
              href={`tel:${tdp.leaderPhone}`}
              className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs rounded-lg flex items-center gap-1.5 transition-colors shadow-2xs"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Gọi {tdp.leaderPhone}</span>
            </a>
          </div>
        </div>

        {/* Card 2: Nhà văn hóa & Điểm sinh hoạt cộng đồng */}
        <div className={`p-5 rounded-xl border flex flex-col justify-between ${
          isLoFi ? 'bg-white border-slate-300' : 'bg-white border-slate-200 shadow-xs'
        }`}>
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-600 block mb-3">
              Địa điểm sinh hoạt khu dân cư
            </span>

            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center shrink-0 border border-blue-200">
                <Home className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <h4 className="font-bold text-sm text-slate-900">Nhà sinh hoạt văn hóa {tdp.name}</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {tdp.culturalHouseAddress}
                </p>
                <div className="text-[11px] text-slate-500 pt-1">
                  Nơi tổ chức Ngày hội Đại đoàn kết toàn dân tộc (18/11 hàng năm) và các kỳ họp cử tri
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
            <span className="text-xs text-slate-500">Định vị Google Maps:</span>
            <button
              onClick={() => alert(`Mở bản đồ dẫn đường tới: ${tdp.culturalHouseAddress}`)}
              className="text-xs text-blue-600 font-semibold hover:underline flex items-center gap-1"
            >
              <span>Chỉ đường</span>
              <MapPin className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* QR Code Banner for Community Board (Khối in ấn dành cho Ban CTMT) */}
      <div className={`p-5 rounded-xl border flex flex-col sm:flex-row items-center justify-between gap-4 ${
        isLoFi ? 'bg-slate-50 border-slate-300' : 'bg-slate-900 text-white border-slate-800'
      }`}>
        <div className="flex items-center gap-4">
          <div className="w-20 h-20 bg-white p-2 rounded-lg border border-slate-200 flex items-center justify-center shrink-0 shadow-sm">
            {/* Realistic stylized QR SVG */}
            <svg viewBox="0 0 40 40" className="w-full h-full text-slate-900" fill="currentColor">
              <rect x="2" y="2" width="10" height="10" />
              <rect x="4" y="4" width="6" height="6" fill="white" />
              <rect x="5" y="5" width="4" height="4" />
              <rect x="28" y="2" width="10" height="10" />
              <rect x="30" y="4" width="6" height="6" fill="white" />
              <rect x="31" y="5" width="4" height="4" />
              <rect x="2" y="28" width="10" height="10" />
              <rect x="4" y="30" width="6" height="6" fill="white" />
              <rect x="5" y="31" width="4" height="4" />
              <rect x="16" y="5" width="8" height="4" />
              <rect x="16" y="16" width="8" height="8" />
              <rect x="28" y="16" width="4" height="8" />
              <rect x="5" y="16" width="4" height="8" />
              <rect x="16" y="28" width="8" height="4" />
              <rect x="28" y="28" width="8" height="8" />
            </svg>
          </div>

          <div className="space-y-1">
            <h4 className="font-bold text-sm">Mã QR Định danh của {tdp.name}</h4>
            <p className="text-xs text-slate-400 max-w-md">
              Mã QR này được dán tại bảng tin nhà văn hóa và cổng ngõ xóm. Người dân quét bằng Zalo / Camera để mở thẳng trang này và gửi kiến nghị không cần đăng nhập.
            </p>
            <div className="text-[10px] font-mono text-emerald-400">
              URL: bansaosocaugiay.vn/to-dan-pho/{tdp.code.toLowerCase()}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => alert(`Đã tải tệp ảnh SVG mã QR định danh cho ${tdp.name}.`)}
            className="px-3.5 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors border border-white/20"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Tải file in (SVG/PNG)</span>
          </button>
        </div>
      </div>

      {/* Sticky Bottom Action Bar (W7 PRD: Nút "Gửi ý kiến cho Mặt trận" cố định đáy màn hình) */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 border-t border-slate-200 p-3 backdrop-blur-md shadow-lg print:hidden">
        <div className="max-w-4xl mx-auto flex items-center justify-between gap-4">
          <div className="hidden sm:block text-xs">
            <span className="font-bold text-slate-800">Bạn muốn gửi phản ánh hoặc kiến nghị tại {tdp.name}?</span>
            <p className="text-[11px] text-slate-500">UB MTTQ phường Cầu Giấy cam kết xử lý và phản hồi trong 7 ngày làm việc.</p>
          </div>

          <button
            onClick={() => onGoToMailbox(tdp.id)}
            className="w-full sm:w-auto px-6 py-2.5 bg-red-600 hover:bg-red-700 active:scale-95 text-white font-bold text-xs sm:text-sm rounded-lg flex items-center justify-center gap-2 shadow-md transition-all"
          >
            <Send className="w-4 h-4" />
            <span>Gửi ý kiến cho Mặt trận (TDP số {tdp.id})</span>
          </button>
        </div>
      </div>
    </div>
  );
};
