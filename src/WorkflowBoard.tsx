import React, { useState, useEffect, useRef } from 'react';

type Stat = {
  label: string;
  value: string;
};

type ActionCard = {
  id: string;
  badge?: string;
  description: string;
  primaryLabel?: string;
  secondaryLabel?: string;
  applicants?: number;
  tone?: 'purple' | 'green' | 'gray';
  hasMenu?: boolean;
};

type Stage = {
  id: string;
  icon: string;
  title: string;
  stats: Stat[];
  actions: ActionCard[];
};

type CardState = {
  count: number;
  animatingCount: number;
  isAnimating: boolean;
  animationType: 'increase' | 'decrease' | null;
};

const stages: Stage[] = [
  {
    id: 'apply-received',
    icon: '🔨',
    title: '지원서 접수',
    stats: [
      { label: '공고 개수', value: '1개' },
      { label: '채용공고 수', value: '1개' },
      { label: '총 지원자 수', value: '0명' },
      { label: '채용사이트 바로가기', value: '' },
    ],
    actions: [
      {
        id: 'notice',
        badge: '공고 게시 (2025-11-24 00:00)',
        description: '안내 및 발표 완료 응시생 통합 오픈 안내 및 발표 있는 지원자 안내메일 공고',
        applicants: 0,
        tone: 'gray',
        hasMenu: true,
      },
      {
        id: 'test-start',
        badge: '검사 진행 시작 (2025-11-27 00:00)',
        description: '안내 및 발표 완료 응시생 통합 오픈 안내 및 발표 있는 지원자 안내메일 공고',
        applicants: 0,
        tone: 'gray',
        hasMenu: true,
      },
      {
        id: 'wait',
        badge: '전형 배정 대기',
        description: '안내 및 발표 완료 응시생 통합 오픈 안내 및 발표 있는 지원자 안내메일 공고',
        applicants: 0,
        tone: 'gray',
        hasMenu: true,
      },
    ],
  },
  {
    id: 'ability-test',
    icon: '🧠',
    title: '역량검사 진행',
    stats: [
      { label: '전형명', value: '수상식 안내 및 발표 역량검사 진행' },
      { label: '지원자 수', value: '0명' },
      { label: '평가자 수', value: '0명' },
      { label: '평가 서류 작성 완료자 배정', value: '0건' },
    ],
    actions: [
      {
        id: 'auto-assign',
        badge: '전형 대상자 자동 배정',
        description: '',
        primaryLabel: '자동 배정 조건 설정',
        secondaryLabel: '수동 배정',
        tone: 'purple',
        hasMenu: true,
      },
      {
        id: 'result-input',
        badge: '평가결과 입력',
        description: '사용자 실행 시',
        applicants: 6,
        tone: 'green',
        hasMenu: true,
      },
      {
        id: 'result-confirm',
        badge: '평가 결과 확정',
        description: '사용자 실행 시',
        applicants: 0,
        tone: 'green',
        hasMenu: true,
      },
      {
        id: 'wait',
        badge: '전형 배정 대기',
        description: '',
        applicants: 0,
        tone: 'gray',
        hasMenu: true,
      },
    ],
  },
  {
    id: 'document-screening',
    icon: '📁',
    title: '서류 전형',
    stats: [
      { label: '전형명', value: '수상식 안내 및 발표 서류 전형' },
      { label: '지원자 수', value: '0명' },
      { label: '평가자 수', value: '0명' },
      { label: '대상자 확인', value: '' },
    ],
    actions: [
      {
        id: 'auto-assign',
        badge: '전형 대상자 자동 배정',
        description: '',
        primaryLabel: '자동 배정 조건 설정',
        secondaryLabel: '수동 배정',
        tone: 'purple',
        hasMenu: true,
      },
      {
        id: 'assign-evaluator',
        badge: '평가자 배정',
        description: '사용자 실행 시',
        applicants: 0,
        tone: 'green',
        hasMenu: true,
      },
      {
        id: 'result-input',
        badge: '평가결과 입력',
        description: '사용자 실행 시',
        applicants: 0,
        tone: 'green',
        hasMenu: true,
      },
      {
        id: 'result-confirm',
        badge: '평가 결과 확정',
        description: '사용자 실행 시',
        applicants: 0,
        tone: 'green',
        hasMenu: true,
      },
      {
        id: 'wait',
        badge: '전형 배정 대기',
        description: '',
        applicants: 0,
        tone: 'gray',
        hasMenu: true,
      },
    ],
  },
  {
    id: 'interview',
    icon: '🗓️',
    title: '면접 전형',
    stats: [
      { label: '전형명', value: '수상식 안내 및 발표 면접 전형' },
      { label: '지원자 수', value: '0명' },
      { label: '평가자 수', value: '0명' },
      { label: '대상자 확인', value: '' },
    ],
    actions: [
      {
        id: 'auto-assign',
        badge: '전형 대상자 자동 배정',
        description: '',
        primaryLabel: '자동 배정 조건 설정',
        secondaryLabel: '수동 배정',
        tone: 'purple',
        hasMenu: true,
      },
      {
        id: 'assign-evaluator',
        badge: '평가자 배정',
        description: '사용자 실행 시',
        applicants: 0,
        tone: 'green',
        hasMenu: true,
      },
      {
        id: 'result-input',
        badge: '평가결과 입력',
        description: '사용자 실행 시',
        applicants: 0,
        tone: 'green',
        hasMenu: true,
      },
      {
        id: 'result-confirm',
        badge: '평가 결과 확정',
        description: '사용자 실행 시',
        applicants: 0,
        tone: 'green',
        hasMenu: true,
      },
      {
        id: 'wait',
        badge: '전형 배정 대기',
        description: '',
        applicants: 0,
        tone: 'gray',
        hasMenu: true,
      },
    ],
  },
];

