import React from 'react';
import { DesignMode, AppLayer } from '../../types';
import {
  FileText,
  Layers,
  ShieldCheck,
  Users,
  Compass,
  Send,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  ExternalLink,
  BookOpen,
  Code
} from 'lucide-react';

interface PrdBlueprintViewProps {
  designMode: DesignMode;
  onNavigate: (layer: AppLayer) => void;
}

export const PrdBlueprintView: React.FC<PrdBlueprintViewProps> = ({
  designMode,
  onNavigate
}) => {
  const isLoFi = designMode === 'LO_FI_WIREFRAME';

  const layersList = [
    {
      code: 'L0',
      name: 'Đăng nhập',
      role: 'Cửa vào vùng điều hành',
      spec: 'S2',
      status: 'Đã hoàn thiện',
      layer: 'L0_LOGIN' as AppLayer,
      desc: 'Form cán bộ 5 cột, ảnh địa danh Cầu Giấy 7 cột, OTP 6 số, lối sang Cổng công khai'
    },
    {
      code: 'L1',
      name: 'Bảng điều hành (Hub 4 trụ cột)',
      role: 'Việc của tôi + Lối vào 4 trụ',
      spec: 'S3',
      status: 'Đã hoàn thiện',
      layer: 'L1_HUB' as AppLayer,
      desc: 'Việc của tôi lên đầu, 4 trụ cột Đảng ủy, HĐND, UBND, UB MTTQ (làm sâu trụ MTTQ)'
    },
    {
      code: 'L2',
      name: 'Trang đơn vị UB MTTQ phường',
      role: 'Trang cơ quan chủ quản',
      spec: 'S4',
      status: 'Đã hoàn thiện',
      layer: 'L2_MTTQ_UNIT' as AppLayer,
      desc: 'Hero đơn vị, 6 lối tắt, tin hoạt động, cơ cấu thu gọn, lịch tuần, văn bản mới'
    },
    {
      code: 'L3 (A)',
      name: 'Báo cáo giám sát & TTND',
      role: 'Chuyên mục nghiệp vụ MTTQ',
      spec: 'S5 & PRD',
      status: 'TRỌNG TÂM YÊU CẦU',
      layer: 'L3_SUPERVISION' as AppLayer,
      desc: 'Ban GSĐTCCĐ, Ban TTND, giám sát các công trình dân sinh 27 TDP, theo dõi SLA đôn đốc'
    },
    {
      code: 'L3 (B)',
      name: 'Xử lý ý kiến Hòm thư số',
      role: 'Chuyên mục nghiệp vụ cán bộ',
      spec: 'S5',
      status: 'Đã hoàn thiện',
      layer: 'L3_FEEDBACK_MGMT' as AppLayer,
      desc: 'Tiếp nhận ý kiến công dân, SLA 7 ngày, soạn văn bản phản hồi, bảo mật Luật 91/2025/QH15'
    },
    {
      code: 'W1',
      name: 'Cổng thông tin công khai MTTQ',
      role: 'Trang chủ người dân',
      spec: 'W1 & F2',
      status: 'Đã hoàn thiện',
      layer: 'W1_PUBLIC_HOME' as AppLayer,
      desc: 'Tin nổi bật, khối tìm kiếm 27 TDP trong 2 màn hình đầu, Cầu Giấy những câu chuyện đẹp'
    },
    {
      code: 'W4',
      name: 'Phân hệ Thông tin đại diện',
      role: 'Cơ quan đại diện Nhân dân',
      spec: 'W4 & F3',
      status: 'TRỌNG TÂM YÊU CẦU',
      layer: 'W4_REPRESENTATION' as AppLayer,
      desc: 'Ban Thường trực (Chủ tịch hàng đầu), danh sách 67 Ủy viên 5 khối, 12 tổ chức thành viên'
    },
    {
      code: 'W6',
      name: 'Bản đồ số & Ban CTMT 27 TDP',
      role: 'Epicenter kết nối cơ sở',
      spec: 'W6 & F4',
      status: 'Đã hoàn thiện',
      layer: 'W6_TDP_MAP' as AppLayer,
      desc: 'Bản đồ số 26 vùng ranh giới + 27 Trưởng ban CTMT, tìm kiếm theo tên ngõ phố'
    },
    {
      code: 'W7',
      name: 'Chi tiết Tổ dân phố (Cửa vào QR)',
      role: 'Trang landing quét QR bảng tin',
      spec: 'W7 & F4',
      status: 'Đã hoàn thiện',
      layer: 'W7_TDP_DETAIL' as AppLayer,
      desc: 'Trưởng ban CTMT, gọi trực tiếp, nhà văn hóa, mã QR in ấn, thanh CTA cố định gửi ý kiến'
    },
    {
      code: 'W14',
      name: 'Hòm thư số "Lắng nghe Nhân dân nói"',
      role: 'Kênh hai chiều giám sát',
      spec: 'W14 & F5',
      status: 'Đã hoàn thiện',
      layer: 'W14_MAILBOX' as AppLayer,
      desc: 'Cam kết SLA 7 ngày, quy trình 3 bước, form 1 trang, ẩn danh, mã tra cứu cỡ lớn'
    }
  ];

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="border-b pb-4">
        <div className="flex items-center gap-2">
          <span className="px-2 py-0.5 text-xs font-mono font-bold rounded bg-purple-100 text-purple-800">
            KIẾN TRÚC HỆ THỐNG & BLUEPRINT
          </span>
          <span className="text-xs text-slate-500">· Phiên bản PRD v0.2 (04/10/2026)</span>
        </div>
        <h1 className="text-2xl font-bold text-slate-900 mt-1">
          Bản đồ kiến trúc các lớp trang Dự án Bản sao số Cầu Giấy
        </h1>
        <p className="text-xs text-slate-600 mt-1 leading-relaxed">
          Tập trung chuyên sâu vào phân hệ <strong>Mặt trận Tổ quốc Việt Nam phường Cầu Giấy</strong>, cụ thể là phân hệ <strong>Thông tin đại diện (W4 & W5)</strong> và <strong>Báo cáo giám sát & Thanh tra nhân dân (L3)</strong>.
        </p>
      </div>

      {/* Layer Table */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
        <div className="p-4 bg-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Layers className="w-5 h-5 text-amber-400" />
            <h3 className="font-bold text-sm">Bản đồ kiến trúc phân lớp & Trạng thái triển khai</h3>
          </div>
          <span className="text-xs text-slate-400">10 / 10 Lớp trang</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-100 border-b text-[11px] uppercase tracking-wider text-slate-600">
              <tr>
                <th className="py-2.5 px-3 w-16">Mã lớp</th>
                <th className="py-2.5 px-4">Tên lớp màn hình</th>
                <th className="py-2.5 px-3">Vai trò chức năng</th>
                <th className="py-2.5 px-3">Đặc tả PRD</th>
                <th className="py-2.5 px-4">Mô tả chi tiết</th>
                <th className="py-2.5 px-3 text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {layersList.map((item) => (
                <tr key={item.code} className="hover:bg-slate-50 transition-colors">
                  <td className="py-3 px-3 font-mono font-bold text-slate-800">
                    {item.code}
                  </td>
                  <td className="py-3 px-4">
                    <strong className="text-slate-900 block">{item.name}</strong>
                    <span className="text-[10px] text-red-600 font-semibold">{item.status}</span>
                  </td>
                  <td className="py-3 px-3 text-slate-700">
                    {item.role}
                  </td>
                  <td className="py-3 px-3 font-mono text-purple-700 bg-purple-50 rounded">
                    {item.spec}
                  </td>
                  <td className="py-3 px-4 text-slate-600">
                    {item.desc}
                  </td>
                  <td className="py-3 px-3 text-right">
                    <button
                      onClick={() => onNavigate(item.layer)}
                      className="px-2.5 py-1 bg-red-600 hover:bg-red-700 text-white rounded text-xs font-semibold whitespace-nowrap"
                    >
                      Mở xem →
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 2 Vùng & Design Constitution (GOV.UK vs IBM Carbon) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-5 rounded-xl border border-blue-200 bg-blue-50/40 space-y-3 text-xs">
          <div className="flex items-center gap-2 text-blue-900 font-bold text-sm">
            <Users className="w-4 h-4 text-blue-700" />
            <span>VÙNG CÔNG KHAI (Không đăng nhập) — Chuẩn GOV.UK</span>
          </div>
          <ul className="list-disc list-inside space-y-1.5 text-slate-700">
            <li><strong>Điểm vào (Epicenter):</strong> Quét mã QR dán tại bảng tin 27 TDP hoặc vào trực tiếp qua tên miền.</li>
            <li><strong>Ngôn ngữ thị giác:</strong> Rõ ràng, cỡ chữ lớn (hỗ trợ nút Aa 125%), tương phản WCAG 2.1 AA, ít trang trí.</li>
            <li><strong>Tối giản thao tác:</strong> Từ QR tới form gửi ý kiến ≤ 2 chạm, không bắt đăng ký hay đăng nhập.</li>
            <li><strong>Các lớp trang:</strong> W1 (Trang chủ) · W4 (Thông tin đại diện) · W5 (12 Tổ chức) · W6 (Bản đồ 27 TDP) · W7 (Chi tiết TDP) · W14 (Hòm thư số).</li>
          </ul>
        </div>

        <div className="p-5 rounded-xl border border-red-200 bg-red-50/40 space-y-3 text-xs">
          <div className="flex items-center gap-2 text-red-900 font-bold text-sm">
            <ShieldCheck className="w-4 h-4 text-red-700" />
            <span>VÙNG ĐIỀU HÀNH (Sau đăng nhập) — Chuẩn IBM Carbon</span>
          </div>
          <ul className="list-disc list-inside space-y-1.5 text-slate-700">
            <li><strong>Đối tượng:</strong> Cán bộ 4 trụ cột (Đảng ủy, HĐND, UBND, UB MTTQ phường) và 27 Trưởng ban CTMT.</li>
            <li><strong>Ngôn ngữ thị giác:</strong> Mật độ thông tin cao (High Density), bảng dữ liệu có bộ lọc, sắp xếp, xuất báo cáo.</li>
            <li><strong>Trọng tâm MTTQ:</strong> Phân hệ Báo cáo giám sát (L3) & Phân hệ Quản lý xử lý phản ánh Hòm thư (L3).</li>
            <li><strong>An toàn thông tin:</strong> Xác thực 2 lớp OTP, mã hóa và bảo mật dữ liệu cá nhân theo Luật số 91/2025/QH15.</li>
          </ul>
        </div>
      </div>

      {/* Poka-Yoke & Lỗ Hổng PRD đã giải quyết */}
      <div className="p-5 rounded-xl bg-slate-900 text-white space-y-4 text-xs">
        <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
          <CheckCircle2 className="w-4 h-4" />
          <span>Các lỗ hổng PRD & Quyết định thiết kế đã được giải quyết triệt để</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-slate-300">
          <div className="space-y-1 bg-slate-800/80 p-3 rounded-lg border border-slate-700">
            <strong className="text-white block">1. Giải quyết mâu thuẫn Công khai hay Nội bộ?</strong>
            <p className="text-[11px] leading-relaxed">
              Tách bạch 2 vùng: Vùng công khai cho dân (không bắt đăng nhập để F4 và F5 sống động) và Vùng điều hành cán bộ có bảo mật 2 lớp OTP.
            </p>
          </div>

          <div className="space-y-1 bg-slate-800/80 p-3 rounded-lg border border-slate-700">
            <strong className="text-white block">2. Đặt Epicenter đúng chỗ trên Hub và Trang chủ</strong>
            <p className="text-[11px] leading-relaxed">
              Khối "Việc của tôi" đứng đầu trên Hub; khối "Tìm tổ dân phố của bạn" nằm trong 2 màn hình đầu tiên trên mobile; banner Thành Thái thu nhỏ.
            </p>
          </div>

          <div className="space-y-1 bg-slate-800/80 p-3 rounded-lg border border-slate-700">
            <strong className="text-white block">3. Giải quyết bài toán 26 vùng ranh giới / 27 Trưởng ban CTMT</strong>
            <p className="text-[11px] leading-relaxed">
              Bản đồ số hiển thị 26 vùng quy hoạch chuẩn, TDP 27 (khu đô thị mới) ghép phân vùng hành chính và có thẻ nổi bật đầy đủ 27 Trưởng ban.
            </p>
          </div>

          <div className="space-y-1 bg-slate-800/80 p-3 rounded-lg border border-slate-700">
            <strong className="text-white block">4. Tuân thủ Luật Bảo vệ dữ liệu cá nhân 91/2025/QH15</strong>
            <p className="text-[11px] leading-relaxed">
              Hòm thư số có tùy chọn gửi ẩn danh, checkbox bắt buộc đồng ý xử lý dữ liệu và cơ chế che thông tin (masking) đối với tài khoản không phụ trách.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
