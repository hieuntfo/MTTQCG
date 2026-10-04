import React from 'react';
import { Info, CheckCircle2, ShieldAlert, Database, Clock } from 'lucide-react';

interface UxAnnotationBoxProps {
  layerCode: string;
  layerName: string;
  targetUser: string;
  keyGoal: string;
  pokaYokeRules: string[];
  apiSource?: string;
  slaRule?: string;
}

export const UxAnnotationBox: React.FC<UxAnnotationBoxProps> = ({
  layerCode,
  layerName,
  targetUser,
  keyGoal,
  pokaYokeRules,
  apiSource = 'GET /api/v1/mttq/cau-giay/...',
  slaRule = 'Cam kết SLA 7 ngày làm việc (Luật Dân chủ ở cơ sở & PRD mục 1.4)'
}) => {
  return (
    <div className="bg-amber-50 border-l-4 border-amber-500 text-slate-800 p-4 mb-4 rounded-r-md shadow-xs text-xs space-y-2 select-none animate-in fade-in">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-amber-200 pb-2">
        <div className="flex items-center gap-2">
          <span className="font-mono bg-amber-200 text-amber-900 font-bold px-2 py-0.5 rounded">
            {layerCode}
          </span>
          <span className="font-bold text-sm text-slate-900">{layerName}</span>
        </div>
        <div className="flex items-center gap-2 text-slate-600">
          <Clock className="w-3.5 h-3.5 text-amber-600" />
          <span>{slaRule}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-1">
        <div>
          <span className="font-semibold text-slate-700 block mb-0.5">Đối tượng sử dụng (Who):</span>
          <p className="text-slate-600">{targetUser}</p>
        </div>
        <div>
          <span className="font-semibold text-slate-700 block mb-0.5">Mục tiêu tối thượng (Why & KPI):</span>
          <p className="text-slate-600">{keyGoal}</p>
        </div>
        <div>
          <span className="font-semibold text-slate-700 block mb-0.5">Nguồn dữ liệu / Backend Contract:</span>
          <p className="font-mono text-[11px] text-amber-900 bg-amber-100/70 px-2 py-1 rounded">
            {apiSource}
          </p>
        </div>
      </div>

      <div className="border-t border-amber-200/80 pt-2">
        <span className="font-semibold text-slate-700 block mb-1 flex items-center gap-1.5">
          <ShieldAlert className="w-3.5 h-3.5 text-amber-700" />
          <span>Nguyên tắc Poka-Yoke & Trạng thái an toàn:</span>
        </span>
        <ul className="list-disc list-inside space-y-0.5 text-slate-700 text-[11px] pl-1">
          {pokaYokeRules.map((rule, idx) => (
            <li key={idx}>{rule}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};
