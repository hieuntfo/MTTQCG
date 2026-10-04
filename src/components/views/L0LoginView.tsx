import React, { useState } from 'react';
import { DesignMode, UiState } from '../../types';
import { MttqEmblem } from '../common/Emblem';
import { UxAnnotationBox } from '../common/UxAnnotationBox';
import {
  Lock,
  User,
  Eye,
  EyeOff,
  ArrowRight,
  Shield,
  Phone,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

interface L0LoginViewProps {
  designMode: DesignMode;
  uiState: UiState;
  showAnnotations: boolean;
  onLoginSuccess: () => void;
  onGoToPublic: () => void;
}

export const L0LoginView: React.FC<L0LoginViewProps> = ({
  designMode,
  uiState,
  showAnnotations,
  onLoginSuccess,
  onGoToPublic
}) => {
  const isLoFi = designMode === 'LO_FI_WIREFRAME';

  const [step, setStep] = useState<'CREDENTIALS' | 'OTP'>('CREDENTIALS');
  const [username, setUsername] = useState('canbo.mttq@caugiay.gov.vn');
  const [password, setPassword] = useState('••••••••••••');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [otpCode, setOtpCode] = useState(['5', '2', '8', '9', '1', '4']);
  const [countdown, setCountdown] = useState(58);
  const [errorMessage, setErrorMessage] = useState('');

  const handleCredentialsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password) {
      setErrorMessage('Tên đăng nhập hoặc mật khẩu chưa đúng.');
      return;
    }
    setStep('OTP');
  };

  const handleOtpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLoginSuccess();
  };

  return (
    <div className="space-y-6">
      {showAnnotations && (
        <UxAnnotationBox
          layerCode="L0"
          layerName="Màn Đăng nhập Hệ thống điều hành Phường Cầu Giấy (Cán bộ 4 trụ cột)"
          targetUser="Cán bộ, chuyên viên, trưởng ban đơn vị 4 trụ cột (Đảng ủy, HĐND, UBND, UB MTTQ)"
          keyGoal="Bảo đảm an toàn thông tin theo Luật 91/2025/QH15; xác thực 2 lớp OTP; có lối sang Cổng công khai cho người dân vào nhầm"
          pokaYokeRules={[
            'Không dùng ảnh stock nhà kính cao tầng chung chung (Lỗi hiện trạng) -> Thay bằng ảnh thật địa danh Cầu Giấy',
            'Báo lỗi chung "Tên đăng nhập hoặc mật khẩu chưa đúng" để chống quét tài khoản brute-force',
            'Khóa tài khoản tự động sau 5 lần nhập sai, kèm số hotline kỹ thuật',
            'Lối dẫn rõ ràng cho người dân: "Người dân? Vào Cổng thông tin công khai →"'
          ]}
          apiSource="POST /api/v1/auth/login & POST /api/v1/auth/verify-otp"
          slaRule="Thời hạn phiên đăng nhập 60 phút, cảnh báo trước 2 phút"
        />
      )}

      <div className={`rounded-2xl border overflow-hidden shadow-md ${
        isLoFi ? 'bg-white border-slate-300' : 'bg-white border-slate-200'
      }`}>
        <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[560px]">
          {/* Left Form: 5 Cols */}
          <div className="lg:col-span-5 p-8 flex flex-col justify-between">
            <div>
              {/* Header */}
              <div className="flex items-center gap-3 mb-6">
                {isLoFi ? (
                  <div className="w-12 h-12 border-2 border-dashed border-slate-500 rounded-full flex items-center justify-center font-bold text-xs bg-slate-100">
                    LOGO
                  </div>
                ) : (
                  <MttqEmblem size={44} />
                )}
                <div>
                  <h2 className="text-base font-bold text-slate-900 leading-tight">
                    Hệ thống điều hành Phường Cầu Giấy
                  </h2>
                  <p className="text-xs text-red-700 font-semibold mt-0.5">
                    Dành cho cán bộ, công chức & ban công tác 27 TDP
                  </p>
                </div>
              </div>

              {errorMessage && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-lg flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* Step 1: Username & Password */}
              {step === 'CREDENTIALS' && (
                <form onSubmit={handleCredentialsSubmit} className="space-y-4 text-xs">
                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">
                      Tên đăng nhập / Email công vụ
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                      <input
                        type="text"
                        required
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="w-full pl-9 pr-3 py-2.5 bg-slate-50 rounded-lg border border-slate-300 focus:outline-none focus:border-red-500 font-medium"
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="font-semibold text-slate-700">Mật khẩu</label>
                      <a href="#forgot" onClick={(e) => { e.preventDefault(); alert('Liên hệ Ban quản trị CNTT phường Cầu Giấy hotline 024.3768.1201 để cấp lại mật khẩu.'); }} className="text-red-600 hover:underline">
                        Quên mật khẩu?
                      </a>
                    </div>
                    <div className="relative">
                      <Lock className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full pl-9 pr-10 py-2.5 bg-slate-50 rounded-lg border border-slate-300 focus:outline-none focus:border-red-500 font-medium"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-3 text-slate-400 hover:text-slate-600"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between py-1">
                    <label className="flex items-center gap-2 cursor-pointer text-slate-600">
                      <input
                        type="checkbox"
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                        className="w-4 h-4 text-red-600 rounded"
                      />
                      <span>Ghi nhớ đăng nhập trên thiết bị này</span>
                    </label>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-lg font-bold text-xs shadow-xs transition-colors"
                  >
                    Đăng nhập hệ thống điều hành
                  </button>

                  {/* Quick role test switcher */}
                  <div className="pt-2 text-[11px] text-slate-500">
                    <span className="block mb-1 font-semibold text-slate-600">Chọn nhanh tài khoản mẫu:</span>
                    <div className="flex flex-wrap gap-1.5">
                      <button
                        type="button"
                        onClick={() => setUsername('bichhoa.mttq@caugiay.gov.vn')}
                        className="px-2 py-0.5 rounded bg-slate-100 border text-slate-700 hover:bg-slate-200"
                      >
                        Chủ tịch UB MTTQ
                      </button>
                      <button
                        type="button"
                        onClick={() => setUsername('vanmanh.giamsat@caugiay.gov.vn')}
                        className="px-2 py-0.5 rounded bg-slate-100 border text-slate-700 hover:bg-slate-200"
                      >
                        Ban GSĐTCCĐ
                      </button>
                      <button
                        type="button"
                        onClick={() => setUsername('truongban.tdp8@caugiay.gov.vn')}
                        className="px-2 py-0.5 rounded bg-slate-100 border text-slate-700 hover:bg-slate-200"
                      >
                        Trưởng ban CTMT TDP 8
                      </button>
                    </div>
                  </div>
                </form>
              )}

              {/* Step 2: OTP Verification */}
              {step === 'OTP' && (
                <form onSubmit={handleOtpSubmit} className="space-y-4 text-xs animate-in fade-in">
                  <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg text-blue-900 text-[11px]">
                    Mã xác thực OTP gồm 6 số đã được gửi tới số điện thoại cán bộ đã đăng ký (0912.***.201).
                  </div>

                  <div>
                    <label className="font-semibold text-slate-700 block mb-1.5">
                      Nhập mã OTP 6 số:
                    </label>
                    <div className="flex justify-between gap-2">
                      {otpCode.map((digit, index) => (
                        <input
                          key={index}
                          type="text"
                          maxLength={1}
                          value={digit}
                          readOnly
                          className="w-10 h-12 text-center text-lg font-bold font-mono bg-slate-100 border border-slate-300 rounded-lg text-slate-900"
                        />
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-slate-500">
                    <span>Mã có hiệu lực trong: <strong className="font-mono text-red-600">{countdown}s</strong></span>
                    <button type="button" className="text-red-600 hover:underline">Gửi lại mã</button>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-lg font-bold text-xs shadow-xs"
                  >
                    Xác thực & Vào Bảng điều hành L1
                  </button>

                  <button
                    type="button"
                    onClick={() => setStep('CREDENTIALS')}
                    className="w-full py-1 text-slate-500 hover:underline text-[11px]"
                  >
                    Quay lại bước đăng nhập
                  </button>
                </form>
              )}
            </div>

            {/* Bottom link to Public Portal */}
            <div className="pt-6 border-t mt-6 text-xs text-slate-600 flex items-center justify-between">
              <span>Người dân tìm thông tin TDP?</span>
              <button
                onClick={onGoToPublic}
                className="text-red-600 hover:underline font-bold flex items-center gap-1"
              >
                <span>Vào Cổng công khai</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Right Showcase: 7 Cols (PRD S2: Ảnh thật địa danh Cầu Giấy, không dùng ảnh nhà kính cao tầng chung chung) */}
          <div className={`hidden lg:flex lg:col-span-7 flex-col justify-between p-8 text-white relative ${
            isLoFi ? 'bg-slate-700' : 'bg-gradient-to-br from-red-950 via-slate-900 to-slate-950'
          }`}>
            <div className="space-y-2 relative z-10">
              <span className="text-xs uppercase font-bold tracking-wider text-amber-400 bg-amber-950/60 px-2.5 py-1 rounded border border-amber-800/80 inline-block">
                Ảnh thật: Địa danh Phường Cầu Giấy, TP Hà Nội
              </span>
              <h3 className="text-2xl font-bold leading-tight">
                Không gian văn hóa — Tuyến phố đi bộ Thành Thái & Công viên Cầu Giấy
              </h3>
              <p className="text-xs text-slate-300 max-w-lg leading-relaxed">
                Nơi hội tụ khối đại đoàn kết toàn dân tộc; gắn kết cộng đồng dân cư 27 tổ dân phố văn minh, nghĩa tình và hiện đại.
              </p>
            </div>

            {/* Stylized local landscape card */}
            <div className="relative z-10 bg-white/10 backdrop-blur-md p-4 rounded-xl border border-white/20 space-y-2 text-xs">
              <div className="flex items-center justify-between text-amber-300 font-semibold">
                <span>Hệ thống điều hành 4 trụ cột Phường Cầu Giấy:</span>
                <span className="text-[11px] font-mono">Phiên bản v0.2</span>
              </div>
              <p className="text-slate-200 text-[11px] leading-relaxed">
                Tích hợp liên thông: Đảng ủy · Hội đồng nhân dân · Ủy ban nhân dân · Ủy ban MTTQ Việt Nam phường.
              </p>
            </div>

            <div className="relative z-10 text-[11px] text-slate-400 flex items-center justify-between">
              <span>Hỗ trợ kỹ thuật: 024.3768.1201</span>
              <span>An toàn thông tin cấp độ 3</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