const toneClasses: Record<NonNullable<ActionCard['tone']>, { border: string; badge: string }> = {
  purple: {
    border: 'border-violet-200',
    badge: 'text-violet-600',
  },
  green: {
    border: 'border-emerald-200',
    badge: 'text-emerald-600',
  },
  gray: {
    border: 'border-slate-200',
    badge: 'text-slate-600',
  },
};


// 지원자 아바타 컴포넌트
const ApplicantAvatars: React.FC<{ count: number; isAnimating: boolean; animationType: 'increase' | 'decrease' | null }> = ({ 
  count, 
  isAnimating
}) => {
  const [displayCount, setDisplayCount] = useState(count);
  const [isFading, setIsFading] = useState(false);
  const prevAnimatingRef = useRef(false);

  useEffect(() => {
    // 애니메이션이 시작될 때
    if (isAnimating && !prevAnimatingRef.current) {
      prevAnimatingRef.current = true;
      setIsFading(true);
      
      // 0.7초 후에 실제 count 변경 (애니메이션 끝나기 직전)
      const timer = setTimeout(() => {
        setDisplayCount(count);
        setIsFading(false);
      }, 700);

      return () => clearTimeout(timer);
    } 
    // 애니메이션이 완전히 끝났을 때
    else if (!isAnimating && prevAnimatingRef.current) {
      prevAnimatingRef.current = false;
      setDisplayCount(count);
      setIsFading(false);
    }
    // 일반적인 경우
    else if (!isAnimating) {
      setDisplayCount(count);
    }
  }, [count, isAnimating]);

  const maxVisible = 5;
  const visibleCount = Math.min(displayCount, maxVisible);
  const remainingCount = Math.max(0, displayCount - maxVisible);

  // 각 지원자마다 실제 사람 사진 사용
  // 여자 3명(0,1,2), 남자 2명(3,4) - 20대 초반 한국인
  const getAvatarUrl = (index: number) => {
    const profiles = [
      // 여자 1 - 20대 초반 한국인
      'https://i.pravatar.cc/150?img=47',
      // 여자 2 - 20대 초반 한국인
      'https://i.pravatar.cc/150?img=48',
      // 여자 3 - 20대 초반 한국인
      'https://i.pravatar.cc/150?img=49',
      // 남자 1 - 20대 초반 한국인
      'https://i.pravatar.cc/150?img=33',
      // 남자 2 - 20대 초반 한국인
      'https://i.pravatar.cc/150?img=52',
    ];
    
    return profiles[index % profiles.length];
  };

  return (
    <div 
      className={`flex flex-row-reverse items-center -space-x-reverse -space-x-2 min-h-[28px] transition-opacity duration-300 ${
        isFading ? 'opacity-0' : 'opacity-100'
      }`}
    >
      {remainingCount > 0 && (
        <div 
          className="w-7 h-7 rounded-full border-2 border-white bg-slate-400 flex items-center justify-center text-[10px] font-bold text-white cursor-pointer hover:bg-slate-500 transition-colors shadow-sm"
          style={{ 
            zIndex: visibleCount + 1
          }}
        >
          +{remainingCount}
        </div>
      )}
      {Array.from({ length: visibleCount }).map((_, idx) => (
        <div
          key={idx}
          className="w-7 h-7 rounded-full border-2 border-white overflow-hidden bg-white shadow-sm"
          style={{ 
            zIndex: idx + 1
          }}
        >
          <img 
            src={getAvatarUrl(idx)} 
            alt={`지원자 ${idx + 1}`}
            className="w-full h-full object-cover"
          />
        </div>
      ))}
    </div>
  );
};

