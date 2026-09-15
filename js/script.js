const DATA={
  privacy:{title:'개인정보 처리 관련 법령을 확인합니다',badge:'관련도 높음',desc:'개인정보 수집·이용처럼 질문의 핵심이 명확한 경우 우선 확인할 법령과 공식 원문 경로를 정리합니다.',laws:[['개인정보 보호법','개인정보 처리와 보호에 관한 일반 기준 및 정보주체의 권리를 확인할 때 우선 살펴봅니다.','주요 법령'],['개인정보 보호법 시행령','법률에서 정한 사항의 구체적인 적용 기준과 절차를 함께 확인합니다.','세부 기준'],['국가법령정보센터','현행 조문, 시행일, 개정 이력을 공식 원문에서 최종 확인합니다.','공식 출처']],guard:'AI 요약만으로 결론내리지 않고 실제 적용 전 최신 조문과 사내 기준을 함께 확인하도록 안내합니다.'},
  network:{title:'온라인 서비스·정보보호 관련 쟁점을 좁힙니다',badge:'쟁점 확인',desc:'“온라인”, “플랫폼”, “정보보호”처럼 범위가 넓은 질문은 하나의 법률로 바로 단정하지 않고 관련 쟁점을 먼저 나눕니다.',laws:[['정보통신망 이용촉진 및 정보보호 등에 관한 법률','정보통신망 이용과 정보보호·이용자 보호와 관련된 쟁점을 확인할 때 검토합니다.','관련 후보'],['개인정보 보호법','질문에 개인정보 수집·이용·제공이 포함되면 개인정보 관련 기준도 함께 확인합니다.','함께 확인'],['국가법령정보센터','법령명과 조문내용을 기준으로 현행 규정과 시행 여부를 확인합니다.','공식 출처']],guard:'플랫폼이나 온라인 서비스 관련 질문은 사실관계에 따라 적용 법령이 달라질 수 있으므로 관련 후보와 확인 포인트를 함께 제공합니다.'},
  falseInfo:{title:'온라인 허위정보는 먼저 사실관계를 나눕니다',badge:'단정 금지',desc:'“허위정보”라는 단어만으로 특정 법률을 정답처럼 제시하지 않고 내용·피해·유통 방식·플랫폼 역할을 먼저 확인하는 흐름입니다.',laws:[['쟁점 분류','게시물의 내용, 피해 유형, 유통 경로와 당사자 관계를 먼저 구분합니다.','Step 01'],['관련 법령 후보','사실관계에 따라 온라인 서비스 관련 법령과 다른 법령의 적용 가능성을 함께 검토합니다.','Step 02'],['국가법령정보센터','최종적으로 관련 조문을 공식 원문에서 확인하고 필요하면 담당 법무 검토로 연결합니다.','Step 03']],guard:'법률 적용은 구체적인 사실관계에 따라 달라질 수 있으므로 자동으로 “이 법이 적용됩니다”라고 단정하지 않습니다.'},
  source:{title:'공식 법령 원문을 최종 확인 단계로 둡니다',badge:'Official source',desc:'요약이나 검색 결과의 마지막 단계에서 현행 법령의 원문과 시행 여부를 확인할 수 있도록 출처를 명확히 노출합니다.',laws:[['현행 법령 검색','법령명·본문·조문 내용 등을 기준으로 관련 규정을 탐색합니다.','Search'],['시행일·개정 확인','현재 시행 중인 내용인지, 개정 규정의 시행일은 언제인지 함께 확인합니다.','Verify'],['근거 표시','답변에 사용한 법령명과 확인 경로를 화면 안에 남겨 재검증하기 쉽게 만듭니다.','Evidence']],guard:'AI의 설명은 “정답”이 아니라 탐색을 돕는 중간 단계이며, 최종 판단은 공식 원문과 내부 기준을 기반으로 합니다.'},
  unknown:{title:'질문의 범위를 먼저 좁혀야 합니다',badge:'의도 확인',desc:'바로 연결되는 쟁점이 없을 때 임의로 법률을 추천하지 않고, 사용자가 질문의 범위를 선택하도록 안내합니다.',laws:[['개인정보','수집·이용·제공·보관 등 개인정보 처리와 관련된 질문인지 확인합니다.','Option'],['온라인 서비스','플랫폼, 정보보호, 이용자 보호 등 온라인 서비스 운영과 관련된 질문인지 확인합니다.','Option'],['공식 법령 원문','특정 법령의 현행 조문이나 개정 내용을 찾는 질문인지 확인합니다.','Option']],guard:'모르는 질문에 억지로 답을 생성하지 않고, 질문을 구체화한 뒤 다시 검색하도록 유도합니다.'}
};

function resolveKey(text){
  const q=(text||'').trim().toLowerCase();
  if(!q)return'unknown';
  if(q.includes('원문')||q.includes('국가법령')||q.includes('개정')||q.includes('시행일'))return'source';
  if(q.includes('허위')||q.includes('유포')||q.includes('플랫폼 책임'))return'falseInfo';
  if(q.includes('정보통신')||q.includes('정보보호')||q.includes('플랫폼'))return'network';
  if(q.includes('개인정보')||q.includes('개인 정보')||q.includes('수집')||q.includes('처리방침'))return'privacy';
  if(q.includes('온라인'))return'network';
  return'unknown';
}

function renderResult(key){
  const title=document.getElementById('resultTitle');
  if(!title)return;
  const d=DATA[key]||DATA.unknown;
  title.textContent=d.title;
  document.getElementById('resultDesc').textContent=d.desc;
  document.getElementById('resultBadge').textContent=d.badge;
  document.getElementById('guardText').textContent=d.guard;
  document.getElementById('lawStack').innerHTML=d.laws.map((item,i)=>`<article class="law-card"><div class="law-index">0${i+1}</div><div><strong>${item[0]}</strong><p>${item[1]}</p></div><span class="law-source">${item[2]}</span></article>`).join('');
}

function setActiveChip(query){
  document.querySelectorAll('.chip-btn').forEach(btn=>btn.classList.toggle('active',btn.dataset.query===query));
}

function runSearch(){
  const input=document.getElementById('query');
  if(!input)return;
  renderResult(resolveKey(input.value));
  document.querySelectorAll('.chip-btn').forEach(btn=>btn.classList.remove('active'));
}

document.getElementById('searchBtn')?.addEventListener('click',runSearch);
document.getElementById('query')?.addEventListener('keydown',e=>{if(e.key==='Enter')runSearch();});
document.querySelectorAll('.chip-btn').forEach(btn=>btn.addEventListener('click',()=>{
  const q=btn.dataset.query;
  document.getElementById('query').value=q;
  setActiveChip(q);
  renderResult(resolveKey(q));
}));
renderResult('privacy');

const menuToggle=document.querySelector('.menu-toggle');
const nav=document.querySelector('.nav-links');
menuToggle?.addEventListener('click',()=>{
  const open=nav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded',String(open));
});
nav?.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{
  nav.classList.remove('open');
  menuToggle?.setAttribute('aria-expanded','false');
}));

const sections=[...document.querySelectorAll('main section[id]')];
const navLinks=[...document.querySelectorAll('.nav-links a')];
const sectionObserver=new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      navLinks.forEach(link=>link.classList.toggle('active',link.getAttribute('href')===`#${entry.target.id}`));
    }
  });
},{rootMargin:'-35% 0px -55% 0px',threshold:0});
sections.forEach(section=>sectionObserver.observe(section));

const revealObserver=new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
},{threshold:.12});
document.querySelectorAll('.reveal').forEach(el=>revealObserver.observe(el));
