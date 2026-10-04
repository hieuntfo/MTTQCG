import React from 'react';
import {
  DesignMode,
  AppLayer,
  UiState
} from '../../types';
import { UxAnnotationBox } from '../common/UxAnnotationBox';
import { MttqEmblem, NationalEmblem, PartyEmblem } from '../common/Emblem';
import {
  CheckSquare,
  Clock,
  MessageSquare,
  Calendar,
  ChevronRight,
  ShieldCheck,
  Building,
  Users,
  AlertTriangle,
  FileText,
  Lock,
  ArrowUpRight,
  Send,
  Flag
} from 'lucide-react';

interface L1HubViewProps {
  designMode: DesignMode;
  uiState: UiState;
  showAnnotations: boolean;
  onNavigate: (layer: AppLayer) => void;
}

export const L1HubView: React.FC<L1HubViewProps> = ({
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
          layerCode="L1"
          layerName="Bảng điều hành Hub 4 trụ cột (Hệ thống điều hành Phường Cầu Giấy)"
          targetUser="Cán bộ 4 trụ cột (Đảng ủy, HĐND, UBND, UB MTTQ); trọng tâm làm sâu trụ UB MTTQ"
          keyGoal="Trong 5 giây cán bộ biết hôm nay phải làm gì; trong 2 chạm tới được bất kỳ đơn vị nào"
          pokaYokeRules={[
            'Hạ banner phố đi bộ Thành Thái thành thẻ thông báo nhỏ (không chiếm vị trí epicenter quý giá)',
            'Đặt khối "Việc của tôi" và 5 việc ưu tiên lên đầu trang làm epicenter tác nghiệp',
            'Cột UB MTTQ phường chuẩn hóa 12 tổ chức thành viên + 27 Ban CTMT và phân hệ Báo cáo giám sát',
            'Các mũi tên đồng nhất dạng › (đi tới trang đơn vị), không dùng mũi tên mở rộng gây hiểu nhầm'
          ]}
          apiSource="GET /api/v1/governance/hub-dashboard"
          slaRule="Đồng bộ chỉ số công việc theo thời gian thực (Real-time task counters)"
        />
      )}

      {/* Greeting and Officer Profile Bar (PRD S3 mục 1) */}
      <div className={`p-4 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
        isLoFi ? 'bg-slate-100 border-slate-300' : 'bg-slate-900 text-white border-slate-800 shadow-sm'
      }`}>
        <div className="space-y-0.5">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <h1 className="text-base font-bold">
              Chào đồng chí Vũ Quốc Tuấn
            </h1>
            <span className="text-xs text-slate-400">· Ủy viên TT UB MTTQ phường Cầu Giấy</span>
          </div>
          <p className="text-xs text-slate-400">
            Hôm nay là Thứ Hai, ngày 05/10/2026 · Bạn có <strong>2 việc ưu tiên</strong> cần xử lý trước 17h00.
          </p>
        </div>

        <div className="flex items-center gap-3 text-xs shrink-0">
          <span className="text-slate-400">Phiên làm việc: Còn 52 phút</span>
          <button
            onClick={() => onNavigate('W1_PUBLIC_HOME')}
            className="px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white rounded text-xs font-semibold flex items-center gap-1"
          >
            <span>Xem Cổng công khai</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* "VIỆC CỦA TÔI" — 4 Metric Counters (PRD S3 mục 2) */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
            <CheckSquare className="w-4 h-4 text-red-600" />
            <span>Việc của tôi hôm nay</span>
          </h2>
          <span className="text-xs text-slate-500 font-mono-tabular">Cập nhật lúc 08:30</span>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {/* Card 1: Văn bản chờ xử lý */}
          <div
            onClick={() => alert('Chuyển tới danh mục 6 văn bản chỉ đạo chờ xử lý.')}
            className={`p-3.5 rounded-lg border cursor-pointer hover:border-slate-400 transition-all ${
              isLoFi ? 'bg-white border-slate-300' : 'bg-white border-slate-200 shadow-2xs'
            }`}
          >
            <span className="text-xs text-slate-500 block">Văn bản chỉ đạo chờ duyệt</span>
            <div className="flex items-baseline justify-between mt-1">
              <span className="text-2xl font-bold font-mono text-slate-900">06</span>
              <span className="text-[11px] text-slate-500">2 văn bản hỏa tốc</span>
            </div>
          </div>

          {/* Card 2: Việc đến hạn <= 3 ngày */}
          <div
            onClick={() => onNavigate('L3_SUPERVISION')}
            className={`p-3.5 rounded-lg border cursor-pointer hover:border-amber-400 transition-all ${
              isLoFi ? 'bg-white border-slate-300' : 'bg-white border-slate-200 shadow-2xs'
            }`}
          >
            <span className="text-xs text-slate-500 block">Giám sát cộng đồng đến hạn</span>
            <div className="flex items-baseline justify-between mt-1">
              <span className="text-2xl font-bold font-mono text-amber-600">03</span>
              <span className="text-[11px] font-semibold text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200">
                ≤ 3 ngày
              </span>
            </div>
          </div>

          {/* Card 3: Phản ánh chờ trả lời */}
          <div
            onClick={() => onNavigate('L3_FEEDBACK_MGMT')}
            className={`p-3.5 rounded-lg border cursor-pointer hover:border-red-400 transition-all ${
              isLoFi ? 'bg-white border-slate-300' : 'bg-white border-slate-200 shadow-2xs'
            }`}
          >
            <span className="text-xs text-slate-500 block">Phản ánh cử tri chờ trả lời</span>
            <div className="flex items-baseline justify-between mt-1">
              <span className="text-2xl font-bold font-mono text-red-600">02</span>
              <span className="text-[11px] font-bold text-red-700 bg-red-50 px-1.5 py-0.5 rounded border border-red-200">
                SLA 7 ngày
              </span>
            </div>
          </div>

          {/* Card 4: Lịch họp hôm nay */}
          <div
            onClick={() => alert('Cuộc họp hôm nay lúc 14h00: Ban Thường trực UB MTTQ hội ý công tác giám sát ngõ 165 Cầu Giấy.')}
            className={`p-3.5 rounded-lg border cursor-pointer hover:border-blue-400 transition-all ${
              isLoFi ? 'bg-white border-slate-300' : 'bg-white border-slate-200 shadow-2xs'
            }`}
          >
            <span className="text-xs text-slate-500 block">Cuộc họp & Tiếp xúc hôm nay</span>
            <div className="flex items-baseline justify-between mt-1">
              <span className="text-2xl font-bold font-mono text-blue-600">01</span>
              <span className="text-[11px] text-slate-500">14:00 - Hội trường</span>
            </div>
          </div>
        </div>
      </div>

      {/* 4 TRỤ CỘT ĐIỀU HÀNH (PRD S3 mục 4: Đảng ủy, HĐND, UBND, UB MTTQ sâu nhất) */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
            <Building className="w-4 h-4 text-slate-600" />
            <span>4 Trụ cột hệ thống điều hành phường Cầu Giấy</span>
          </h2>
          <span className="text-xs text-slate-500">Trọng tâm đợt 1: Trụ cột UB MTTQ làm sâu toàn diện</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 items-start">
          {/* Trụ cột 1: ĐẢNG ỦY */}
          <div className={`p-4 rounded-xl border space-y-3 ${
            isLoFi ? 'bg-white border-slate-300' : 'bg-white border-slate-200 shadow-xs'
          }`}>
            <div className="flex items-center gap-2.5 pb-2 border-b border-slate-100">
              <PartyEmblem size={28} />
              <div>
                <h3 className="font-bold text-xs uppercase text-slate-900">Đảng ủy phường</h3>
                <span className="text-[10px] text-slate-500">Lãnh đạo toàn diện</span>
              </div>
            </div>

            <div className="space-y-1 text-xs">
              <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Đơn vị trực thuộc</span>
              <div className="space-y-1">
                <button className="w-full text-left p-1.5 rounded hover:bg-slate-50 flex items-center justify-between text-slate-700">
                  <span>Ban Xây dựng Đảng</span>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                </button>
                <button className="w-full text-left p-1.5 rounded hover:bg-slate-50 flex items-center justify-between text-slate-700">
                  <span>Ủy ban Kiểm tra Đảng ủy</span>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                </button>
                <button className="w-full text-left p-1.5 rounded hover:bg-slate-50 flex items-center justify-between text-slate-700">
                  <span>Văn phòng Đảng ủy</span>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                </button>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100 space-y-1 text-xs">
              <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Chuyên mục nghiệp vụ</span>
              <div className="grid grid-cols-1 gap-1">
                <button className="p-1.5 rounded bg-slate-50 hover:bg-slate-100 text-left text-slate-700 flex items-center justify-between">
                  <span>Nghị quyết Đảng ủy</span>
                  <ChevronRight className="w-3 h-3 text-slate-400" />
                </button>
                <button className="p-1.5 rounded bg-slate-50 hover:bg-slate-100 text-left text-slate-700 flex items-center justify-between">
                  <span>Quản lý Đảng viên</span>
                  <Lock className="w-3 h-3 text-slate-400" />
                </button>
              </div>
            </div>
          </div>

          {/* Trụ cột 2: HỘI ĐỒNG NHÂN DÂN */}
          <div className={`p-4 rounded-xl border space-y-3 ${
            isLoFi ? 'bg-white border-slate-300' : 'bg-white border-slate-200 shadow-xs'
          }`}>
            <div className="flex items-center gap-2.5 pb-2 border-b border-slate-100">
              <NationalEmblem size={28} />
              <div>
                <h3 className="font-bold text-xs uppercase text-slate-900">Hội đồng nhân dân</h3>
                <span className="text-[10px] text-slate-500">Cơ quan quyền lực Nhà nước</span>
              </div>
            </div>

            <div className="space-y-1 text-xs">
              <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Đơn vị trực thuộc</span>
              <div className="space-y-1">
                <button className="w-full text-left p-1.5 rounded hover:bg-slate-50 flex items-center justify-between text-slate-700">
                  <span>Ban Văn hóa – Xã hội HĐND</span>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                </button>
                <button className="w-full text-left p-1.5 rounded hover:bg-slate-50 flex items-center justify-between text-slate-700">
                  <span>Ban Kinh tế – Ngân sách HĐND</span>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                </button>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100 space-y-1 text-xs">
              <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Chuyên mục nghiệp vụ</span>
              <div className="grid grid-cols-1 gap-1">
                <button className="p-1.5 rounded bg-slate-50 hover:bg-slate-100 text-left text-slate-700 flex items-center justify-between">
                  <span>Kỳ họp HĐND</span>
                  <ChevronRight className="w-3 h-3 text-slate-400" />
                </button>
                <button className="p-1.5 rounded bg-slate-50 hover:bg-slate-100 text-left text-slate-700 flex items-center justify-between">
                  <span>Tiếp xúc cử tri & Giám sát</span>
                  <ChevronRight className="w-3 h-3 text-slate-400" />
                </button>
              </div>
            </div>
          </div>

          {/* Trụ cột 3: ỦY BAN NHÂN DÂN */}
          <div className={`p-4 rounded-xl border space-y-3 ${
            isLoFi ? 'bg-white border-slate-300' : 'bg-white border-slate-200 shadow-xs'
          }`}>
            <div className="flex items-center gap-2.5 pb-2 border-b border-slate-100">
              <NationalEmblem size={28} />
              <div>
                <h3 className="font-bold text-xs uppercase text-slate-900">Ủy ban nhân dân</h3>
                <span className="text-[10px] text-slate-500">Cơ quan chấp hành</span>
              </div>
            </div>

            <div className="space-y-1 text-xs">
              <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Phòng ban chuyên môn</span>
              <div className="space-y-1">
                <button className="w-full text-left p-1.5 rounded hover:bg-slate-50 flex items-center justify-between text-slate-700">
                  <span>Phòng Đô thị – Hạ tầng</span>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                </button>
                <button className="w-full text-left p-1.5 rounded hover:bg-slate-50 flex items-center justify-between text-slate-700">
                  <span>Ban Quản lý dự án ĐTXD</span>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                </button>
                <button className="w-full text-left p-1.5 rounded hover:bg-slate-50 flex items-center justify-between text-slate-700">
                  <span>Bộ phận Tiếp nhận Một cửa</span>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                </button>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100 space-y-1 text-xs">
              <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Chuyên mục nghiệp vụ</span>
              <div className="grid grid-cols-1 gap-1">
                <button className="p-1.5 rounded bg-slate-50 hover:bg-slate-100 text-left text-slate-700 flex items-center justify-between">
                  <span>Điều hành kinh tế – xã hội</span>
                  <ChevronRight className="w-3 h-3 text-slate-400" />
                </button>
                <button className="p-1.5 rounded bg-slate-50 hover:bg-slate-100 text-left text-slate-700 flex items-center justify-between">
                  <span>Danh bạ cán bộ công chức</span>
                  <ChevronRight className="w-3 h-3 text-slate-400" />
                </button>
              </div>
            </div>
          </div>

          {/* Trụ cột 4: ỦY BAN MTTQ VIỆT NAM PHƯỜNG (LÀM SÂU NHẤT) */}
          <div className={`p-4 rounded-xl border-2 space-y-3 ${
            isLoFi 
              ? 'bg-slate-50 border-slate-500' 
              : 'bg-red-50/40 border-red-500 shadow-md ring-2 ring-red-500/20'
          }`}>
            <div className="flex items-center justify-between pb-2 border-b border-red-200">
              <div className="flex items-center gap-2.5">
                <MttqEmblem size={32} />
                <div>
                  <h3 className="font-bold text-xs uppercase text-red-800">UB MTTQ Việt Nam</h3>
                  <span className="text-[10px] text-red-600 font-bold">Trọng tâm triển khai đợt 1</span>
                </div>
              </div>
              <button
                onClick={() => onNavigate('L2_MTTQ_UNIT')}
                className="text-xs text-red-700 hover:underline font-bold flex items-center gap-0.5"
              >
                <span>Vào trang L2</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Sub-units */}
            <div className="space-y-1 text-xs">
              <div className="flex items-center justify-between text-[10px] uppercase font-bold text-slate-500 mb-1">
                <span>Đơn vị trực thuộc & Thành viên</span>
                <span className="font-mono text-red-600">12 tổ chức · 27 TDP</span>
              </div>
              <div className="space-y-1">
                <button
                  onClick={() => onNavigate('W5_MEMBER_ORGS')}
                  className="w-full text-left p-1.5 rounded bg-white hover:bg-red-50 border border-slate-200 flex items-center justify-between text-slate-800"
                >
                  <span className="font-medium">12 Tổ chức thành viên</span>
                  <span className="text-[10px] text-slate-400 font-mono">Đoàn, Hội... ›</span>
                </button>
                <button
                  onClick={() => onNavigate('W6_TDP_MAP')}
                  className="w-full text-left p-1.5 rounded bg-white hover:bg-emerald-50 border border-slate-200 flex items-center justify-between text-slate-800"
                >
                  <span className="font-medium text-emerald-800">Ban CTMT 27 Tổ dân phố</span>
                  <span className="text-[10px] text-emerald-600 font-bold">Epicenter ›</span>
                </button>
                <button
                  onClick={() => onNavigate('W4_REPRESENTATION')}
                  className="w-full text-left p-1.5 rounded bg-white hover:bg-slate-50 border border-slate-200 flex items-center justify-between text-slate-800"
                >
                  <span>Ban Thường trực & 67 Ủy viên</span>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                </button>
              </div>
            </div>

            {/* Core Operational Modules */}
            <div className="pt-2 border-t border-red-200 space-y-1.5 text-xs">
              <span className="text-[10px] uppercase font-bold text-red-900 block mb-1">
                Nghiệp vụ cốt lõi MTTQ:
              </span>
              
              <button
                onClick={() => onNavigate('L3_SUPERVISION')}
                className="w-full p-2 rounded-lg bg-red-600 text-white font-bold text-left flex items-center justify-between hover:bg-red-700 transition-colors shadow-2xs"
              >
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Báo cáo giám sát & TTND</span>
                </span>
                <span className="text-[11px] font-mono bg-red-800 px-1.5 py-0.5 rounded">
                  L3 ›
                </span>
              </button>

              <button
                onClick={() => onNavigate('L3_FEEDBACK_MGMT')}
                className="w-full p-2 rounded-lg bg-white border border-red-300 text-red-800 font-semibold text-left flex items-center justify-between hover:bg-red-50 transition-colors"
              >
                <span className="flex items-center gap-1.5">
                  <MessageSquare className="w-4 h-4 text-red-600" />
                  <span>Xử lý Phản ánh Hòm thư</span>
                </span>
                <span className="text-[11px] font-mono text-slate-500">
                  L3 ›
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Thông báo chung & Tuyến phố đi bộ Thành Thái (PRD S3 mục 5) */}
      <div className={`p-4 rounded-xl border flex flex-col md:flex-row items-center justify-between gap-4 ${
        isLoFi ? 'bg-slate-100 border-slate-300' : 'bg-slate-50 border-slate-200'
      }`}>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-red-100 text-red-700 flex items-center justify-center shrink-0">
            <Flag className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-900">
                Thông báo truyền thông: Không gian Tuyến phố đi bộ Thành Thái
              </span>
              <span className="text-[10px] bg-red-100 text-red-800 px-1.5 py-0.5 rounded font-medium">
                Văn hóa Cầu Giấy
              </span>
            </div>
            <p className="text-xs text-slate-600 mt-0.5">
              Tổ chức các hoạt động văn hóa, văn nghệ cộng đồng định kỳ vào tối thứ Bảy và Chủ nhật hàng tuần.
            </p>
          </div>
        </div>

        <button
          onClick={() => alert('Xem chi tiết kế hoạch hoạt động Tuyến phố đi bộ Thành Thái do UBND và MTTQ phối hợp tổ chức.')}
          className="px-3.5 py-1.5 bg-white border border-slate-300 rounded text-xs font-medium text-slate-700 hover:bg-slate-50 shrink-0"
        >
          Xem kế hoạch
        </button>
      </div>
    </div>
  );
};
