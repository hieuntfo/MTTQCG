import React, { useState } from 'react';
import {
  DesignMode,
  ResidentialGroup,
  UiState
} from '../../types';
import { RESIDENTIAL_GROUPS_27 } from '../../data/mockData';
import { UxAnnotationBox } from '../common/UxAnnotationBox';
import {
  Compass,
  Search,
  MapPin,
  Phone,
  Home,
  Users,
  ChevronRight,
  Maximize2,
  ExternalLink,
  QrCode,
  Send,
  MessageSquare
} from 'lucide-react';

interface CommunityMapTdpViewProps {
  designMode: DesignMode;
  uiState: UiState;
  showAnnotations: boolean;
  onSelectTdp: (tdpId: number) => void;
  onSendFeedbackForTdp?: (tdpId: number) => void;
}

export const CommunityMapTdpView: React.FC<CommunityMapTdpViewProps> = ({
  designMode,
  uiState,
  showAnnotations,
  onSelectTdp,
  onSendFeedbackForTdp
}) => {
  const isLoFi = designMode === 'LO_FI_WIREFRAME';

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTdp, setSelectedTdp] = useState<ResidentialGroup>(RESIDENTIAL_GROUPS_27[7]); // TDP 8 default
  const [viewMode, setViewMode] = useState<'MAP_AND_LIST' | 'MAP_ONLY' | 'LIST_ONLY'>('MAP_AND_LIST');

  // Filtered TDPs
  const filteredTdp = RESIDENTIAL_GROUPS_27.filter((tdp) => {
    if (searchQuery.trim() === '') return true;
    const q = searchQuery.toLowerCase();
    return (
      tdp.name.toLowerCase().includes(q) ||
      tdp.leaderName.toLowerCase().includes(q) ||
      tdp.coverage.toLowerCase().includes(q) ||
      tdp.culturalHouseAddress.toLowerCase().includes(q)
    );
  });

  return (
    <div className="space-y-6">
      {/* PRD Annotation Box when toggled on */}
      {showAnnotations && (
        <UxAnnotationBox
          layerCode="W6"
          layerName="Ban CTMT Tổ dân phố: Bản đồ số 26 TDP + Danh sách 27 Trưởng ban (EPICENTER)"
          targetUser="Người dân trong phường tìm TDP của mình; cán bộ theo dõi địa bàn"
          keyGoal="Điểm tựa kết nối cơ sở: người dân gắn bó với TDP hơn với phường; tìm thấy người phụ trách và hotline trong ≤ 2 chạm"
          pokaYokeRules={[
            'Knowledge-based Poka-Yoke: Người dân không biết số TDP -> Cho phép gõ tên ngõ/đường để tự động gợi ý đúng TDP',
            'Xử lý mâu thuẫn 26 vùng ranh giới / 27 Trưởng ban: Bản đồ hiển thị 26 vùng ranh giới chuẩn quy hoạch, TDP 27 là cụm chung cư mới ghép địa bàn và có ghi chú rõ ràng',
            'Bấm 1 vùng trên bản đồ sẽ highlight dòng danh sách tương ứng và ngược lại',
            'Trên mobile cho phép chuyển đổi nhanh Bản đồ / Danh sách để tránh quá tải màn hình'
          ]}
          apiSource="GET /api/v1/mttq/tdp-map-geojson"
          slaRule="Đầu mối 27 Trưởng ban CTMT thường trực tiếp nhận thông tin 24/7"
        />
      )}

      {/* Main Header & Search */}
      <div className="border-b pb-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-3">
          <div>
            <div className="flex items-center gap-2">
              <span className={`px-2 py-0.5 text-xs font-mono font-bold rounded ${
                isLoFi ? 'bg-slate-300 text-slate-800' : 'bg-emerald-100 text-emerald-800'
              }`}>
                EPICENTER HỆ THỐNG
              </span>
              <span className="text-xs text-slate-500">· 27 Tổ dân phố phường Cầu Giấy</span>
            </div>
            <h1 className="text-xl md:text-2xl font-bold text-slate-900 mt-1">
              Bản đồ số & Ban Công tác Mặt trận 27 Tổ dân phố
            </h1>
            <p className="text-xs text-slate-600 mt-0.5">
              Cửa ngõ kết nối Nhân dân từ cơ sở. Tra cứu người phụ trách, số điện thoại, nhà văn hóa và quét QR tương tác.
            </p>
          </div>

          {/* Quick Stats */}
          <div className="flex items-center gap-3 text-xs">
            <div className="p-2 rounded bg-slate-50 border border-slate-200 text-center">
              <span className="text-slate-500 block text-[10px]">Trưởng ban CTMT</span>
              <strong className="text-slate-900 text-sm font-mono-tabular">27 / 27</strong>
            </div>
            <div className="p-2 rounded bg-slate-50 border border-slate-200 text-center">
              <span className="text-slate-500 block text-[10px]">Nhà sinh hoạt TDP</span>
              <strong className="text-emerald-700 text-sm font-mono-tabular">27 điểm</strong>
            </div>
          </div>
        </div>

        {/* Global TDP Search Bar */}
        <div className="relative max-w-xl">
          <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
          <input
            type="text"
            placeholder="Nhập tên ngõ, phố (Duy Tân, Cầu Giấy, Xuân Thủy, Chùa Hà...) hoặc tên Trưởng ban..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs md:text-sm bg-white rounded-lg border border-slate-300 focus:outline-none focus:border-red-500 shadow-2xs"
          />
        </div>
      </div>

      {/* Main Grid: 7 Cols Map + 5 Cols List (Desktop 1440px spec) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: Interactive SVG Digital Map (7 Cols) */}
        <div className="lg:col-span-7 space-y-3">
          <div className={`p-4 rounded-xl border relative overflow-hidden shadow-xs ${
            isLoFi ? 'bg-slate-100 border-slate-300' : 'bg-slate-900 text-white border-slate-800'
          }`}>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Compass className="w-4 h-4 text-emerald-500" />
                <h3 className={`text-xs font-bold uppercase tracking-wider ${isLoFi ? 'text-slate-800' : 'text-slate-200'}`}>
                  Sơ đồ ranh giới 26 cụm dân cư phường Cầu Giấy
                </h3>
              </div>
              <span className="text-[11px] text-slate-400 font-mono">
                Bấm vào một tổ để xem chi tiết
              </span>
            </div>

            {/* Interactive SVG Map Simulation */}
            <div className={`w-full aspect-4/3 rounded-lg relative overflow-hidden border ${
              isLoFi ? 'bg-white border-slate-300' : 'bg-slate-950 border-slate-800'
            }`}>
              <svg
                viewBox="0 0 100 90"
                className="w-full h-full p-2 select-none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Background Grid Lines */}
                <defs>
                  <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                    <path d="M 10 0 L 0 0 0 10" fill="none" stroke={isLoFi ? '#E2E8F0' : '#1E293B'} strokeWidth="0.5" />
                  </pattern>
                </defs>
                <rect width="100" height="90" fill="url(#grid)" />

                {/* Major Arterial Roads in Cau Giay (Cầu Giấy, Xuân Thủy, Trần Thái Tông, Duy Tân) */}
                <path d="M 0 22 L 100 22" stroke={isLoFi ? '#94A3B8' : '#334155'} strokeWidth="1.5" strokeDasharray="2 1" />
                <text x="50" y="20" fill={isLoFi ? '#64748B' : '#64748B'} fontSize="2.5" textAnchor="middle" fontWeight="bold">
                  Trục đường Cầu Giấy — Xuân Thủy
                </text>

                <path d="M 50 0 L 50 90" stroke={isLoFi ? '#94A3B8' : '#334155'} strokeWidth="1.5" strokeDasharray="2 1" />
                <text x="52" y="85" fill={isLoFi ? '#64748B' : '#64748B'} fontSize="2.2" fontWeight="bold">
                  Trần Thái Tông — Nguyễn Phong Sắc
                </text>

                {/* 26 Map zones rendered as interactive blocks */}
                {RESIDENTIAL_GROUPS_27.slice(0, 26).map((tdp) => {
                  const isSelected = selectedTdp?.id === tdp.id;
                  const { x, y, width, height } = tdp.mapCoordinates;

                  return (
                    <g
                      key={tdp.id}
                      onClick={() => setSelectedTdp(tdp)}
                      className="cursor-pointer transition-all hover:opacity-90"
                    >
                      <rect
                        x={x}
                        y={y}
                        width={width}
                        height={height}
                        rx="1.5"
                        fill={
                          isSelected
                            ? isLoFi
                              ? '#334155'
                              : '#DC2626'
                            : isLoFi
                            ? '#CBD5E1'
                            : '#1E293B'
                        }
                        stroke={
                          isSelected
                            ? '#FFFFFF'
                            : isLoFi
                            ? '#94A3B8'
                            : '#475569'
                        }
                        strokeWidth={isSelected ? '0.8' : '0.4'}
                      />
                      <text
                        x={x + width / 2}
                        y={y + height / 2 + 1}
                        textAnchor="middle"
                        fill={isSelected ? '#FFFFFF' : isLoFi ? '#0F172A' : '#E2E8F0'}
                        fontSize="3"
                        fontWeight="bold"
                        fontFamily="system-ui, sans-serif"
                      >
                        TDP {tdp.id}
                      </text>
                    </g>
                  );
                })}
              </svg>

              {/* Floating Overlay Badge on Selected TDP */}
              <div className={`absolute bottom-3 left-3 right-3 p-3 rounded-lg border backdrop-blur-xs flex items-center justify-between shadow-lg ${
                isLoFi ? 'bg-white/95 border-slate-400 text-slate-900' : 'bg-slate-900/90 border-slate-700 text-white'
              }`}>
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-xs">{selectedTdp.name}</span>
                    <span className="text-[10px] text-slate-400">({selectedTdp.households} hộ dân)</span>
                  </div>
                  <p className="text-[11px] text-slate-500 line-clamp-1">
                    Trưởng ban CTMT: <strong>{selectedTdp.leaderName}</strong> · ĐT: {selectedTdp.leaderPhone}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onSelectTdp(selectedTdp.id)}
                    className="px-2.5 py-1.5 bg-red-600 hover:bg-red-700 text-white rounded text-xs font-semibold flex items-center gap-1"
                  >
                    <span>Vào trang TDP</span>
                    <ChevronRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>

            {/* Note about 26 zones / 27 leaders */}
            <div className="mt-2 text-[11px] text-slate-400 flex items-center justify-between">
              <span>* Chú thích PRD: Bản đồ quy hoạch gồm 26 vùng ranh giới; TDP 27 (Khu đô thị Cầu Giấy) dùng chung phân vùng hành chính.</span>
            </div>
          </div>
        </div>

        {/* Right: 27 Leaders & Coverage List (5 Cols) */}
        <div className="lg:col-span-5 space-y-3">
          <div className="flex items-center justify-between text-xs text-slate-600 px-1">
            <span className="font-semibold uppercase tracking-wider">
              Danh sách 27 Trưởng ban Công tác Mặt trận
            </span>
            <span className="font-mono-tabular">
              {filteredTdp.length} tổ dân phố
            </span>
          </div>

          <div className="max-h-[540px] overflow-y-auto space-y-2 pr-1">
            {filteredTdp.map((tdp) => {
              const isSelected = selectedTdp?.id === tdp.id;
              return (
                <div
                  key={tdp.id}
                  onClick={() => setSelectedTdp(tdp)}
                  className={`p-3 rounded-lg border cursor-pointer transition-all ${
                    isSelected
                      ? isLoFi
                        ? 'bg-slate-200 border-slate-500'
                        : 'bg-red-50/80 border-red-500 shadow-xs'
                      : 'bg-white border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-start gap-2.5">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs shrink-0 ${
                        isSelected
                          ? 'bg-red-700 text-white'
                          : isLoFi
                          ? 'bg-slate-300 text-slate-800'
                          : 'bg-slate-100 text-slate-700'
                      }`}>
                        {tdp.id}
                      </div>

                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-bold text-xs text-slate-900">{tdp.name}</h4>
                          <span className="text-[10px] text-slate-500 font-mono">{tdp.code}</span>
                        </div>
                        <p className="text-xs text-slate-800 font-semibold mt-0.5">
                          {tdp.leaderName}
                        </p>
                        <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">
                          Phạm vi: {tdp.coverage}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-col items-end gap-1 shrink-0">
                      <a
                        href={`tel:${tdp.leaderPhone}`}
                        onClick={(e) => e.stopPropagation()}
                        className="text-[11px] font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 flex items-center gap-1 hover:bg-emerald-100"
                        title="Bấm gọi Trưởng ban CTMT"
                      >
                        <Phone className="w-2.5 h-2.5" />
                        <span>{tdp.leaderPhone}</span>
                      </a>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectTdp(tdp.id);
                        }}
                        className="text-xs text-red-600 hover:underline flex items-center gap-0.5 mt-1"
                      >
                        <span>Chi tiết</span>
                        <ChevronRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>

                  {/* Cultural House badge */}
                  <div className="mt-2 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                    <span className="flex items-center gap-1 truncate max-w-[240px]">
                      <Home className="w-3 h-3 text-slate-400 shrink-0" />
                      <span className="truncate">{tdp.culturalHouseAddress}</span>
                    </span>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        if (onSendFeedbackForTdp) {
                          onSendFeedbackForTdp(tdp.id);
                        } else {
                          onSelectTdp(tdp.id);
                        }
                      }}
                      className="text-red-700 font-medium hover:underline flex items-center gap-1 shrink-0"
                    >
                      <Send className="w-2.5 h-2.5" />
                      <span>Gửi ý kiến</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
