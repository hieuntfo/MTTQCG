import React from 'react';
import { DesignMode } from '../../types';
import { MttqEmblem } from './Emblem';
import { Phone, MapPin, Mail, Shield, ExternalLink, Globe } from 'lucide-react';

interface FooterProps {
  designMode: DesignMode;
}

export const Footer: React.FC<FooterProps> = ({ designMode }) => {
  const isLoFi = designMode === 'LO_FI_WIREFRAME';

  return (
    <footer className={`w-full border-t text-xs select-none transition-colors ${
      isLoFi 
        ? 'bg-slate-100 border-slate-300 text-slate-700' 
        : 'bg-slate-900 border-slate-800 text-slate-400'
    }`}>
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Col 1: Identity & Agency Info */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-3">
              {isLoFi ? (
                <div className="w-10 h-10 border border-slate-500 rounded-full flex items-center justify-center font-bold text-[10px]">
                  MTTQ
                </div>
              ) : (
                <MttqEmblem size={40} />
              )}
              <div>
                <h3 className={`font-bold text-sm uppercase ${isLoFi ? 'text-slate-900' : 'text-white'}`}>
                  ỦY BAN MẶT TRẬN TỔ QUỐC VIỆT NAM PHƯỜNG CẦU GIẤY
                </h3>
                <p className="text-[11px] text-slate-500">
                  Cơ quan Thường trực: Khối Dân vận - Đảng ủy - HĐND - UBND phường Cầu Giấy
                </p>
              </div>
            </div>

            <p className="text-xs leading-relaxed max-w-lg">
              Hệ thống Bản sao số Cầu Giấy — Nền tảng công khai thông tin đại diện, tiếp nhận ý kiến Nhân dân và báo cáo giám sát cộng đồng tại 27 tổ dân phố trên địa bàn phường.
            </p>

            <div className="space-y-1.5 pt-2 text-[11px]">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-red-500 shrink-0" />
                <span>Trụ sở: Số 1 đường Cầu Giấy, phường Cầu Giấy, TP Hà Nội</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-red-500 shrink-0" />
                <span>Hotline tiếp nhận ý kiến: <strong className={isLoFi ? 'text-slate-900' : 'text-slate-200'}>024.3768.1201</strong> (Bấm để gọi 24/7)</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-red-500 shrink-0" />
                <span>Hòm thư điện tử: ub.mttq@caugiay.hanoi.gov.vn</span>
              </div>
            </div>
          </div>

          {/* Col 2: Liên kết cấp trên */}
          <div className="space-y-3">
            <h4 className={`font-semibold text-xs uppercase tracking-wider ${isLoFi ? 'text-slate-900' : 'text-slate-200'}`}>
              Liên kết chính thống
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a
                  href="http://mattran.org.vn"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:underline flex items-center gap-1.5"
                >
                  <Globe className="w-3 h-3 text-slate-500" />
                  <span>Ủy ban TW MTTQ Việt Nam</span>
                  <ExternalLink className="w-2.5 h-2.5 opacity-60" />
                </a>
              </li>
              <li>
                <a
                  href="https://mttqhanoi.vn"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:underline flex items-center gap-1.5"
                >
                  <Globe className="w-3 h-3 text-slate-500" />
                  <span>Ủy ban MTTQ TP Hà Nội</span>
                  <ExternalLink className="w-2.5 h-2.5 opacity-60" />
                </a>
              </li>
              <li>
                <a
                  href="https://caugiay.hanoi.gov.vn"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:underline flex items-center gap-1.5"
                >
                  <Globe className="w-3 h-3 text-slate-500" />
                  <span>Cổng thông tin phường Cầu Giấy</span>
                  <ExternalLink className="w-2.5 h-2.5 opacity-60" />
                </a>
              </li>
              <li>
                <span className="text-[11px] text-slate-500 block pt-1">
                  Đảng ủy · HĐND · UBND phường Cầu Giấy
                </span>
              </li>
            </ul>
          </div>

          {/* Col 3: Cam kết & Pháp lý */}
          <div className="space-y-3">
            <h4 className={`font-semibold text-xs uppercase tracking-wider ${isLoFi ? 'text-slate-900' : 'text-slate-200'}`}>
              Cam kết dịch vụ & Bảo mật
            </h4>
            <div className="p-2.5 rounded border border-dashed border-slate-700 space-y-2 text-[11px]">
              <div className="flex items-start gap-1.5">
                <Shield className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                <span>
                  <strong>Cam kết SLA 7 ngày làm việc:</strong> Mọi phản ánh của công dân qua Hòm thư số được tiếp nhận và xử lý minh bạch.
                </span>
              </div>
              <p className="text-slate-500 text-[10px]">
                Tuân thủ Nghị định 13/2023/NĐ-CP và Luật Bảo vệ dữ liệu cá nhân số 91/2025/QH15.
              </p>
            </div>
            <a
              href="#privacy"
              onClick={(e) => { e.preventDefault(); alert('Chính sách bảo vệ dữ liệu cá nhân theo Luật 91/2025/QH15: Dữ liệu công dân được mã hóa, chỉ cán bộ phụ trách thụ lý được tiếp cận.'); }}
              className="text-xs text-red-500 hover:underline block"
            >
              Chính sách bảo vệ dữ liệu cá nhân →
            </a>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className={`pt-4 border-t flex flex-col sm:flex-row items-center justify-between text-[11px] gap-2 ${
          isLoFi ? 'border-slate-300 text-slate-500' : 'border-slate-800 text-slate-500'
        }`}>
          <div>
            © 2026 Bản quyền thuộc về <strong>Ủy ban Mặt trận Tổ quốc Việt Nam phường Cầu Giấy, TP Hà Nội</strong>
          </div>
          <div className="flex items-center gap-4">
            <span>Tiêu chuẩn WCAG 2.1 AA</span>
            <span>·</span>
            <span>Hệ thống Bản sao số v0.2</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
