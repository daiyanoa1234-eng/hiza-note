const exercises = [
{id:'knee-extension',name:'座って膝伸ばし',category:'太もも前の筋力',side:true,purpose:'太ももの前を鍛え、膝を支える力をつけます。',how:'安定した椅子に座り、片方の膝をゆっくり伸ばします。ゆっくり元に戻し、反対の脚も行います。',care:'上体を反らさず、痛みのない範囲で伸ばしましょう。勢いをつけないようにします。'},
{id:'straight-leg-raise',name:'膝を伸ばして脚上げ',category:'太もも前の筋力',side:true,purpose:'膝を大きく曲げずに、太ももの前の筋肉を鍛えます。',how:'仰向けで片膝を立て、もう一方の膝を伸ばします。伸ばした脚を床から20cmほど上げ、ゆっくり下ろします。',care:'膝を伸ばしたまま行います。腰が反る・腰が痛む場合は中止してください。左右行います。'},
{id:'sit-to-stand',name:'椅子からの立ち座り',category:'立ち上がる力',side:false,purpose:'太もも・お尻を鍛え、椅子から立ち上がる動作を助けます。',how:'足を腰幅にして椅子に座ります。体を少し前に傾けて立ち、ゆっくりお尻を下ろして座ります。',care:'椅子は壁につけて固定。膝とつま先の向きをそろえます。必要なら肘掛けや手で支えます。'},
{id:'hip-abduction',name:'立って脚を横に開く',category:'お尻の横の筋力',side:true,purpose:'お尻の横を鍛え、立つ・歩くときの体の安定を助けます。',how:'安定した椅子の背や手すりにつかまります。つま先を前に向け、片脚を少し横に開いて戻します。左右行います。',care:'体を横に傾けず、脚を大きく開きすぎないようにします。支えを使って転倒を防ぎます。'},
{id:'heel-raise',name:'支えを使ってかかと上げ',category:'ふくらはぎの筋力',side:false,purpose:'ふくらはぎを鍛え、歩くときに地面を蹴る力をつけます。',how:'安定した椅子の背や手すりを両手で持ちます。両足のかかとをゆっくり上げ、ゆっくり下ろします。',care:'片足立ちにはせず、両足で行います。支えを使い、体が前に倒れないようにします。'}
];
const selected = new Map();
const $ = selector => document.querySelector(selector);
let currentFilter = 'all';
let mode = 'select';
const groups = {'knee-extension':'thigh','straight-leg-raise':'thigh','sit-to-stand':'thigh','hip-abduction':'hip','heel-raise':'calf'};
const positions = {'knee-extension':'座って行う','straight-leg-raise':'仰向けで行う','sit-to-stand':'椅子を使う','hip-abduction':'立位（支えを使う）','heel-raise':'立位（支えを使う）'};
function toast(message){$('#toast').textContent=message;$('#toast').classList.add('show');clearTimeout(window.toastTimer);window.toastTimer=setTimeout(()=>$('#toast').classList.remove('show'),3200)}
function renderCards(){
 const query=$('#search').value.trim().normalize('NFKC');
 const visible=exercises.filter(e=>(currentFilter==='all'||groups[e.id]===currentFilter)&&(!query||(e.name+e.category+positions[e.id]).normalize('NFKC').includes(query)));
 $('#result-count').textContent=`${visible.length}種の運動`;
 $('#no-results').hidden=visible.length>0;
 $('#exercise-grid').innerHTML=visible.map(e=>`<article class="exercise-card ${selected.has(e.id)?'chosen':''}"><button class="card-select" data-toggle="${e.id}" aria-label="${e.name}${selected.has(e.id)?'を選択解除':'を追加'}" aria-pressed="${selected.has(e.id)}"><span class="card-category">${e.category}</span><span class="card-check" aria-hidden="true">${selected.has(e.id)?'✓':'＋'}</span><img src="assets/${e.id}.png" alt="${e.name}の動作イラスト"><strong>${e.name}</strong><small>${positions[e.id]}</small></button><details><summary>やり方・注意点</summary><p><b>目的</b> ${e.purpose}</p><p>${e.how}</p><p>${e.care}</p></details></article>`).join('');
}
function renderSelected(){
 $('#selected-list').innerHTML=[...selected].map(([id,v],i)=>{const e=exercises.find(e=>e.id===id);return `<article class="selected-item"><img src="assets/${id}.png" alt=""><div class="selected-content"><div class="selected-title"><span>${i+1}</span><h3>${e.name}</h3><button data-remove="${id}" class="remove" aria-label="${e.name}を削除">×</button></div><div class="dose"><label>${e.side?'左右各の回数':'回数'}<span><input type="number" min="1" max="100" step="1" value="${v.reps}" data-id="${id}" data-field="reps" aria-label="${e.name}の回数"> 回</span></label><b>×</b><label>セット数<span><input type="number" min="1" max="10" step="1" value="${v.sets}" data-id="${id}" data-field="sets" aria-label="${e.name}のセット数"> セット</span></label></div></div></article>`}).join('');
 $('#empty-adjustment').hidden=selected.size>0;
}
function syncControls(){
 $('#counter').textContent=selected.size;
 $('#next-button').disabled=selected.size===0;
 const valid=[...document.querySelectorAll('#selected-list input')].every(i=>i.checkValidity()&&i.value);
 $('#print-button').disabled=$('#preview-button').disabled=$('#modal-print').disabled=selected.size===0||!valid;
 $('#action-message').textContent=mode==='select'?(selected.size?`${selected.size}種目を選択中`:'運動を最大4つ選びましょう'):'仕上がりを確認して、患者さんへ';
 $('#action-detail').textContent=mode==='select'?'イラスト・目的・注意点付きのシートを作成します。':'氏名は印刷後に手書きできます。入力内容は保存されません。';
}
function render(){renderCards();renderSelected();syncControls();updatePreview()}
function setMode(next){
 mode=next;$('#library').hidden=next!=='select';$('#adjustment').hidden=next!=='adjust';$('#next-button').hidden=next!=='select';$('#print-button').hidden=next!=='adjust';
 $('#step-select').classList.toggle('active',next==='select');$('#step-select').classList.toggle('complete',next==='adjust');$('#step-adjust').classList.toggle('active',next==='adjust');
 $('#step-select').removeAttribute('aria-current');$('#step-adjust').removeAttribute('aria-current');$(next==='select'?'#step-select':'#step-adjust').setAttribute('aria-current','step');syncControls();window.scrollTo({top:0,behavior:'smooth'});
}
function emptySheet(){return `<div class="sheet empty-sheet"><div class="sheet-heading"><small>無理のない範囲で、ひとつずつ続けましょう。</small><h1>わたしの自主トレ</h1><p class="name-field">お名前 <span></span> 様</p></div><div class="empty-paper"><span>▤</span><strong>あなたの選んだ運動が<br>ここに並びます</strong><p>左の一覧から、運動を選んでください。</p></div></div>`}
function fitPreview(){const container=$('#live-preview');const paper=container.querySelector('.sheet');if(!paper)return;const scale=container.clientWidth/paper.offsetWidth;paper.style.transform=`scale(${scale})`;container.style.height=`${paper.offsetHeight*scale}px`}
function updatePreview(){ $('#live-preview').innerHTML=selected.size?sheet():emptySheet();requestAnimationFrame(fitPreview) }
function sheet(){return `<div class="sheet"><div class="sheet-heading"><small>あなたのペースで、無理なく続けましょう</small><h1>わたしの自主トレ</h1><p class="name-field">お名前 <span></span> 様</p></div><div class="sheet-grid">${[...selected].map(([id,v],i)=>{const e=exercises.find(e=>e.id===id);return `<article class="sheet-card"><h2><span>${i+1}</span>${e.name}</h2><img src="assets/${id}.png" alt="${e.name}"><div class="sheet-dose">${e.side?'左右各 ':''}<strong>${v.reps}</strong> 回 × <strong>${v.sets}</strong> セット</div><h3>運動の目的</h3><p>${e.purpose}</p><h3>やり方</h3><p>${e.how}</p><h3>気をつけること</h3><p>${e.care}</p></article>`}).join('')}</div><div class="sheet-advice"><strong>運動をするときのお約束</strong><p>息を止めず、ゆっくり行いましょう。強い痛みや腫れが出たら中止してください。痛みが翌日まで強く残る場合は回数を減らし、担当セラピストに相談しましょう。実施する曜日・頻度は担当者の指示に従ってください。</p></div><div class="sheet-footer">担当セラピストと確認した運動を行いましょう。<span>ひざの自主トレノート</span></div></div>`}

