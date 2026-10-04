import React, { useState } from 'react';
import {
  DesignMode,
  CitizenFeedback,
  FeedbackStatus,
  FeedbackDomain,
  UiState
} from '../../types';
import { CITIZEN_FEEDBACK_LIST, RESIDENTIAL_GROUPS_27 } from '../../data/mockData';
import { UxAnnotationBox } from '../common/UxAnnotationBox';
import {
  MessageSquare,
  Search,
  Filter,
  Clock,
  CheckCircle,
  AlertTriangle,
  ArrowRight,
  Shield,
  Eye,
  EyeOff,
  Send,
  FileText,
  UserCheck
} from 'lucide-react';

interface L3FeedbackMgmtViewProps {
  designMode: DesignMode;
  uiState: UiState;
  showAnnotations: boolean;
}

export const L3FeedbackMgmtView: React.FC<L3FeedbackMgmtViewProps> = ({
  designMode,
  uiState,
  showAnnotations
}) => {
  const isLoFi = designMode === 'LO_FI_WIREFRAME';

  const [feedbacks, setFeedbacks] = useState<CitizenFeedback[]>(CITIZEN_FEEDBACK_LIST);
  const [selectedFeedback, setSelectedFeedback] = useState<CitizenFeedback | null>(feedbacks[0]);
  const [filterStatus, setFilterStatus] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Privacy mask toggle (Luật 91/2025/QH15)
  const [unmaskPrivacy, setUnmaskPrivacy] = useState(false);

  // Officer reply input
  const [replyText, setReplyText] = useState('');
  const [isReplying, setIsReplying] = useState(false);

  const filteredFeedbacks = feedbacks.filter((f) => {
    if (filterStatus !== 'ALL' && f.status !== filterStatus) return false;
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      return (
        f.title.toLowerCase().includes(q) ||
        f.trackingCode.toLowerCase().includes(q) ||
        f.content.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const handleSendReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFeedback || !replyText.trim()) return;

    setIsReplying(true);
    setTimeout(() => {
      setIsReplying(false);
      const updated = feedbacks.map((item) => {
        if (item.id === selectedFeedback.id) {
          return {
            ...item,
            status: 'ANSWERED' as FeedbackStatus,
            officialReply: replyText,
            replyDate: '04/10/2026 14:00'
          };
        }
        return item;
      });
      setFeedbacks(updated);
      setSelectedFeedback({
        ...selectedFeedback,
        status: 'ANSWERED',
        officialReply: replyText,
        replyDate: '04/10/2026 14:00'
      });
      setReplyText('');
      alert(`Đã ban hành văn bản trả lời công dân mã ${selectedFeedback.trackingCode}. Kết quả đã đồng bộ lên Hòm thư số công khai.`);
    }, 400);
  };

  const getStatusBadge = (status: FeedbackStatus) => {
    switch (status) {
      case 'RECEIVED':
        return <span className="px-2 py-0.5 rounded text-[11px] font-medium bg-blue-100 text-blue-800">Mới nhận</span>;
      case 'INVESTIGATING':
        return <span className="px-2 py-0.5 rounded text-[11px] font-medium bg-amber-100 text-amber-800">Đang xác minh</span>;
      case 'ANSWERED':
        return <span className="px-2 py-0.5 rounded text-[11px] font-medium bg-emerald-100 text-emerald-800">Đã trả lời</span>;
      case 'FORWARDED':
        return <span className="px-2 py-0.5 rounded text-[11px] font-medium bg-purple-100 text-purple-800">Chuyển cơ quan</span>;
    }
  };

  return (
    <div className="space-y-6">
      {/* PRD Annotation Box when toggled on */}
      {showAnnotations && (
        <UxAnnotationBox
          layerCode="L3"
          layerName="Chuyên mục nghiệp vụ: Quản lý & Xử lý Ý kiến Nhân dân (Cán bộ MTTQ)"
          targetUser="Chuyên viên phụ trách Văn phòng UB MTTQ, Ban TTND, Trưởng ban CTMT 27 TDP"
          keyGoal="Kiểm soát và thụ lý 100% ý kiến của công dân theo quy trình SLA 7 ngày làm việc; bảo mật thông tin cá nhân theo Luật 91/2025/QH15"
          pokaYokeRules={[
            'Hạn trả lời 7 ngày làm việc: Đồng hồ SLA cảnh báo màu vàng khi ≤ 3 ngày và tô đỏ khi quá hạn',
            'Bảo mật thông tin cá nhân: Mặc định ẩn số điện thoại/họ tên người dân (***), chỉ cán bộ thụ lý chính thức mới được mở khóa',
            'Soạn thảo văn bản phản hồi trực tiếp và gửi thông báo tới mã tra cứu của công dân',
            'Có nút phân công hoặc chuyển tiếp sang UBND phường đối với các vụ việc vượt thẩm quyền Mặt trận'
          ]}
          apiSource="GET /api/v1/mttq/feedback-queue & POST /api/v1/mttq/feedback-reply"
          slaRule="SLA 7 ngày làm việc — KPI tỷ lệ phản hồi đúng hạn ≥ 90%"
        />
      )}

      {/* Header */}
      <div className="border-b pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <span className={`px-2 py-0.5 text-xs font-mono font-bold rounded ${
              isLoFi ? 'bg-slate-300 text-slate-800' : 'bg-red-100 text-red-800'
            }`}>
              NGHIỆP VỤ ĐIỀU HÀNH
            </span>
            <span className="text-xs text-slate-500">· Hòm thư Lắng nghe Nhân dân nói</span>
          </div>
          <h1 className="text-xl md:text-2xl font-bold text-slate-900 mt-1">
            Xử lý Phản ánh, Kiến nghị của cử tri & Nhân dân
          </h1>
          <p className="text-xs text-slate-600 mt-0.5">
            Tiếp nhận từ 27 Tổ dân phố. Đôn đốc giải quyết khiếu nại, tố cáo và kiến nghị chính đáng của Nhân dân.
          </p>
        </div>

        <div className="flex items-center gap-3 text-xs">
          <div className="p-2 rounded bg-slate-50 border border-slate-200 text-center">
            <span className="text-slate-500 block text-[10px]">Đúng hạn SLA</span>
            <strong className="text-emerald-700 text-sm font-mono-tabular">94.2%</strong>
          </div>
          <div className="p-2 rounded bg-slate-50 border border-slate-200 text-center">
            <span className="text-slate-500 block text-[10px]">Chờ xử lý</span>
            <strong className="text-amber-700 text-sm font-mono-tabular">2 ca</strong>
          </div>
        </div>
      </div>

      {/* Filter and Search */}
      <div className={`p-3 rounded-lg border flex flex-wrap items-center justify-between gap-3 ${
        isLoFi ? 'bg-slate-100 border-slate-300' : 'bg-slate-50 border-slate-200'
      }`}>
        <div className="flex flex-wrap items-center gap-2 flex-1">
          <div className="relative min-w-[220px]">
            <Search className="w-3.5 h-3.5 absolute left-2.5 top-2.5 text-slate-400" />
            <input
              type="text"
              placeholder="Tìm theo mã ý kiến, tiêu đề..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 text-xs bg-white rounded border border-slate-300 focus:outline-none focus:border-red-500"
            />
          </div>

          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="py-1.5 px-2.5 text-xs bg-white rounded border border-slate-300 text-slate-700 focus:outline-none"
          >
            <option value="ALL">Tất cả trạng thái</option>
            <option value="RECEIVED">Mới tiếp nhận</option>
            <option value="INVESTIGATING">Đang xác minh thực địa</option>
            <option value="ANSWERED">Đã phản hồi chính thức</option>
            <option value="FORWARDED">Đã chuyển UBND xử lý</option>
          </select>
        </div>

        <div className="text-xs text-slate-500 font-mono-tabular">
          Tổng số: <strong>{filteredFeedbacks.length}</strong> ý kiến
        </div>
      </div>

      {/* Grid: 7 Cols Feedback Table + 5 Cols Reply Drawer */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Table: 7 Cols */}
        <div className="lg:col-span-7 space-y-3">
          <div className="bg-white rounded-lg border border-slate-200 overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className={`border-b text-[11px] uppercase tracking-wider ${
                  isLoFi ? 'bg-slate-200 text-slate-700' : 'bg-slate-100 text-slate-600'
                }`}>
                  <tr>
                    <th className="py-2.5 px-3">Mã số</th>
                    <th className="py-2.5 px-3">Nội dung phản ánh</th>
                    <th className="py-2.5 px-3">TDP</th>
                    <th className="py-2.5 px-3">Hạn SLA</th>
                    <th className="py-2.5 px-3 text-right">Trạng thái</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredFeedbacks.map((f) => {
                    const isSelected = selectedFeedback?.id === f.id;
                    const isOverdue = f.slaDaysLeft <= 0 && f.status !== 'ANSWERED';

                    return (
                      <tr
                        key={f.id}
                        onClick={() => setSelectedFeedback(f)}
                        className={`cursor-pointer transition-colors ${
                          isSelected
                            ? isLoFi
                              ? 'bg-slate-200 font-medium'
                              : 'bg-red-50/80 border-l-4 border-l-red-600 font-medium'
                            : 'hover:bg-slate-50'
                        }`}
                      >
                        <td className="py-3 px-3 font-mono font-bold text-slate-800">
                          {f.trackingCode}
                        </td>
                        <td className="py-3 px-3">
                          <div className="font-semibold text-slate-900 line-clamp-1">
                            {f.title}
                          </div>
                          <div className="text-[11px] text-slate-500 mt-0.5 truncate">
                            {f.content}
                          </div>
                        </td>
                        <td className="py-3 px-3 whitespace-nowrap text-slate-600">
                          TDP {f.tdpId}
                        </td>
                        <td className="py-3 px-3 whitespace-nowrap">
                          {isOverdue ? (
                            <span className="text-red-600 font-bold bg-red-50 px-1.5 py-0.5 rounded border border-red-200">
                              Quá hạn
                            </span>
                          ) : f.status === 'ANSWERED' ? (
                            <span className="text-slate-400 font-mono">Đã xong</span>
                          ) : (
                            <span className="text-amber-700 font-mono font-medium">
                              Còn {f.slaDaysLeft} ngày
                            </span>
                          )}
                        </td>
                        <td className="py-3 px-3 text-right whitespace-nowrap">
                          {getStatusBadge(f.status)}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Selected Feedback Detail & Official Reply Drawer (5 Cols) */}
        <div className="lg:col-span-5">
          {selectedFeedback ? (
            <div className={`p-4 rounded-xl border shadow-sm space-y-4 ${
              isLoFi ? 'bg-white border-slate-300' : 'bg-white border-slate-200'
            }`}>
              {/* Header */}
              <div className="border-b pb-3">
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <span className="font-mono text-xs font-bold px-2 py-0.5 bg-slate-100 rounded border text-slate-800">
                    {selectedFeedback.trackingCode}
                  </span>
                  {getStatusBadge(selectedFeedback.status)}
                </div>

                <h3 className="font-bold text-sm text-slate-900 leading-snug">
                  {selectedFeedback.title}
                </h3>
                <span className="text-xs text-slate-500 block mt-1">
                  Tiếp nhận lúc: {selectedFeedback.submissionDate} · Tổ dân phố số {selectedFeedback.tdpId}
                </span>
              </div>

              {/* Citizen Identity & Privacy Box (Luật 91/2025/QH15) */}
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 text-xs space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-slate-700 flex items-center gap-1.5">
                    <Shield className="w-3.5 h-3.5 text-blue-600" />
                    <span>Dữ liệu người gửi (Luật 91/2025/QH15):</span>
                  </span>
                  <button
                    onClick={() => setUnmaskPrivacy(!unmaskPrivacy)}
                    className="text-[11px] text-blue-600 hover:underline flex items-center gap-1"
                  >
                    {unmaskPrivacy ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                    <span>{unmaskPrivacy ? 'Ẩn thông tin' : 'Xem danh tính'}</span>
                  </button>
                </div>

                {selectedFeedback.isAnonymous ? (
                  <p className="text-slate-500 italic">Công dân lựa chọn gửi ẩn danh.</p>
                ) : (
                  <div className="grid grid-cols-2 gap-2 text-[11px]">
                    <div>
                      <span className="text-slate-400 block">Họ và tên:</span>
                      <strong className="text-slate-800">
                        {unmaskPrivacy ? selectedFeedback.citizenName : 'Nguyễn V***'}
                      </strong>
                    </div>
                    <div>
                      <span className="text-slate-400 block">Số điện thoại:</span>
                      <strong className="text-slate-800 font-mono">
                        {unmaskPrivacy ? selectedFeedback.citizenPhone : '0912.***.***'}
                      </strong>
                    </div>
                  </div>
                )}
              </div>

              {/* Citizen message content */}
              <div className="space-y-1 text-xs">
                <span className="font-semibold text-slate-700 block">Nội dung phản ánh:</span>
                <p className="p-3 bg-slate-50 rounded-lg border border-slate-200 text-slate-800 leading-relaxed font-normal">
                  {selectedFeedback.content}
                </p>
              </div>

              {/* Officer Reply Section */}
              <div className="pt-2 border-t space-y-3 text-xs">
                {selectedFeedback.officialReply ? (
                  <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-200 space-y-1.5">
                    <div className="flex items-center justify-between text-emerald-900 font-semibold text-[11px]">
                      <span>Đã phản hồi chính thức ({selectedFeedback.replyDate})</span>
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                    </div>
                    <p className="text-slate-800 text-xs leading-relaxed bg-white p-2.5 rounded border border-emerald-100">
                      {selectedFeedback.officialReply}
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSendReply} className="space-y-2">
                    <label className="font-semibold text-slate-700 block">
                      Soạn thảo văn bản phản hồi công dân:
                    </label>
                    <textarea
                      rows={3}
                      required
                      placeholder="Nhập nội dung kết luận xác minh và biện pháp xử lý của UB MTTQ phường..."
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                      className="w-full p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:border-red-500 text-xs"
                    />

                    <div className="flex items-center justify-between gap-2">
                      <button
                        type="button"
                        onClick={() => alert(`Đã chuyển văn bản kiến nghị mã ${selectedFeedback.trackingCode} sang UBND phường để chỉ đạo xử lý theo thẩm quyền.`)}
                        className="px-3 py-1.5 border border-slate-300 rounded text-slate-700 hover:bg-slate-100 text-xs"
                      >
                        Chuyển UBND phường
                      </button>

                      <button
                        type="submit"
                        disabled={isReplying}
                        className="px-4 py-1.5 bg-red-600 hover:bg-red-700 text-white rounded font-semibold text-xs flex items-center gap-1.5"
                      >
                        <Send className="w-3.5 h-3.5" />
                        <span>Ban hành phản hồi</span>
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          ) : (
            <div className="p-6 text-center border rounded-lg text-slate-400">
              Chọn một ý kiến từ danh sách để xem chi tiết
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
