import React, { useState } from 'react';
import {
  DesignMode,
  LeadershipMember,
  CommitteeMember,
  MemberOrganization,
  UiState
} from '../../types';
import {
  BAN_THUONG_TRUC,
  COMMITTEE_MEMBERS_SAMPLE,
  MEMBER_ORGANIZATIONS,
  RESIDENTIAL_GROUPS_27,
  MTTQ_IMAGES
} from '../../data/mockData';
import { UxAnnotationBox } from '../common/UxAnnotationBox';
import { MttqEmblem } from '../common/Emblem';
import {
  Users,
  Search,
  Filter,
  Phone,
  Mail,
  Calendar,
  Building,
  UserCheck,
  ChevronRight,
  Shield,
  Layers,
  Award,
  ExternalLink,
  MapPin,
  Clock,
  LayoutGrid,
  List
} from 'lucide-react';

interface RepresentationViewProps {
  designMode: DesignMode;
  uiState: UiState;
  showAnnotations: boolean;
  onSelectTdp?: (tdpId: number) => void;
  onSelectOrg?: (orgId: string) => void;
}

export const RepresentationView: React.FC<RepresentationViewProps> = ({
  designMode,
  uiState,
  showAnnotations,
  onSelectTdp,
  onSelectOrg
}) => {
  const isLoFi = designMode === 'LO_FI_WIREFRAME';

  // Sub-tab selection: Ban Thường trực / Ủy ban 67 Ủy viên / 12 Tổ chức thành viên
  const [activeSubTab, setActiveSubTab] = useState<'LEADERSHIP' | 'COMMITTEE' | 'ORGANIZATIONS'>('LEADERSHIP');
  const [committeeViewMode, setCommitteeViewMode] = useState<'TABLE' | 'CARDS'>('CARDS');
  
  // Committee filter
  const [committeeSearch, setCommitteeSearch] = useState('');
  const [committeeBlock, setCommitteeBlock] = useState<string>('ALL');

  // Filtered committee list
  const filteredCommittee = COMMITTEE_MEMBERS_SAMPLE.filter((m) => {
    if (committeeBlock !== 'ALL' && m.block !== committeeBlock) return false;
    if (committeeSearch.trim() !== '') {
      const q = committeeSearch.toLowerCase();
      return (
        m.name.toLowerCase().includes(q) ||
        m.workUnit.toLowerCase().includes(q) ||
        m.committeeRole.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="space-y-6">
      {/* PRD Annotation Box when toggled on */}
      {showAnnotations && (
        <UxAnnotationBox
          layerCode="W4 & W5"
          layerName="Phân hệ Thông tin đại diện: Ban Thường trực, 67 Ủy viên & 12 Tổ chức thành viên"
          targetUser="Người dân, cán bộ MTTQ, cơ quan báo chí, người cao tuổi tra cứu người đại diện"
          keyGoal="Công khai minh bạch người phụ trách cơ sở theo Luật Dân chủ ở cơ sở; tìm kiếm và liên hệ trực tiếp trong ≤ 2 chạm"
          pokaYokeRules={[
            'Ban Thường trực: Thẻ Chủ tịch xếp trên cùng nổi bật, có lịch tiếp dân và số điện thoại công vụ',
            'Danh sách Ủy ban MTTQ phường: Tự động chuyển đổi dạng Thẻ trên Mobile (<640px) và Bảng 4 cột trên Desktop',
            'Bộ lọc 5 khối chức danh rõ ràng (Thường trực, Thành viên, 27 TDP, Trí thức, Tôn giáo/Doanh nghiệp)',
            'Mỗi danh sách nhân sự luôn có ngày cập nhật để tránh nhầm lẫn sau các kỳ kiện toàn'
          ]}
          apiSource="GET /api/v1/mttq/representation?block={block}&term=2026-2031"
          slaRule="Cập nhật thông tin nhân sự ≤ 3 ngày sau khi có quyết định chuẩn y"
        />
      )}

      {/* Main Header with Visual Congress Banner */}
      <div className="space-y-4">
        {/* Visual Hero Banner of Cau Giay MTTQ Congress */}
        <div className="relative rounded-2xl overflow-hidden border border-slate-200 shadow-sm bg-slate-900 text-white">
          <img
            src={MTTQ_IMAGES.cauGiayCongress}
            alt="Đại hội Đại biểu MTTQ Việt Nam phường Cầu Giấy"
            className="w-full h-56 md:h-72 object-cover object-top opacity-60 hover:opacity-75 transition-opacity"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-transparent p-6 flex flex-col justify-end">
            <div className="flex items-center gap-2 mb-2">
              <MttqEmblem size={36} />
              <span className="text-xs uppercase font-bold tracking-wider text-amber-400 bg-amber-950/80 px-2.5 py-0.5 rounded border border-amber-800">
                Khóa VI · Nhiệm kỳ 2026 – 2031
              </span>
              <span className="text-xs text-slate-300 hidden sm:inline">
                · Trụ sở: 26 Trần Thái Tông, P. Cầu Giấy
              </span>
            </div>
            <h1 className="text-xl md:text-3xl font-bold text-white leading-tight">
              Đại hội Đại biểu MTTQ Việt Nam phường Cầu Giấy khóa VI
            </h1>
            <p className="text-xs md:text-sm text-slate-200 mt-1 max-w-3xl leading-relaxed">
              Hiệp thương dân chủ bầu ra 67 Ủy viên Ủy ban MTTQ phường và Ban Thường trực gồm 5 đồng chí; phát huy sức mạnh khối đại đoàn kết 27 tổ dân phố.
            </p>
          </div>
        </div>

        {/* 3 Visual News Stories of Representation */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="p-3 rounded-xl border border-slate-200 bg-white hover:border-red-400 transition-all shadow-xs flex items-center gap-3">
            <img
              src={MTTQ_IMAGES.cauGiayCongress}
              alt="Hội nghị hiệp thương"
              className="w-16 h-16 rounded-lg object-cover shrink-0 border border-slate-200"
            />
            <div className="min-w-0">
              <span className="text-[10px] font-bold text-red-600 uppercase">Hiệp thương khóa mới</span>
              <h4 className="text-xs font-bold text-slate-900 truncate">67 Ủy viên đại diện các tầng lớp</h4>
              <p className="text-[11px] text-slate-500 line-clamp-1">Ban Thường trực 5 người, 27 Trưởng ban CTMT</p>
            </div>
          </div>

          <div className="p-3 rounded-xl border border-slate-200 bg-white hover:border-red-400 transition-all shadow-xs flex items-center gap-3">
            <img
              src={MTTQ_IMAGES.culturalFestival}
              alt="Ngày hội Đại đoàn kết"
              className="w-16 h-16 rounded-lg object-cover shrink-0 border border-slate-200"
            />
            <div className="min-w-0">
              <span className="text-[10px] font-bold text-emerald-600 uppercase">Đoàn kết khu dân cư</span>
              <h4 className="text-xs font-bold text-slate-900 truncate">Ngày hội Đại đoàn kết 27 TDP</h4>
              <p className="text-[11px] text-slate-500 line-clamp-1">100% tổ dân phố tổ chức phần Lễ và Hội</p>
            </div>
          </div>

          <div className="p-3 rounded-xl border border-slate-200 bg-white hover:border-red-400 transition-all shadow-xs flex items-center gap-3">
            <img
              src={MTTQ_IMAGES.charityWelfare}
              alt="An sinh xã hội"
              className="w-16 h-16 rounded-lg object-cover shrink-0 border border-slate-200"
            />
            <div className="min-w-0">
              <span className="text-[10px] font-bold text-amber-600 uppercase">Quỹ Vì người nghèo</span>
              <h4 className="text-xs font-bold text-slate-900 truncate">Vận động an sinh xã hội</h4>
              <p className="text-[11px] text-slate-500 line-clamp-1">Trao tặng hỗ trợ 85 hộ gia đình khó khăn</p>
            </div>
          </div>
        </div>

        {/* Sub-tab switcher */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2 border-b pb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className={`px-2 py-0.5 text-xs font-mono font-bold rounded ${
                isLoFi ? 'bg-slate-300 text-slate-800' : 'bg-red-100 text-red-800'
              }`}>
                DANH MỤC NHÂN SỰ ĐẠI DIỆN
              </span>
              <span className="text-xs text-slate-500">· Cập nhật ngày 01/10/2026</span>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs bg-slate-100 p-1 rounded-lg border border-slate-200">
            <button
              onClick={() => setActiveSubTab('LEADERSHIP')}
              className={`px-3 py-1.5 rounded-md font-medium transition-colors ${
                activeSubTab === 'LEADERSHIP'
                  ? 'bg-white text-slate-900 shadow-xs font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Ban Thường trực (5)
            </button>
            <button
              onClick={() => setActiveSubTab('COMMITTEE')}
              className={`px-3 py-1.5 rounded-md font-medium transition-colors ${
                activeSubTab === 'COMMITTEE'
                  ? 'bg-white text-slate-900 shadow-xs font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Ủy ban MTTQ (67 UV)
            </button>
            <button
              onClick={() => setActiveSubTab('ORGANIZATIONS')}
              className={`px-3 py-1.5 rounded-md font-medium transition-colors ${
                activeSubTab === 'ORGANIZATIONS'
                  ? 'bg-white text-slate-900 shadow-xs font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              12 Tổ chức thành viên
            </button>
          </div>
        </div>
      </div>

      {/* SECTION 1: BAN THƯỜNG TRỰC (W4 - TRANG A) */}
      {activeSubTab === 'LEADERSHIP' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-700 flex items-center gap-2">
              <Award className="w-4 h-4 text-red-600" />
              <span>Ban Thường trực Ủy ban MTTQ Việt Nam phường</span>
            </h2>
            <span className="text-xs text-slate-500">Nhiệm kỳ 2026 – 2031</span>
          </div>

          {/* Row 1: Chủ tịch (Thẻ lớn riêng hàng đầu theo W4 PRD) */}
          {BAN_THUONG_TRUC.slice(0, 1).map((chair) => (
            <div
              key={chair.id}
              className={`p-5 rounded-xl border transition-all ${
                isLoFi 
                  ? 'bg-slate-50 border-slate-400' 
                  : 'bg-gradient-to-r from-red-50/60 via-white to-amber-50/40 border-red-200 shadow-xs'
              }`}
            >
              <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-center">
                {/* Photo 3:4 */}
                <div className="md:col-span-3 flex justify-center md:justify-start">
                  <div className={`w-36 h-48 rounded-lg overflow-hidden border-2 flex flex-col items-center justify-center text-center p-2 ${
                    isLoFi 
                      ? 'border-dashed border-slate-500 bg-slate-200 text-slate-600' 
                      : 'border-red-300 bg-slate-100 text-slate-700 shadow-inner'
                  }`}>
                    {isLoFi ? (
                      <>
                        <div className="text-xs font-bold">ẢNH 3:4</div>
                        <div className="text-[10px] text-slate-500 mt-1">Chân dung Chủ tịch</div>
                      </>
                    ) : (
                      <>
                        <div className="w-16 h-16 rounded-full bg-red-700 text-white font-bold text-xl flex items-center justify-center mb-2 shadow-sm">
                          BH
                        </div>
                        <span className="text-xs font-bold text-slate-800">{chair.name}</span>
                        <span className="text-[10px] text-red-700 font-semibold uppercase mt-0.5">Chủ tịch UB MTTQ</span>
                      </>
                    )}
                  </div>
                </div>

                {/* Info & Duties */}
                <div className="md:col-span-9 space-y-3">
                  <div>
                    <span className="inline-block px-2.5 py-0.5 rounded text-xs font-bold uppercase tracking-wider bg-red-600 text-white mb-1.5">
                      {chair.role}
                    </span>
                    <h3 className="text-xl font-bold text-slate-900">{chair.name}</h3>
                    <p className="text-xs text-slate-600 font-medium">{chair.title}</p>
                  </div>

                  <div className="p-3 rounded-lg bg-white/80 border border-slate-200 space-y-1.5 text-xs">
                    <span className="font-semibold text-slate-700 block">Phân công nhiệm vụ:</span>
                    <p className="text-slate-600 leading-relaxed">{chair.assignedArea}</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs pt-1">
                    <div className="flex items-center gap-2 text-slate-700">
                      <Phone className="w-4 h-4 text-red-600 shrink-0" />
                      <span>Công vụ: <strong>{chair.phone}</strong></span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-700">
                      <Calendar className="w-4 h-4 text-red-600 shrink-0" />
                      <span>Lịch tiếp dân: <strong>Thứ Năm hàng tuần</strong></span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-700">
                      <Mail className="w-4 h-4 text-red-600 shrink-0" />
                      <span className="truncate">{chair.email}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Row 2: 4 Phó Chủ tịch & Ủy viên Thường trực (Lưới 4 cột theo W4 PRD) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {BAN_THUONG_TRUC.slice(1).map((member) => (
              <div
                key={member.id}
                className={`p-4 rounded-lg border flex flex-col justify-between ${
                  isLoFi ? 'bg-white border-slate-300' : 'bg-white border-slate-200 hover:border-red-300 shadow-xs'
                }`}
              >
                <div>
                  {/* Avatar box */}
                  <div className={`w-full h-32 rounded-md mb-3 flex flex-col items-center justify-center border ${
                    isLoFi 
                      ? 'border-dashed border-slate-400 bg-slate-100 text-slate-500' 
                      : 'border-slate-200 bg-slate-50 text-slate-600'
                  }`}>
                    {isLoFi ? (
                      <span className="text-xs font-mono">ẢNH 3:4</span>
                    ) : (
                      <div className="w-12 h-12 rounded-full bg-slate-800 text-white font-bold flex items-center justify-center text-sm">
                        {member.name.split(' ').slice(-1)[0][0]}
                      </div>
                    )}
                  </div>

                  <span className={`text-[11px] font-bold px-2 py-0.5 rounded inline-block mb-1 ${
                    isLoFi ? 'bg-slate-200 text-slate-800' : 'bg-red-50 text-red-700'
                  }`}>
                    {member.role}
                  </span>
                  <h4 className="font-bold text-sm text-slate-900">{member.name}</h4>
                  <p className="text-[11px] text-slate-500 mt-0.5 line-clamp-1">{member.title}</p>
                  
                  <p className="text-xs text-slate-600 mt-2 bg-slate-50 p-2 rounded line-clamp-3">
                    {member.assignedArea}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 mt-3 flex items-center justify-between text-[11px]">
                  <span className="text-slate-500">ĐT công vụ:</span>
                  <strong className="text-slate-800">{member.phone}</strong>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SECTION 2: ỦY BAN MTTQ VIỆT NAM PHƯỜNG (W4 - TRANG B) */}
      {activeSubTab === 'COMMITTEE' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h2 className="text-sm font-bold uppercase tracking-wider text-slate-700 flex items-center gap-2">
                <Users className="w-4 h-4 text-red-600" />
                <span>Danh sách 67 Ủy viên Ủy ban MTTQ Việt Nam phường</span>
              </h2>
              <p className="text-xs text-slate-500">Cơ cấu hiệp thương gồm đầy đủ đại diện các khối, ban ngành, 27 TDP và nhân sĩ tiêu biểu</p>
            </div>
            
            <div className="text-xs text-slate-500 font-mono-tabular">
              Đang hiển thị: <strong>{filteredCommittee.length}</strong> / 67 Ủy viên
            </div>
          </div>

          {/* Filter, Search & View Mode Bar */}
          <div className={`p-3 rounded-lg border flex flex-wrap items-center justify-between gap-3 ${
            isLoFi ? 'bg-slate-100 border-slate-300' : 'bg-slate-50 border-slate-200'
          }`}>
            <div className="flex flex-wrap items-center gap-2 flex-1">
              <div className="relative min-w-[200px]">
                <Search className="w-3.5 h-3.5 absolute left-2.5 top-2.5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Tìm ủy viên theo họ tên, cơ quan..."
                  value={committeeSearch}
                  onChange={(e) => setCommitteeSearch(e.target.value)}
                  className="w-full pl-8 pr-3 py-1.5 text-xs bg-white rounded border border-slate-300 focus:outline-none focus:border-red-500"
                />
              </div>

              <select
                value={committeeBlock}
                onChange={(e) => setCommitteeBlock(e.target.value)}
                className="py-1.5 px-2.5 text-xs bg-white rounded border border-slate-300 text-slate-700 focus:outline-none"
              >
                <option value="ALL">Tất cả các khối hiệp thương</option>
                <option value="BAN_THUONG_TRUC">Khối Ban Thường trực (5)</option>
                <option value="TO_CHUC_THANH_VIEN">Khối 12 Tổ chức thành viên (10)</option>
                <option value="TRUONG_BAN_CTMT">Khối 27 Trưởng ban CTMT Tổ dân phố (27)</option>
                <option value="TIEU_BIEU_TRI_THUC">Khối Trí thức, Nhà khoa học (12)</option>
                <option value="TON_GIAO_DOANH_NGHIEP">Khối Tôn giáo, Doanh nghiệp (13)</option>
              </select>
            </div>

            <div className="flex items-center gap-2">
              <div className="flex items-center border border-slate-300 rounded bg-white p-0.5 text-xs">
                <button
                  type="button"
                  onClick={() => setCommitteeViewMode('CARDS')}
                  className={`px-2 py-1 rounded flex items-center gap-1 ${
                    committeeViewMode === 'CARDS'
                      ? 'bg-red-600 text-white font-bold'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                  title="Chế độ Thẻ ảnh trực quan"
                >
                  <LayoutGrid className="w-3.5 h-3.5" />
                  <span>Thẻ ảnh</span>
                </button>
                <button
                  type="button"
                  onClick={() => setCommitteeViewMode('TABLE')}
                  className={`px-2 py-1 rounded flex items-center gap-1 ${
                    committeeViewMode === 'TABLE'
                      ? 'bg-red-600 text-white font-bold'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                  title="Chế độ Bảng danh bạ"
                >
                  <List className="w-3.5 h-3.5" />
                  <span>Bảng</span>
                </button>
              </div>

              {committeeSearch && (
                <button
                  onClick={() => setCommitteeSearch('')}
                  className="text-xs text-red-600 hover:underline"
                >
                  Xóa tìm kiếm
                </button>
              )}
            </div>
          </div>

          {committeeViewMode === 'CARDS' ? (
            /* Cards View with Avatars & Badges */
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {filteredCommittee.map((cm) => (
                <div
                  key={cm.id}
                  className={`p-3.5 rounded-xl border flex flex-col justify-between transition-all ${
                    isLoFi
                      ? 'bg-white border-slate-300'
                      : 'bg-white border-slate-200 hover:border-red-400 hover:shadow-xs'
                  }`}
                >
                  <div>
                    <div className="flex items-start gap-3 mb-2">
                      <div className="w-11 h-11 rounded-full bg-gradient-to-br from-red-600 to-amber-700 text-white font-bold text-sm flex items-center justify-center shrink-0 shadow-xs ring-2 ring-red-100">
                        {cm.name.split(' ').slice(-1)[0][0]}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-mono text-slate-400">STT {cm.order}</span>
                          <span className={`px-1.5 py-0.2 rounded text-[10px] font-medium ${
                            cm.committeeRole.includes('Chủ tịch')
                              ? 'bg-red-100 text-red-800 font-bold'
                              : 'bg-slate-100 text-slate-700'
                          }`}>
                            {cm.committeeRole}
                          </span>
                        </div>
                        <h4 className="font-bold text-slate-900 text-sm truncate">{cm.name}</h4>
                        <p className="text-[11px] text-slate-600 truncate">{cm.workUnit}</p>
                      </div>
                    </div>

                    {cm.tdpId && (
                      <div className="mt-2 py-1 px-2 rounded bg-emerald-50 border border-emerald-200 text-emerald-800 text-[11px] flex items-center gap-1.5">
                        <MapPin className="w-3 h-3 text-emerald-600 shrink-0" />
                        <span>Trưởng ban CTMT Tổ dân phố số <strong>{cm.tdpId}</strong></span>
                      </div>
                    )}
                  </div>

                  <div className="pt-2.5 border-t border-slate-100 mt-2.5 flex items-center justify-between text-[11px]">
                    <span className="text-slate-500 font-mono flex items-center gap-1">
                      <Phone className="w-3 h-3 text-red-500" />
                      {cm.phone || '024.3768.1201'}
                    </span>
                    <button
                      onClick={() => alert(`Xem chi tiết hồ sơ Ủy viên MTTQ: ${cm.name}`)}
                      className="text-red-600 hover:underline font-semibold"
                    >
                      Chi tiết hồ sơ
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* Table View (W4 PRD: Bảng 4 cột STT · Họ tên · Đơn vị công tác · Chức vụ UB MTTQ) */
            <div className="bg-white rounded-lg border border-slate-200 overflow-hidden shadow-xs">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className={`border-b text-[11px] uppercase tracking-wider ${
                    isLoFi ? 'bg-slate-200 text-slate-700' : 'bg-slate-100 text-slate-600'
                  }`}>
                    <tr>
                      <th className="py-2.5 px-3 w-14 text-center">STT</th>
                      <th className="py-2.5 px-4">Họ và tên Ủy viên</th>
                      <th className="py-2.5 px-4">Chức vụ – Đơn vị công tác</th>
                      <th className="py-2.5 px-4">Chức vụ trong UB MTTQ</th>
                      <th className="py-2.5 px-3 text-right">Liên hệ</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredCommittee.map((cm) => (
                      <tr
                        key={cm.id}
                        className="hover:bg-slate-50 transition-colors"
                      >
                        <td className="py-3 px-3 text-center font-mono text-slate-500">
                          {cm.order}
                        </td>
                        <td className="py-3 px-4">
                          <div className="font-semibold text-slate-900">{cm.name}</div>
                          {cm.tdpId && (
                            <span className="text-[10px] text-emerald-700 font-medium">
                              Đại diện Tổ dân phố số {cm.tdpId}
                            </span>
                          )}
                        </td>
                        <td className="py-3 px-4 text-slate-700">
                          {cm.workUnit}
                        </td>
                        <td className="py-3 px-4">
                          <span className={`px-2 py-0.5 rounded text-[11px] font-medium ${
                            cm.committeeRole.includes('Chủ tịch')
                              ? 'bg-red-100 text-red-800 font-bold'
                              : 'bg-slate-100 text-slate-800'
                          }`}>
                            {cm.committeeRole}
                          </span>
                        </td>
                        <td className="py-3 px-3 text-right font-mono text-slate-600">
                          {cm.phone || '024.3768.1201'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          <div className="flex items-center justify-between text-xs text-slate-500 pt-1">
            <span>Phân trang: Hiển thị 20 dòng / trang</span>
            <span>Nguồn: Quyết định công nhận của UB MTTQ Thành phố Hà Nội</span>
          </div>
        </div>
      )}

      {/* SECTION 3: 12 TỔ CHỨC THÀNH VIÊN (W5) */}
      {activeSubTab === 'ORGANIZATIONS' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-sm font-bold uppercase tracking-wider text-slate-700 flex items-center gap-2">
                <Building className="w-4 h-4 text-red-600" />
                <span>12 Tổ chức thành viên trực thuộc UB MTTQ phường</span>
              </h2>
              <p className="text-xs text-slate-500">Liên minh chính trị - xã hội rộng lớn trên địa bàn phường Cầu Giấy</p>
            </div>
            <span className="text-xs text-slate-500 font-mono-tabular">12 / 12 tổ chức</span>
          </div>

          {/* Grid of 12 Member Organizations */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {MEMBER_ORGANIZATIONS.map((org) => (
              <div
                key={org.id}
                className={`p-4 rounded-xl border flex flex-col justify-between transition-all ${
                  isLoFi
                    ? 'bg-white border-slate-300'
                    : 'bg-white border-slate-200 hover:border-red-400 hover:shadow-xs'
                }`}
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center font-bold text-xs shrink-0 ${
                      isLoFi ? 'bg-slate-200 text-slate-700' : 'bg-red-50 text-red-700 border border-red-200'
                    }`}>
                      {org.shortName.slice(0, 2).toUpperCase()}
                    </div>
                    <span className="text-[11px] font-mono text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                      {org.memberCount.toLocaleString()} hội viên
                    </span>
                  </div>

                  <h3 className="font-bold text-sm text-slate-900 leading-snug">
                    {org.name}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                    {org.description}
                  </p>

                  <div className="mt-3 p-2.5 rounded bg-slate-50 border border-slate-100 space-y-1 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500">Người đứng đầu:</span>
                      <strong className="text-slate-800">{org.leaderName}</strong>
                    </div>
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="text-slate-500">Chức danh:</span>
                      <span className="text-slate-700">{org.leaderRole}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 mt-3 flex items-center justify-between text-xs">
                  <span className="flex items-center gap-1 text-slate-600 font-mono text-[11px]">
                    <Phone className="w-3 h-3 text-red-500" />
                    {org.contactPhone}
                  </span>
                  <button
                    onClick={() => alert(`Xem chuyên trang của ${org.name} (chuyển sang L2 Template Đơn vị trực thuộc).`)}
                    className="text-red-600 hover:underline font-semibold flex items-center gap-1"
                  >
                    <span>Trang đơn vị</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