const ActionCardView: React.FC<{
  card: ActionCard;
  cardState?: CardState;
  stageId: string;
}> = ({ card, cardState }) => {
  const tone = card.tone ?? 'gray';
  const toneStyle = toneClasses[tone];

  const displayCount = cardState?.isAnimating ? cardState.animatingCount : (cardState?.count ?? card.applicants ?? 0);

  // 테두리 애니메이션 클래스
  const getBorderAnimation = () => {
    if (!cardState?.isAnimating) return '';
    if (cardState.animationType === 'decrease') {
      return 'animate-pulse-red';
    }
    if (cardState.animationType === 'increase') {
      return 'animate-pulse-green';
    }
    return '';
  };

  return (
    <div
      className={`bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden mt-3 transition-all ${getBorderAnimation()}`}
    >
      {/* colored top border */}
      <div className={`h-1 w-full ${toneStyle.border}`} />

      <div className="px-4 py-3 space-y-2">
        <div className="flex items-start justify-between gap-2">
          <div className="flex flex-col">
            {card.badge && <span className={`text-xs font-medium ${toneStyle.badge} truncate`}>{card.badge}</span>}
            {card.description && <p className="mt-1 text-xs text-slate-500 line-clamp-2">{card.description}</p>}
          </div>
          {card.hasMenu && (
            <button className="shrink-0 ml-2 p-1 rounded-full hover:bg-slate-100">
              <span className="block w-1 h-1 bg-slate-400 rounded-full mb-0.5" />
              <span className="block w-1 h-1 bg-slate-400 rounded-full mb-0.5" />
              <span className="block w-1 h-1 bg-slate-400 rounded-full" />
            </button>
          )}
        </div>

        {(card.primaryLabel || card.secondaryLabel) && (
          <div className="mt-1 flex items-center justify-between gap-2 text-xs">
            {card.primaryLabel && (
              <button className="flex-1 h-8 rounded-lg border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700">
                {card.primaryLabel}
              </button>
            )}
            {card.secondaryLabel && (
              <button className="flex-1 h-8 rounded-lg border border-slate-100 bg-white hover:bg-slate-50 text-slate-600">
                {card.secondaryLabel}
              </button>
            )}
          </div>
        )}

        {/* 우하단 지원자 정보 그룹 */}
        <div className="flex items-end justify-end mt-2">
          <div className="flex flex-col items-end gap-2">
            {/* 지원자 아바타 */}
            {displayCount > 0 && (
              <ApplicantAvatars 
                count={displayCount} 
                isAnimating={cardState?.isAnimating ?? false}
                animationType={cardState?.animationType ?? null}
              />
            )}
            
            {/* 대상자 수 */}
            <div className="text-[11px] text-slate-400">
              <span>대상자 수: </span>
              <span className={cardState?.isAnimating ? 'font-bold text-slate-900' : ''}>{displayCount}명</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const StageColumn: React.FC<{
  stage: Stage;
  isFirst?: boolean;
  cardStates: Record<string, CardState>;
}> = ({ stage, cardStates }) => {
  return (
    <div className="flex-none w-[340px] flex flex-col items-stretch">
      {/* Node card */}
      <div className="bg-white rounded-[26px] shadow-sm border border-slate-100 px-6 pt-6 pb-4">
        {/* icon */}
        <div className="flex flex-col items-center mb-6">
          <div className="w-16 h-16 rounded-full bg-gradient-to-b from-orange-50 to-orange-100 flex items-center justify-center shadow-sm mb-3">
            <span className="text-3xl">{stage.icon}</span>
          </div>
          <h2 className="text-sm font-semibold text-slate-800">{stage.title}</h2>
        </div>

        {/* stats */}
        <dl className="space-y-2 text-xs">
          {stage.stats.map((stat) => (
            <div key={stat.label} className="flex items-center justify-between text-slate-600">
              <dt className="text-slate-400">{stat.label}</dt>
              <dd className="font-medium text-right text-slate-700 truncate">{stat.value}</dd>
            </div>
          ))}
        </dl>
      </div>

      {/* Actions */}
      <div className="mt-3">
        {stage.actions.map((card) => {
          const cardKey = `${stage.id}-${card.id}`;
          return (
            <ActionCardView key={card.id} card={card} cardState={cardStates[cardKey]} stageId={stage.id} />
          );
        })}
      </div>
    </div>
  );
};

const TopNav: React.FC = () => {
  return (
    <header className="flex items-center justify-between px-8 py-4 border-b border-slate-100 bg-white/80 backdrop-blur-sm">
      <div className="flex items-center gap-2">
        <button className="text-sm font-semibold text-slate-800">마이다스 그룹</button>
        <span className="text-xs text-slate-300">▾</span>
      </div>
      <nav className="flex items-center gap-6 text-xs text-slate-500">
        <button className="hover:text-slate-800">채용 사이트</button>
        <button className="hover:text-slate-800">평가자 사이트</button>
        <button className="hover:text-slate-800">응시자 사이트</button>
        <button className="hover:text-slate-800">AI 에이전트</button>
        <button className="hover:text-slate-800">이용 서비스 선택</button>
      </nav>
      <div className="flex items-center gap-3 text-xs text-slate-500">
        <button className="px-3 py-1.5 rounded-full border border-slate-200">완료도 조회</button>
        <div className="px-3 py-1.5 rounded-full bg-slate-900 text-white font-mono">03:59:21</div>
        <button className="px-3 py-1.5 rounded-full border border-slate-200">연장</button>
      </div>
    </header>
  );
};

const SideNav: React.FC = () => {
  return (
    <aside className="absolute left-4 top-24 flex flex-col gap-2">
      <button className="w-10 h-10 rounded-full border border-slate-200 bg-white shadow-sm text-[11px] text-slate-600">
        홈
      </button>
      <button className="w-10 h-10 rounded-full border border-slate-200 bg-white shadow-sm text-[11px] text-slate-600">
        채용
      </button>
      <button className="w-10 h-10 rounded-full border border-slate-200 bg-white shadow-sm text-[11px] text-slate-600">
        설정
      </button>
    </aside>
  );
};

const SearchFab: React.FC = () => {
  return (
    <button className="fixed left-4 bottom-6 flex items-center gap-2 px-3 py-2 rounded-full border border-slate-200 bg-white shadow-sm text-xs text-slate-600">
      <span className="w-5 h-5 rounded-full border border-slate-300 flex items-center justify-center text-[11px]">
        🔍
      </span>
      검색
    </button>
  );
};

const WorkflowBoard: React.FC = () => {
  const [cardStates, setCardStates] = useState<Record<string, CardState>>({});

  // 초기 카운트 설정
  useEffect(() => {
    const initialStates: Record<string, CardState> = {};
    stages.forEach((stage) => {
      stage.actions.forEach((card) => {
        const cardKey = `${stage.id}-${card.id}`;
        initialStates[cardKey] = {
          count: card.applicants ?? 0,
          animatingCount: card.applicants ?? 0,
          isAnimating: false,
          animationType: null,
        };
      });
    });
    setCardStates(initialStates);
  }, []);

  // 5초 후 애니메이션 시작
  useEffect(() => {
    const timer = setTimeout(() => {
      startCountAnimation();
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const startCountAnimation = () => {
    const inputKey = 'ability-test-result-input';
    const confirmKey = 'ability-test-result-confirm';

    // setCardStates 콜백으로 최신 상태 가져오기
    setCardStates((prev) => {
      // 현재 입력 카드의 카운트 가져오기
      const currentInputCount = prev[inputKey]?.count ?? 6;
      const startValueInput = currentInputCount;
      const endValueInput = 0;
      const endValueConfirm = currentInputCount;

      // 애니메이션 시작 표시
      const newStates = {
        ...prev,
        [inputKey]: { ...prev[inputKey], isAnimating: true, animationType: 'decrease' as const },
        [confirmKey]: { ...prev[confirmKey], isAnimating: true, animationType: 'increase' as const },
      };

      // 애니메이션 시작
      startAnimation(inputKey, confirmKey, startValueInput, endValueInput, endValueConfirm);
      
      return newStates;
    });
  };

  const startAnimation = (inputKey: string, confirmKey: string, startValueInput: number, endValueInput: number, endValueConfirm: number) => {
    // 카지노 롤링 애니메이션 (빠른 숫자 변경)
    let frame = 0;
    const totalFrames = 60; // 1초 동안 애니메이션

    const animate = () => {
      frame++;
      const progress = frame / totalFrames;

      if (frame <= totalFrames) {
        // 빠칭코 스타일: 랜덤하게 튀는 숫자
        const randomInput = Math.floor(Math.random() * (startValueInput + 1));
        const randomConfirm = Math.floor(Math.random() * (endValueConfirm + 1));

        // 진행도에 따라 점점 목표값에 가까워지도록
        const currentInput = Math.round(startValueInput - startValueInput * progress + randomInput * (1 - progress));
        const currentConfirm = Math.round(endValueConfirm * progress + randomConfirm * (1 - progress));

        setCardStates((prev) => ({
          ...prev,
          [inputKey]: { ...prev[inputKey], animatingCount: Math.max(0, currentInput) },
          [confirmKey]: { ...prev[confirmKey], animatingCount: Math.min(endValueConfirm, currentConfirm) },
        }));

        requestAnimationFrame(animate);
      } else {
        // 애니메이션 종료 - 최종값 설정
        setCardStates((prev) => ({
          ...prev,
          [inputKey]: {
            count: endValueInput,
            animatingCount: endValueInput,
            isAnimating: false,
            animationType: null,
          },
          [confirmKey]: {
            count: endValueConfirm,
            animatingCount: endValueConfirm,
            isAnimating: false,
            animationType: null,
          },
        }));
      }
    };

    requestAnimationFrame(animate);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <TopNav />
      <SideNav />
      <SearchFab />

      <main className="pt-6 pb-10">
        <div className="px-8 overflow-x-auto">
          <div className="flex gap-8 pb-6">
            {stages.map((stage, index) => (
              <React.Fragment key={stage.id}>
                {index > 0 && (
                  <div className="flex items-start pt-14">
                    {/* connector line between nodes */}
                    <div className="w-20 flex items-center">
                      <div className="h-0.5 w-full bg-slate-200" />
                      <div className="w-3 h-3 rounded-full border border-slate-200 bg-slate-50 -ml-1" />
                    </div>
                  </div>
                )}
                <StageColumn stage={stage} cardStates={cardStates} />
              </React.Fragment>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default WorkflowBoard;