function validDose(){const bad=[...document.querySelectorAll('#selected-list input')].find(i=>!i.checkValidity()||!i.value);if(bad){toast('回数は1〜100回、セット数は1〜10の整数で入力してください。');setMode('adjust');bad.reportValidity();bad.focus();return false}return true}
async function printSheet(){if(!selected.size||!validDose())return;$('#print-sheet').innerHTML=sheet();await Promise.all([...$('#print-sheet').querySelectorAll('img')].map(img=>img.decode().catch(()=>{})));window.print()}
document.addEventListener('click',event=>{
 const toggle=event.target.closest('[data-toggle]');
 if(toggle){const id=toggle.dataset.toggle;if(selected.has(id))selected.delete(id);else if(selected.size>=4){toast('選べる運動は最大4種目です。選択済みの運動を外してから追加してください。');return}else selected.set(id,{reps:10,sets:1});render()}
 const remove=event.target.closest('[data-remove]');if(remove){selected.delete(remove.dataset.remove);render()}
 const filter=event.target.closest('[data-filter]');if(filter){currentFilter=filter.dataset.filter;document.querySelectorAll('[data-filter]').forEach(b=>{b.classList.toggle('active',b===filter);b.setAttribute('aria-pressed',String(b===filter))});renderCards()}
 if(event.target.closest('.close'))event.target.closest('dialog').close();
});
$('#search').addEventListener('input',renderCards);
$('#selected-list').addEventListener('input',event=>{const i=event.target;if(!i.matches('input'))return;if(i.checkValidity()&&i.value){selected.get(i.dataset.id)[i.dataset.field]=Number(i.value);i.removeAttribute('aria-invalid');updatePreview()}else i.setAttribute('aria-invalid','true');syncControls()});
$('#evidence-button').onclick=()=>$('#evidence').showModal();
$('#next-button').onclick=()=>setMode('adjust');$('#back-button').onclick=()=>setMode('select');
$('#preview-button').onclick=()=>{if(!validDose())return;$('#preview-content').innerHTML=sheet();$('#preview').showModal()};
$('#print-button').onclick=$('#modal-print').onclick=printSheet;
new ResizeObserver(fitPreview).observe($('#live-preview'));
render();
