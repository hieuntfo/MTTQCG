import React, { useState } from 'react';
import {
  DesignMode,
  SupervisionProject,
  SupervisionType,
  SupervisionStatus,
  UiState
} from '../../types';
import { SUPERVISION_PROJECTS, RESIDENTIAL_GROUPS_27 } from '../../data/mockData';
import { UxAnnotationBox } from '../common/UxAnnotationBox';
import {
  ShieldCheck,
  Search,
  Filter,
  FileCheck,
  AlertTriangle,
  Clock,
  Plus,
  Download,
  Building,
  MapPin,
  ChevronRight,
  X,
  FileText,
  UserCheck,
  CheckCircle,
  ExternalLink,
  HelpCircle,
  Eye
} from 'lucide-react';

interface L3SupervisionViewProps {
  designMode: DesignMode;
  uiState: UiState;
  showAnnotations: boolean;
  onNavigateToFeedback?: () => void;
}

export const L3SupervisionView: React.FC<L3SupervisionViewProps> = ({
  designMode,
  uiState,
  showAnnotations,
  onNavigateToFeedback
}) => {
  const isLoFi = designMode === 'LO_FI_WIREFRAME';

  // Filters state
  const [selectedType, setSelectedType] = useState<string>('ALL');
  const [selectedStatus, setSelectedStatus] = useState<string>('ALL');
  const [selectedTdp, setSelectedTdp] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Selected project for detailed modal
  const [activeProject, setActiveProject] = useState<SupervisionProject | null>(SUPERVISION_PROJECTS[0]);
  const [activeTab, setActiveTab] = useState<'OVERVIEW' | 'FINDINGS' | 'AGENCY_REPLY'>('OVERVIEW');
  
  // Create new supervision modal
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newProjectForm, setNewProjectForm] = useState({
    title: '',
    type: 'COMMUNITY_INVESTMENT' as SupervisionType,
    tdpId: 8,
    leadUnit: 'Ban Giám sát đầu tư của cộng đồng (GSĐTCCĐ)',
    inspectorLeader: 'Trần Văn Mạnh (Phó Chủ tịch TT UB MTTQ)',
    targetAgency: 'Ban Quản lý dự án ĐTXD phường Cầu Giấy',
    dueDate: '2026-11-15',
    budget: '',
    findingsSummary: '',
  });

  // Filtered list
  const filteredProjects = SUPERVISION_PROJECTS.filter((p) => {
    if (selectedType !== 'ALL' && p.type !== selectedType) return false;
    if (selectedStatus !== 'ALL' && p.status !== selectedStatus) return false;
    if (selectedTdp !== 'ALL' && p.tdpId.toString() !== selectedTdp) return false;
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      return (
        p.title.toLowerCase().includes(q) ||
        p.code.toLowerCase().includes(q) ||
        p.location.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const getStatusBadge = (status: SupervisionStatus) => {
    switch (status) {
      case 'IN_PROGRESS':
        return (
          <span className={`px-2 py-0.5 rounded text-[11px] font-medium ${
            isLoFi ? 'bg-slate-200 text-slate-800' : 'bg-blue-100 text-blue-800 border border-blue-200'
          }`}>
            Đang giám sát
          </span>
        );
      case 'FINDINGS_ISSUED':
        return (
          <span className={`px-2 py-0.5 rounded text-[11px] font-medium ${
            isLoFi ? 'bg-slate-300 text-slate-900 font-bold' : 'bg-amber-100 text-amber-800 border border-amber-200'
          }`}>
            Đã có kết luận
          </span>
        );
      case 'WAITING_EXPLANATION':
        return (
          <span className={`px-2 py-0.5 rounded text-[11px] font-medium ${
            isLoFi ? 'bg-slate-200 text-slate-800 italic' : 'bg-orange-100 text-orange-800 border border-orange-200'
          }`}>
            Chờ giải trình
          </span>
        );
      case 'RESOLVED':
        return (
          <span className={`px-2 py-0.5 rounded text-[11px] font-medium ${
            isLoFi ? 'bg-slate-400 text-white' : 'bg-emerald-100 text-emerald-800 border border-emerald-200'
          }`}>
            Đã khắc phục
          </span>
        );
      default:
        return null;
    }
  };

  const getTypeName = (type: SupervisionType) => {
    switch (type) {
      case 'COMMUNITY_INVESTMENT':
        return 'Đầu tư cộng đồng (GSĐTCCĐ)';
      case 'PEOPLE_INSPECTION':
        return 'Thanh tra nhân dân (TTND)';
      case 'SOCIAL_WELFARE':
        return 'An sinh xã hội & Chính sách';
      case 'DEMOCRACY_GRASSROOTS':
        return 'Quy chế dân chủ cơ sở';
      case 'PUBLIC_SERVICE':
        return 'Đạo đức công vụ cán bộ';
    }
  };

  return (
    <div className="space-y-6">
      {/* PRD Annotation Box when toggled on */}
      {showAnnotations && (
        <UxAnnotationBox
          layerCode="L3"
          layerName="Chuyên mục nghiệp vụ: Báo cáo giám sát & Thanh tra nhân dân"
          targetUser="Thường trực UB MTTQ phường, Ban Giám sát ĐTCCĐ, Ban Thanh tra nhân dân, 27 Trưởng ban CTMT"
          keyGoal="Thực hiện quyền giám sát của Nhân dân đối với các công trình đầu tư công và chính sách an sinh; tỷ lệ đôn đốc xử lý khắc phục ≥ 90% SLA"
          pokaYokeRules={[
            'Hồ sơ giám sát có mốc SLA đếm ngược (quá hạn tô đỏ cảnh báo)',
            'Mỗi kết luận giám sát đều phải gắn kèm văn bản kiến nghị gửi UBND phường và tiến độ phản hồi',
            'Cho phép xuất danh sách báo cáo ra Excel / PDF để phục vụ kỳ họp HĐND hoặc báo cáo cấp trên',
            'Bấm từng dòng để mở toàn bộ 3 tab: Tổng quan thực địa - Kiến nghị - Giải trình khắc phục'
          ]}
          apiSource="GET /api/v1/mttq/supervisions?type={type}&status={status}&tdp={tdp}"
          slaRule="SLA 7 ngày làm việc đôn đốc UBND phường giải trình văn bản kiến nghị"
        />
      )}

      {/* Header & Metric Cards */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className={`px-2 py-0.5 text-xs font-mono font-bold rounded ${
              isLoFi ? 'bg-slate-300 text-slate-800' : 'bg-red-100 text-red-800'
            }`}>
              PHÂN HỆ NGHIỆP VỤ MTTQ
            </span>
            <span className="text-xs text-slate-500">· Năm công tác 2026</span>
          </div>
          <h1 className={`text-xl md:text-2xl font-bold tracking-tight ${
            isLoFi ? 'text-slate-900' : 'text-slate-900'
          }`}>
            Báo cáo giám sát & Thanh tra nhân dân
          </h1>
          <p className="text-xs text-slate-600 mt-1 max-w-3xl">
            Theo dõi, đôn đốc các cuộc giám sát đầu tư của cộng đồng (GSĐTCCĐ) và hoạt động của Ban Thanh tra nhân dân tại 27 tổ dân phố trên địa bàn phường Cầu Giấy.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => alert('Xuất file Báo cáo giám sát định kỳ gửi Thường trực Đảng ủy và HĐND phường Cầu Giấy (Excel/PDF).')}
            className={`px-3 py-2 rounded-lg text-xs font-medium border flex items-center gap-1.5 transition-colors ${
              isLoFi ? 'bg-white border-slate-400 hover:bg-slate-100 text-slate-800' : 'bg-white border-slate-300 hover:bg-slate-50 text-slate-700'
            }`}
          >
            <Download className="w-3.5 h-3.5 text-slate-500" />
            <span>Xuất báo cáo HĐND</span>
          </button>
          <button
            onClick={() => setShowCreateModal(true)}
            className={`px-3.5 py-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 shadow-xs transition-colors ${
              isLoFi ? 'bg-slate-900 text-white hover:bg-slate-800' : 'bg-red-600 text-white hover:bg-red-700'
            }`}
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Tạo đợt giám sát mới</span>
          </button>
        </div>
      </div>

      {/* Metric summary boxes */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className={`p-3.5 rounded-lg border ${
          isLoFi ? 'bg-slate-50 border-slate-300' : 'bg-white border-slate-200'
        }`}>
          <span className="text-xs text-slate-500 block">Tổng số đợt giám sát 2026</span>
          <div className="flex items-baseline justify-between mt-1">
            <span className="text-2xl font-bold font-mono-tabular text-slate-900">18</span>
            <span className="text-[11px] text-emerald-600 font-medium">100% đúng quy định</span>
          </div>
        </div>

        <div className={`p-3.5 rounded-lg border ${
          isLoFi ? 'bg-slate-50 border-slate-300' : 'bg-white border-slate-200'
        }`}>
          <span className="text-xs text-slate-500 block">Đang tiến hành tại TDP</span>
          <div className="flex items-baseline justify-between mt-1">
            <span className="text-2xl font-bold font-mono-tabular text-blue-600">4</span>
            <span className="text-[11px] text-slate-500">Tại TDP 7, 8, 10, 16</span>
          </div>
        </div>

        <div className={`p-3.5 rounded-lg border ${
          isLoFi ? 'bg-slate-50 border-slate-300' : 'bg-white border-slate-200'
        }`}>
          <span className="text-xs text-slate-500 block">Kiến nghị đã ban hành</span>
          <div className="flex items-baseline justify-between mt-1">
            <span className="text-2xl font-bold font-mono-tabular text-amber-600">12</span>
            <span className="text-[11px] text-amber-600 font-medium">2 chờ UBND phản hồi</span>
          </div>
        </div>

        <div className={`p-3.5 rounded-lg border ${
          isLoFi ? 'bg-slate-50 border-slate-300' : 'bg-white border-slate-200'
        }`}>
          <span className="text-xs text-slate-500 block">Tỷ lệ cơ quan khắc phục</span>
          <div className="flex items-baseline justify-between mt-1">
            <span className="text-2xl font-bold font-mono-tabular text-emerald-600">92.5%</span>
            <span className="text-[11px] text-slate-500">Đạt KPI PRD (≥ 90%)</span>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className={`p-3 rounded-lg border flex flex-wrap items-center justify-between gap-3 ${
        isLoFi ? 'bg-slate-100 border-slate-300' : 'bg-slate-50 border-slate-200'
      }`}>
        <div className="flex flex-wrap items-center gap-2 flex-1">
          {/* Search box */}
          <div className="relative min-w-[220px]">
            <Search className="w-3.5 h-3.5 absolute left-2.5 top-2.5 text-slate-400" />
            <input
              type="text"
              placeholder="Tìm theo tên công trình, mã GS..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 text-xs bg-white rounded border border-slate-300 focus:outline-none focus:border-red-500"
            />
          </div>

          {/* Type filter */}
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="py-1.5 px-2.5 text-xs bg-white rounded border border-slate-300 text-slate-700 focus:outline-none"
          >
            <option value="ALL">Tất cả hình thức giám sát</option>
            <option value="COMMUNITY_INVESTMENT">Đầu tư cộng đồng (GSĐTCCĐ)</option>
            <option value="PEOPLE_INSPECTION">Thanh tra nhân dân (TTND)</option>
            <option value="SOCIAL_WELFARE">An sinh xã hội & Chính sách</option>
          </select>

          {/* Status filter */}
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="py-1.5 px-2.5 text-xs bg-white rounded border border-slate-300 text-slate-700 focus:outline-none"
          >
            <option value="ALL">Tất cả trạng thái</option>
            <option value="IN_PROGRESS">Đang tiến hành</option>
            <option value="FINDINGS_ISSUED">Đã có kết luận</option>
            <option value="WAITING_EXPLANATION">Chờ giải trình / Khắc phục</option>
            <option value="RESOLVED">Đã hoàn thành khắc phục</option>
          </select>

          {/* TDP filter */}
          <select
            value={selectedTdp}
            onChange={(e) => setSelectedTdp(e.target.value)}
            className="py-1.5 px-2.5 text-xs bg-white rounded border border-slate-300 text-slate-700 focus:outline-none"
          >
            <option value="ALL">Tất cả 27 Tổ dân phố</option>
            {RESIDENTIAL_GROUPS_27.slice(0, 15).map((tdp) => (
              <option key={tdp.id} value={tdp.id.toString()}>
                {tdp.name} ({tdp.leaderName})
              </option>
            ))}
          </select>
        </div>

        <div className="text-xs text-slate-500 font-mono-tabular">
          Hiển thị <strong>{filteredProjects.length}</strong> cuộc giám sát
        </div>
      </div>

      {/* Main Content Layout: Table & Selected Detail Drawer/Pane */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Table View: 7 Cols */}
        <div className="lg:col-span-7 space-y-3">
          <div className="bg-white rounded-lg border border-slate-200 overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className={`border-b text-[11px] uppercase tracking-wider ${
                  isLoFi ? 'bg-slate-200 text-slate-700' : 'bg-slate-100 text-slate-600'
                }`}>
                  <tr>
                    <th className="py-2.5 px-3">Mã GS</th>
                    <th className="py-2.5 px-3">Nội dung giám sát</th>
                    <th className="py-2.5 px-3">Địa bàn</th>
                    <th className="py-2.5 px-3">Hạn SLA</th>
                    <th className="py-2.5 px-3 text-right">Trạng thái</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredProjects.map((project) => {
                    const isSelected = activeProject?.id === project.id;
                    return (
                      <tr
                        key={project.id}
                        onClick={() => setActiveProject(project)}
                        className={`cursor-pointer transition-colors ${
                          isSelected
                            ? isLoFi
                              ? 'bg-slate-200 font-medium'
                              : 'bg-red-50/70 border-l-4 border-l-red-600 font-medium'
                            : 'hover:bg-slate-50'
                        }`}
                      >
                        <td className="py-3 px-3 font-mono font-semibold text-slate-800">
                          {project.code}
                        </td>
                        <td className="py-3 px-3">
                          <div className="font-semibold text-slate-900 line-clamp-1">
                            {project.title}
                          </div>
                          <div className="text-[11px] text-slate-500 mt-0.5 flex items-center gap-1.5">
                            <span>{getTypeName(project.type)}</span>
                            <span>·</span>
                            <span>{project.targetAgency}</span>
                          </div>
                        </td>
                        <td className="py-3 px-3 text-slate-600 whitespace-nowrap">
                          TDP số {project.tdpId}
                        </td>
                        <td className="py-3 px-3 whitespace-nowrap">
                          {project.slaDaysLeft > 0 ? (
                            <span className="text-amber-700 font-medium font-mono-tabular">
                              Còn {project.slaDaysLeft} ngày
                            </span>
                          ) : (
                            <span className="text-slate-400 font-mono-tabular">Đã xong</span>
                          )}
                        </td>
                        <td className="py-3 px-3 text-right whitespace-nowrap">
                          {getStatusBadge(project.status)}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          <div className="flex items-center justify-between text-xs text-slate-500 px-1">
            <span>Hiển thị trang 1 / 1 (Dữ liệu mẫu PRD năm 2026)</span>
            <div className="flex items-center gap-2">
              <span className="text-[11px] text-slate-600">Đơn vị chủ quản:</span>
              <span className="font-semibold text-slate-800">Thường trực UB MTTQ phường Cầu Giấy</span>
            </div>
          </div>
        </div>

        {/* Selected Project Detail Card: 5 Cols */}
        <div className="lg:col-span-5">
          {activeProject ? (
            <div className={`rounded-lg border shadow-sm p-4 space-y-4 ${
              isLoFi ? 'bg-white border-slate-300' : 'bg-white border-slate-200'
            }`}>
              {/* Detail Header */}
              <div className="border-b border-slate-200 pb-3">
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold px-2 py-0.5 bg-slate-100 border border-slate-300 rounded text-slate-800">
                      {activeProject.code}
                    </span>
                    <span className="text-xs text-slate-500">{getTypeName(activeProject.type)}</span>
                  </div>
                  {getStatusBadge(activeProject.status)}
                </div>

                <h2 className="text-sm font-bold text-slate-900 leading-snug">
                  {activeProject.title}
                </h2>

                <div className="grid grid-cols-2 gap-2 mt-3 pt-2 border-t border-slate-100 text-xs">
                  <div>
                    <span className="text-slate-400 block text-[11px]">Địa bàn & Địa điểm:</span>
                    <span className="font-medium text-slate-800 flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3 h-3 text-red-500 shrink-0" />
                      <span>{activeProject.location}</span>
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[11px]">Chủ trì giám sát:</span>
                    <span className="font-medium text-slate-800 block mt-0.5 truncate">
                      {activeProject.inspectorLeader}
                    </span>
                  </div>
                </div>
              </div>

              {/* Detail Tabs (S5 PRD: 3 tab Thông tin · Kiến nghị · Lịch sử xử lý) */}
              <div className="flex items-center border-b border-slate-200 text-xs font-medium">
                <button
                  onClick={() => setActiveTab('OVERVIEW')}
                  className={`pb-2 px-2 border-b-2 transition-colors ${
                    activeTab === 'OVERVIEW'
                      ? 'border-red-600 text-red-600 font-bold'
                      : 'border-transparent text-slate-500 hover:text-slate-900'
                  }`}
                >
                  Biên bản hiện trường
                </button>
                <button
                  onClick={() => setActiveTab('FINDINGS')}
                  className={`pb-2 px-2 border-b-2 transition-colors ${
                    activeTab === 'FINDINGS'
                      ? 'border-red-600 text-red-600 font-bold'
                      : 'border-transparent text-slate-500 hover:text-slate-900'
                  }`}
                >
                  Kiến nghị gửi UBND ({activeProject.recommendations.length})
                </button>
                <button
                  onClick={() => setActiveTab('AGENCY_REPLY')}
                  className={`pb-2 px-2 border-b-2 transition-colors ${
                    activeTab === 'AGENCY_REPLY'
                      ? 'border-red-600 text-red-600 font-bold'
                      : 'border-transparent text-slate-500 hover:text-slate-900'
                  }`}
                >
                  Giải trình & Khắc phục
                </button>
              </div>

              {/* Tab 1: Overview & Findings */}
              {activeTab === 'OVERVIEW' && (
                <div className="space-y-3 text-xs">
                  <div>
                    <span className="font-semibold text-slate-700 block mb-1">
                      Kết quả giám sát thực địa:
                    </span>
                    <p className="text-slate-600 leading-relaxed bg-slate-50 p-2.5 rounded border border-slate-200">
                      {activeProject.findingsSummary}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-[11px]">
                    <div className="p-2 bg-slate-50 rounded border border-slate-200">
                      <span className="text-slate-400 block">Đơn vị chịu giám sát:</span>
                      <span className="font-semibold text-slate-800">{activeProject.targetAgency}</span>
                    </div>
                    {activeProject.budget && (
                      <div className="p-2 bg-slate-50 rounded border border-slate-200">
                        <span className="text-slate-400 block">Kinh phí đầu tư:</span>
                        <span className="font-semibold text-slate-800">{activeProject.budget}</span>
                      </div>
                    )}
                  </div>

                  <div>
                    <span className="text-slate-400 block text-[11px] mb-1">Tiến độ thực hiện:</span>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-slate-200 rounded-full h-2 overflow-hidden">
                        <div
                          className="bg-red-600 h-full rounded-full transition-all"
                          style={{ width: `${activeProject.progressPercent}%` }}
                        />
                      </div>
                      <span className="font-mono font-bold text-xs">{activeProject.progressPercent}%</span>
                    </div>
                  </div>

                  <div className="p-2.5 rounded bg-blue-50 border border-blue-200 text-blue-900 text-[11px] flex items-center justify-between">
                    <span className="flex items-center gap-1.5">
                      <FileText className="w-3.5 h-3.5 text-blue-600" />
                      <span>{activeProject.filesCount} tài liệu & hình ảnh hiện trường đính kèm</span>
                    </span>
                    <button
                      onClick={() => alert(`Đang mở ${activeProject.filesCount} tệp đính kèm biên bản giám sát ${activeProject.code}`)}
                      className="font-semibold hover:underline"
                    >
                      Xem hồ sơ
                    </button>
                  </div>
                </div>
              )}

              {/* Tab 2: Recommendations */}
              {activeTab === 'FINDINGS' && (
                <div className="space-y-3 text-xs">
                  <span className="font-semibold text-slate-800 block">
                    Danh sách các kiến nghị yêu cầu xử lý:
                  </span>
                  <div className="space-y-2">
                    {activeProject.recommendations.map((rec, i) => (
                      <div
                        key={i}
                        className="p-2.5 rounded border border-amber-200 bg-amber-50/70 text-slate-800 flex items-start gap-2"
                      >
                        <span className="w-5 h-5 rounded-full bg-amber-200 text-amber-900 flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                          {i + 1}
                        </span>
                        <p className="leading-snug">{rec}</p>
                      </div>
                    ))}
                  </div>

                  <div className="pt-2">
                    <button
                      onClick={() => alert(`Đã gửi công văn đôn đốc xử lý kiến nghị giám sát số ${activeProject.code} tới UBND phường Cầu Giấy qua liên thông nội bộ.`)}
                      className="w-full py-2 bg-amber-600 text-white rounded text-xs font-semibold hover:bg-amber-700 transition-colors"
                    >
                      Ban hành văn bản đôn đốc gửi UBND phường
                    </button>
                  </div>
                </div>
              )}

              {/* Tab 3: Agency Reply & Resolution */}
              {activeTab === 'AGENCY_REPLY' && (
                <div className="space-y-3 text-xs">
                  <span className="font-semibold text-slate-800 block">
                    Ý kiến phản hồi & Báo cáo khắc phục của đơn vị:
                  </span>
                  <div className="p-3 rounded border border-slate-200 bg-slate-50 space-y-2">
                    <div className="flex items-center justify-between text-[11px] text-slate-500">
                      <span>Người báo cáo: {activeProject.targetAgency}</span>
                      <span className="font-mono">Ngày: 01/10/2026</span>
                    </div>
                    <p className="text-slate-700 leading-relaxed font-normal">
                      {activeProject.agencyResponse || 'Chưa nhận được phản hồi chính thức từ cơ quan chịu giám sát.'}
                    </p>
                  </div>

                  {activeProject.status === 'RESOLVED' ? (
                    <div className="p-2.5 rounded bg-emerald-50 border border-emerald-200 text-emerald-800 flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Cuộc giám sát đã hoàn thành toàn diện các nội dung khắc phục.</span>
                    </div>
                  ) : (
                    <div className="p-2.5 rounded bg-amber-50 border border-amber-200 text-amber-800 flex items-center justify-between">
                      <span className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-amber-600" />
                        <span>Hạn hoàn thành khắc phục: {activeProject.dueDate}</span>
                      </span>
                      <button
                        onClick={() => alert('Thường trực UB MTTQ phê duyệt nghiệm thu khắc phục kiến nghị.')}
                        className="font-bold underline text-amber-900"
                      >
                        Nghiệm thu
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          ) : (
            <div className="h-64 flex flex-col items-center justify-center p-6 text-center border-2 border-dashed border-slate-300 rounded-lg text-slate-400">
              <FileCheck className="w-10 h-10 mb-2 opacity-50" />
              <p className="text-xs">Chọn một cuộc giám sát từ bảng danh sách để xem hồ sơ chi tiết</p>
            </div>
          )}
        </div>
      </div>

      {/* Modal: Tạo đợt giám sát mới */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-lg w-full overflow-hidden border border-slate-300 animate-in fade-in zoom-in-95">
            <div className="px-5 py-4 bg-slate-900 text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-red-500" />
                <h3 className="font-bold text-sm">Lập kế hoạch đợt giám sát mới (Nghiệp vụ MTTQ)</h3>
              </div>
              <button
                onClick={() => setShowCreateModal(false)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                alert(`Đã khởi tạo đợt giám sát mới: "${newProjectForm.title}" tại Tổ dân phố số ${newProjectForm.tdpId}. Hồ sơ đã chuyển tới Ban Thường trực UB MTTQ phê duyệt.`);
                setShowCreateModal(false);
              }}
              className="p-5 space-y-3.5 text-xs"
            >
              <div>
                <label className="font-semibold text-slate-700 block mb-1">
                  Tên cuộc giám sát / Công trình đầu tư công <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ví dụ: Giám sát dự án cải tạo mặt đường ngõ 68 Cầu Giấy..."
                  value={newProjectForm.title}
                  onChange={(e) => setNewProjectForm({ ...newProjectForm, title: e.target.value })}
                  className="w-full p-2 border border-slate-300 rounded focus:border-red-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Hình thức giám sát</label>
                  <select
                    value={newProjectForm.type}
                    onChange={(e) => setNewProjectForm({ ...newProjectForm, type: e.target.value as SupervisionType })}
                    className="w-full p-2 border border-slate-300 rounded focus:border-red-500 focus:outline-none"
                  >
                    <option value="COMMUNITY_INVESTMENT">Đầu tư cộng đồng (GSĐTCCĐ)</option>
                    <option value="PEOPLE_INSPECTION">Thanh tra nhân dân (TTND)</option>
                    <option value="SOCIAL_WELFARE">An sinh xã hội & Chính sách</option>
                  </select>
                </div>

                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Địa bàn Tổ dân phố</label>
                  <select
                    value={newProjectForm.tdpId}
                    onChange={(e) => setNewProjectForm({ ...newProjectForm, tdpId: Number(e.target.value) })}
                    className="w-full p-2 border border-slate-300 rounded focus:border-red-500 focus:outline-none"
                  >
                    {RESIDENTIAL_GROUPS_27.map((g) => (
                      <option key={g.id} value={g.id}>
                        {g.name} ({g.leaderName})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Cơ quan chịu giám sát</label>
                  <input
                    type="text"
                    value={newProjectForm.targetAgency}
                    onChange={(e) => setNewProjectForm({ ...newProjectForm, targetAgency: e.target.value })}
                    className="w-full p-2 border border-slate-300 rounded focus:border-red-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Hạn kết luận (SLA)</label>
                  <input
                    type="date"
                    value={newProjectForm.dueDate}
                    onChange={(e) => setNewProjectForm({ ...newProjectForm, dueDate: e.target.value })}
                    className="w-full p-2 border border-slate-300 rounded focus:border-red-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Nội dung trọng tâm cần kiểm tra</label>
                <textarea
                  rows={3}
                  placeholder="Ghi rõ nội dung kiểm định vật liệu, an toàn lao động, tiến độ hoặc việc thực hiện quy chế dân chủ..."
                  value={newProjectForm.findingsSummary}
                  onChange={(e) => setNewProjectForm({ ...newProjectForm, findingsSummary: e.target.value })}
                  className="w-full p-2 border border-slate-300 rounded focus:border-red-500 focus:outline-none"
                />
              </div>

              <div className="pt-2 border-t border-slate-200 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-3 py-1.5 border border-slate-300 rounded text-slate-700 hover:bg-slate-100"
                >
                  Hủy bỏ
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-red-600 text-white rounded font-medium hover:bg-red-700"
                >
                  Lưu & Khởi tạo đợt giám sát
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
