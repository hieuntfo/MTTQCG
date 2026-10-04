import React, { useState } from 'react';
import {
  DesignMode,
  FeedbackDomain,
  CitizenFeedback,
  UiState
} from '../../types';
import { RESIDENTIAL_GROUPS_27, CITIZEN_FEEDBACK_LIST } from '../../data/mockData';
import { UxAnnotationBox } from '../common/UxAnnotationBox';
import {
  Send,
  Search,
  CheckCircle,
  Copy,
  Clock,
  ShieldCheck,
  FileText,
  AlertCircle,
  Upload,
  User,
  Phone,
  HelpCircle,
  ArrowRight,
  ChevronLeft
} from 'lucide-react';

interface PublicFeedbackViewProps {
  initialTdpId?: number;
  designMode: DesignMode;
  uiState: UiState;
  showAnnotations: boolean;
  onBackToHome?: () => void;
  onGoToTdp?: (tdpId: number) => void;
}

export const PublicFeedbackView: React.FC<PublicFeedbackViewProps> = ({
  initialTdpId = 8,
  designMode,
  uiState,
  showAnnotations,
  onBackToHome,
  onGoToTdp
}) => {
  const isLoFi = designMode === 'LO_FI_WIREFRAME';

  // Sub-screen mode: 'FORM' | 'CONFIRMATION' | 'LOOKUP'
  const [currentScreen, setCurrentScreen] = useState<'FORM' | 'CONFIRMATION' | 'LOOKUP'>('FORM');

  // Form states
  const [domain, setDomain] = useState<FeedbackDomain>('URBAN_ENVIRONMENT');
  const [tdpId, setTdpId] = useState<number>(initialTdpId);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [citizenName, setCitizenName] = useState('');
  const [citizenPhone, setCitizenPhone] = useState('');
  const [agreedPrivacy, setAgreedPrivacy] = useState(false);
  const [attachments, setAttachments] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState('');

  // Generated code after submission
  const [generatedCode, setGeneratedCode] = useState('');
  const [copiedCode, setCopiedCode] = useState(false);

  // Lookup state
  const [lookupCode, setLookupCode] = useState('CG-2026-0881');
  const [foundFeedback, setFoundFeedback] = useState<CitizenFeedback | null>(CITIZEN_FEEDBACK_LIST[0]);
  const [lookupError, setLookupError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    if (!content.trim()) {
      setFormError('Vui lòng nhập nội dung ý kiến phản ánh.');
      return;
    }
    if (!agreedPrivacy) {
      setFormError('Vui lòng đồng ý với Chính sách bảo vệ dữ liệu cá nhân theo Luật 91/2025/QH15.');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      const code = `CG-2026-${Math.floor(1000 + Math.random() * 9000)}`;
      setGeneratedCode(code);
      setCurrentScreen('CONFIRMATION');
    }, 600);
  };

  const handleLookup = (e: React.FormEvent) => {
    e.preventDefault();
    setLookupError('');
    const cleanCode = lookupCode.trim().toUpperCase();
    const result = CITIZEN_FEEDBACK_LIST.find((f) => f.trackingCode.toUpperCase() === cleanCode);
    if (result) {
      setFoundFeedback(result);
    } else {
      setFoundFeedback(null);
      setLookupError(`Không tìm thấy ý kiến nào với mã tra cứu "${cleanCode}". Vui lòng kiểm tra lại.`);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard?.writeText(generatedCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* PRD Annotation Box when toggled on */}
      {showAnnotations && (
        <UxAnnotationBox
          layerCode="W14"
          layerName="Hòm thư số 'Lắng nghe Nhân dân nói': Form, Xác nhận & Tra cứu"
          targetUser="Người dân trong phường Cầu Giấy gửi ý kiến, giám sát và theo dõi kết quả"
          keyGoal="Kênh hai chiều trực tiếp phục vụ chức năng giám sát xã hội của MTTQ; cam kết thời hạn giải quyết trong 7 ngày làm việc"
          pokaYokeRules={[
            'Tránh gửi 2 lần (Slips): Nút gửi tự động khóa và hiện biểu tượng đang gửi khi bấm',
            'Tránh quên mã (Lapses): Hiện mã tra cứu cỡ lớn, nút sao chép 1 chạm và ghi rõ thời hạn phản hồi',
            'Tuân thủ Luật Bảo vệ dữ liệu cá nhân 91/2025/QH15: Có tùy chọn ẩn danh và checkbox bắt buộc đồng ý xử lý thông tin',
            'Tự động điền trước Tổ dân phố nếu người dân chuyển sang từ trang TDP (≤ 2 chạm từ QR)'
          ]}
          apiSource="POST /api/v1/mttq/feedback & GET /api/v1/mttq/feedback/{trackingCode}"
          slaRule="Cam kết phản hồi trong 7 ngày làm việc (SLA PRD)"
        />
      )}

      {/* Screen Tabs: Form vs Lookup */}
      <div className="flex items-center justify-between border-b pb-4">
        <div>
          <span className="text-xs font-mono font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded border border-red-200">
            KÊNH TIẾP NHẬN Ý KIẾN HAI CHIỀU
          </span>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 mt-1">
            Hòm thư số “Lắng nghe Nhân dân nói”
          </h1>
          <p className="text-xs text-slate-600 mt-0.5">
            Ủy ban MTTQ Việt Nam phường Cầu Giấy cam kết tiếp nhận và phản hồi mọi ý kiến trong <strong>7 ngày làm việc</strong>.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs bg-slate-100 p-1 rounded-lg border border-slate-200">
          <button
            onClick={() => setCurrentScreen('FORM')}
            className={`px-3 py-1.5 rounded-md font-medium transition-colors ${
              currentScreen === 'FORM' || currentScreen === 'CONFIRMATION'
                ? 'bg-white text-slate-900 shadow-xs font-bold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Gửi ý kiến mới
          </button>
          <button
            onClick={() => setCurrentScreen('LOOKUP')}
            className={`px-3 py-1.5 rounded-md font-medium transition-colors ${
              currentScreen === 'LOOKUP'
                ? 'bg-white text-slate-900 shadow-xs font-bold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Tra cứu tiến độ
          </button>
        </div>
      </div>

      {/* 3-Step Process Explanation Bar */}
      <div className={`p-4 rounded-xl border grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs ${
        isLoFi ? 'bg-slate-50 border-slate-300' : 'bg-red-50/50 border-red-200'
      }`}>
        <div className="flex items-start gap-2.5">
          <div className="w-6 h-6 rounded-full bg-red-600 text-white font-bold flex items-center justify-center text-xs shrink-0 mt-0.5">
            1
          </div>
          <div>
            <strong className="text-slate-900 block">Gửi ý kiến</strong>
            <span className="text-slate-500 text-[11px]">Điền thông tin và đính kèm hình ảnh hiện trường nếu có</span>
          </div>
        </div>

        <div className="flex items-start gap-2.5">
          <div className="w-6 h-6 rounded-full bg-red-600 text-white font-bold flex items-center justify-center text-xs shrink-0 mt-0.5">
            2
          </div>
          <div>
            <strong className="text-slate-900 block">Tiếp nhận & Xác minh</strong>
            <span className="text-slate-500 text-[11px]">Mặt trận phường phối hợp Ban CTMT kiểm tra thực địa</span>
          </div>
        </div>

        <div className="flex items-start gap-2.5">
          <div className="w-6 h-6 rounded-full bg-red-600 text-white font-bold flex items-center justify-center text-xs shrink-0 mt-0.5">
            3
          </div>
          <div>
            <strong className="text-slate-900 block">Phản hồi kết quả</strong>
            <span className="text-slate-500 text-[11px]">Nhận thông báo bằng Mã tra cứu trong vòng 7 ngày làm việc</span>
          </div>
        </div>
      </div>

      {/* SCREEN 1: FORM */}
      {currentScreen === 'FORM' && (
        <form
          onSubmit={handleSubmit}
          className={`p-6 rounded-xl border shadow-xs space-y-5 text-xs ${
            isLoFi ? 'bg-white border-slate-300' : 'bg-white border-slate-200'
          }`}
        >
          {formError && (
            <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{formError}</span>
            </div>
          )}

          {/* Lĩnh vực & Tổ dân phố */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="font-semibold text-slate-700 block mb-1">
                Lĩnh vực phản ánh <span className="text-red-500">*</span>
              </label>
              <select
                value={domain}
                onChange={(e) => setDomain(e.target.value as FeedbackDomain)}
                className="w-full p-2.5 bg-slate-50 rounded-lg border border-slate-300 focus:outline-none focus:border-red-500 font-medium"
              >
                <option value="URBAN_ENVIRONMENT">Môi trường & Trật tự đô thị</option>
                <option value="CONSTRUCTION_PERMIT">Trật tự xây dựng & Giám sát công trình</option>
                <option value="SOCIAL_SECURITY">Chế độ chính sách & An sinh xã hội</option>
                <option value="COMMUNITY_RELATIONS">Hòa giải mâu thuẫn ngõ xóm</option>
                <option value="CIVIC_SERVICES">Góp ý cán bộ, công chức phường</option>
              </select>
            </div>

            <div>
              <label className="font-semibold text-slate-700 block mb-1">
                Địa bàn Tổ dân phố liên quan <span className="text-red-500">*</span>
              </label>
              <select
                value={tdpId}
                onChange={(e) => setTdpId(Number(e.target.value))}
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

          {/* Tiêu đề & Nội dung */}
          <div className="space-y-3">
            <div>
              <label className="font-semibold text-slate-700 block mb-1">
                Tiêu đề tóm tắt ý kiến <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="Ví dụ: Đề nghị nạo vét hố ga thoát nước ngõ 165 Cầu Giấy..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full p-2.5 bg-white rounded-lg border border-slate-300 focus:outline-none focus:border-red-500"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="font-semibold text-slate-700">
                  Nội dung chi tiết <span className="text-red-500">*</span>
                </label>
                <span className="text-slate-400 text-[11px] font-mono-tabular">
                  {content.length} ký tự
                </span>
              </div>
              <textarea
                rows={4}
                required
                placeholder="Mô tả cụ thể thời gian, địa điểm, sự việc để UB MTTQ và Ban CTMT dễ dàng xác minh..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full p-2.5 bg-white rounded-lg border border-slate-300 focus:outline-none focus:border-red-500 leading-relaxed"
              />
            </div>
          </div>

          {/* Đính kèm ảnh hiện trường (tối đa 3 ảnh theo W14 PRD) */}
          <div>
            <label className="font-semibold text-slate-700 block mb-1">
              Hình ảnh đính kèm (tối đa 3 ảnh minh chứng)
            </label>
            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => {
                  if (attachments.length < 3) {
                    setAttachments([...attachments, `Hinh_anh_hien_truong_${attachments.length + 1}.jpg`]);
                  } else {
                    alert('Chỉ được đính kèm tối đa 3 ảnh.');
                  }
                }}
                className="px-3 py-2 border border-dashed border-slate-400 rounded-lg hover:bg-slate-50 text-slate-600 flex items-center gap-2"
              >
                <Upload className="w-4 h-4 text-slate-400" />
                <span>Thêm ảnh minh chứng</span>
              </button>

              {attachments.map((file, idx) => (
                <div key={idx} className="flex items-center gap-1.5 px-2.5 py-1.5 bg-slate-100 rounded border border-slate-200 text-[11px]">
                  <span>{file}</span>
                  <button
                    type="button"
                    onClick={() => setAttachments(attachments.filter((_, i) => i !== idx))}
                    className="text-slate-400 hover:text-red-600 ml-1"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Ẩn danh & Thông tin cá nhân (Luật 91/2025/QH15) */}
          <div className="p-4 rounded-lg bg-slate-50 border border-slate-200 space-y-3">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="isAnon"
                checked={isAnonymous}
                onChange={(e) => setIsAnonymous(e.target.checked)}
                className="w-4 h-4 text-red-600 rounded focus:ring-0 cursor-pointer"
              />
              <label htmlFor="isAnon" className="font-semibold text-slate-800 cursor-pointer">
                Gửi dưới dạng ẩn danh (Không cung cấp họ tên, SĐT)
              </label>
            </div>

            {!isAnonymous && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <div>
                  <label className="text-slate-600 block mb-1">Họ và tên người phản ánh</label>
                  <input
                    type="text"
                    placeholder="Nguyễn Văn A"
                    value={citizenName}
                    onChange={(e) => setCitizenName(e.target.value)}
                    className="w-full p-2 bg-white rounded border border-slate-300 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-slate-600 block mb-1">Số điện thoại nhận tin (Tùy chọn)</label>
                  <input
                    type="tel"
                    placeholder="09xx.xxx.xxx"
                    value={citizenPhone}
                    onChange={(e) => setCitizenPhone(e.target.value)}
                    className="w-full p-2 bg-white rounded border border-slate-300 focus:outline-none"
                  />
                </div>
              </div>
            )}

            <div className="flex items-start gap-2 pt-2 border-t border-slate-200 text-[11px]">
              <input
                type="checkbox"
                id="agreedLegal"
                checked={agreedPrivacy}
                onChange={(e) => setAgreedPrivacy(e.target.checked)}
                className="w-4 h-4 text-red-600 rounded shrink-0 mt-0.5 cursor-pointer"
              />
              <label htmlFor="agreedLegal" className="text-slate-600 cursor-pointer">
                Tôi đồng ý để UB MTTQ Việt Nam phường Cầu Giấy xử lý dữ liệu phục vụ xác minh, giải quyết ý kiến theo đúng quy định của <strong className="text-slate-800">Luật Bảo vệ dữ liệu cá nhân số 91/2025/QH15</strong>.
              </label>
            </div>
          </div>

          {/* Action button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-3 rounded-lg font-bold text-sm text-white flex items-center justify-center gap-2 transition-all shadow-sm ${
              isSubmitting
                ? 'bg-slate-400 cursor-wait'
                : isLoFi
                ? 'bg-slate-900 hover:bg-slate-800'
                : 'bg-red-600 hover:bg-red-700 active:scale-98'
            }`}
          >
            {isSubmitting ? (
              <>
                <Clock className="w-4 h-4 animate-spin" />
                <span>Đang gửi ý kiến tới Mặt trận...</span>
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                <span>Gửi ý kiến tới Ủy ban MTTQ phường</span>
              </>
            )}
          </button>
        </form>
      )}

      {/* SCREEN 2: CONFIRMATION (Xác nhận sau khi gửi) */}
      {currentScreen === 'CONFIRMATION' && (
        <div className={`p-8 rounded-xl border text-center space-y-5 ${
          isLoFi ? 'bg-white border-slate-300' : 'bg-white border-slate-200 shadow-sm'
        }`}>
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
            <CheckCircle className="w-10 h-10" />
          </div>

          <div className="space-y-1">
            <h2 className="text-xl font-bold text-slate-900">
              Gửi ý kiến thành công!
            </h2>
            <p className="text-xs text-slate-600 max-w-md mx-auto">
              Ý kiến của bạn đã được chuyển tới Ban Thường trực UB MTTQ phường Cầu Giấy và Ban Công tác Mặt trận Tổ dân phố số {tdpId}.
            </p>
          </div>

          {/* Large Tracking Code Card */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 max-w-md mx-auto space-y-2">
            <span className="text-xs text-slate-500 font-medium">MÃ TRA CỨU TIẾN ĐỘ CỦA BẠN:</span>
            <div className="flex items-center justify-center gap-3">
              <span className="font-mono text-2xl font-bold tracking-wider text-red-700">
                {generatedCode}
              </span>
              <button
                onClick={copyToClipboard}
                className="p-2 rounded-md hover:bg-slate-200 text-slate-600 transition-colors"
                title="Sao chép mã tra cứu"
              >
                <Copy className="w-4 h-4" />
              </button>
            </div>
            {copiedCode && (
              <span className="text-xs text-emerald-600 font-semibold block">Đã sao chép mã vào bộ nhớ đệm!</span>
            )}
            <p className="text-[11px] text-slate-500">
              Hãy lưu lại mã này để tra cứu câu trả lời hoặc tiến độ giải quyết của cơ quan chức năng.
            </p>
          </div>

          <div className="p-3 bg-amber-50 rounded-lg border border-amber-200 text-amber-900 text-xs max-w-md mx-auto flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-amber-600 shrink-0" />
              <span>Thời hạn phản hồi dự kiến: <strong>11/10/2026</strong> (7 ngày làm việc)</span>
            </div>
          </div>

          <div className="pt-3 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => {
                setLookupCode(generatedCode);
                setCurrentScreen('LOOKUP');
              }}
              className="px-4 py-2 bg-slate-900 text-white rounded-lg text-xs font-semibold hover:bg-slate-800"
            >
              Xem ngay trang tra cứu
            </button>
            {onGoToTdp && (
              <button
                onClick={() => onGoToTdp(tdpId)}
                className="px-4 py-2 border border-slate-300 text-slate-700 rounded-lg text-xs font-semibold hover:bg-slate-50"
              >
                Về trang Tổ dân phố số {tdpId}
              </button>
            )}
          </div>
        </div>
      )}

      {/* SCREEN 3: LOOKUP (Tra cứu tiến độ giải quyết) */}
      {currentScreen === 'LOOKUP' && (
        <div className="space-y-5">
          {/* Lookup Input Form */}
          <div className={`p-5 rounded-xl border ${
            isLoFi ? 'bg-white border-slate-300' : 'bg-white border-slate-200 shadow-xs'
          }`}>
            <form onSubmit={handleLookup} className="flex flex-col sm:flex-row items-center gap-3">
              <div className="relative flex-1 w-full">
                <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                <input
                  type="text"
                  placeholder="Nhập mã tra cứu (Ví dụ: CG-2026-0881)..."
                  value={lookupCode}
                  onChange={(e) => setLookupCode(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-xs md:text-sm bg-slate-50 rounded-lg border border-slate-300 focus:outline-none focus:border-red-500 font-mono uppercase"
                />
              </div>

              <button
                type="submit"
                className="w-full sm:w-auto px-5 py-2 bg-red-600 hover:bg-red-700 text-white font-semibold text-xs rounded-lg transition-colors shadow-2xs"
              >
                Tra cứu tiến độ
              </button>
            </form>

            {lookupError && (
              <div className="mt-3 p-3 rounded bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{lookupError}</span>
              </div>
            )}
          </div>

          {/* Lookup Result Detail */}
          {foundFeedback && (
            <div className={`p-6 rounded-xl border space-y-5 ${
              isLoFi ? 'bg-white border-slate-300' : 'bg-white border-slate-200 shadow-sm'
            }`}>
              {/* Result Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b pb-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-mono font-bold text-sm bg-slate-100 px-2 py-0.5 rounded text-slate-800 border">
                      {foundFeedback.trackingCode}
                    </span>
                    <span className="text-xs text-slate-500">Tổ dân phố số {foundFeedback.tdpId}</span>
                  </div>
                  <h3 className="text-base font-bold text-slate-900">{foundFeedback.title}</h3>
                </div>

                <div className="text-right">
                  <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                    foundFeedback.status === 'ANSWERED'
                      ? 'bg-emerald-100 text-emerald-800'
                      : foundFeedback.status === 'FORWARDED'
                      ? 'bg-purple-100 text-purple-800'
                      : 'bg-amber-100 text-amber-800'
                  }`}>
                    {foundFeedback.status === 'ANSWERED'
                      ? 'Đã phản hồi chính thức'
                      : foundFeedback.status === 'FORWARDED'
                      ? 'Đã chuyển UBND xử lý'
                      : 'Đang xác minh thực địa'}
                  </span>
                </div>
              </div>

              {/* 3-Step Progress Indicator */}
              <div className="py-2">
                <span className="text-xs font-semibold text-slate-700 block mb-3">Tiến trình xử lý của MTTQ:</span>
                <div className="grid grid-cols-3 gap-2 text-center text-xs">
                  <div className="p-2.5 rounded bg-emerald-50 border border-emerald-200 text-emerald-900">
                    <span className="font-bold block">1. Tiếp nhận</span>
                    <span className="text-[10px] text-slate-500">{foundFeedback.submissionDate}</span>
                  </div>
                  <div className="p-2.5 rounded bg-emerald-50 border border-emerald-200 text-emerald-900">
                    <span className="font-bold block">2. Kiểm tra thực địa</span>
                    <span className="text-[10px] text-slate-500">Cán bộ: {foundFeedback.assignedOfficer}</span>
                  </div>
                  <div className={`p-2.5 rounded border ${
                    foundFeedback.officialReply
                      ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                      : 'bg-slate-50 border-slate-200 text-slate-400'
                  }`}>
                    <span className="font-bold block">3. Phản hồi</span>
                    <span className="text-[10px] text-slate-500">{foundFeedback.replyDate || 'Đang cập nhật'}</span>
                  </div>
                </div>
              </div>

              {/* Citizen original message */}
              <div className="space-y-1.5 text-xs">
                <span className="font-semibold text-slate-600 block">Nội dung ý kiến bạn đã gửi:</span>
                <p className="p-3 bg-slate-50 rounded-lg border border-slate-200 text-slate-700 leading-relaxed">
                  {foundFeedback.content}
                </p>
              </div>

              {/* Official Answer from MTTQ */}
              {foundFeedback.officialReply ? (
                <div className="p-4 rounded-xl bg-red-50/60 border border-red-200 space-y-2 text-xs">
                  <div className="flex items-center justify-between text-red-900">
                    <span className="font-bold uppercase tracking-wider flex items-center gap-1.5">
                      <ShieldCheck className="w-4 h-4 text-red-600" />
                      <span>Văn bản trả lời chính thức của UB MTTQ Việt Nam phường Cầu Giấy</span>
                    </span>
                    <span className="text-[11px] font-mono">{foundFeedback.replyDate}</span>
                  </div>
                  <p className="text-slate-800 leading-relaxed font-normal bg-white p-3 rounded-lg border border-red-100">
                    {foundFeedback.officialReply}
                  </p>
                </div>
              ) : (
                <div className="p-3 bg-amber-50 rounded-lg border border-amber-200 text-amber-900 text-xs">
                  Ý kiến đang được cán bộ chuyên trách xác minh. Câu trả lời chính thức sẽ được cập nhật tại đây trước hạn <strong>{foundFeedback.dueDate}</strong>.
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
