const exercises = [
{id:'knee-extension',name:'座って膝伸ばし',category:'太もも前の筋力',side:true,purpose:'太ももの前を鍛え、膝を支える力をつけます。',how:'安定した椅子に座り、片方の膝をゆっくり伸ばします。ゆっくり元に戻し、反対の脚も行います。',care:'上体を反らさず、痛みのない範囲で伸ばしましょう。勢いをつけないようにします。'},
{id:'straight-leg-raise',name:'膝を伸ばして脚上げ',category:'太もも前の筋力',side:true,purpose:'膝を大きく曲げずに、太ももの前の筋肉を鍛えます。',how:'仰向けで片膝を立て、もう一方の膝を伸ばします。伸ばした脚を床から20cmほど上げ、ゆっくり下ろします。',care:'膝を伸ばしたまま行います。腰が反る・腰が痛む場合は中止してください。左右行います。'},
{id:'sit-to-stand',name:'椅子からの立ち座り',category:'立ち上がる力',side:false,purpose:'太もも・お尻を鍛え、椅子から立ち上がる動作を助けます。',how:'足を腰幅にして椅子に座ります。体を少し前に傾けて立ち、ゆっくりお尻を下ろして座ります。',care:'椅子は壁につけて固定。膝とつま先の向きをそろえます。必要なら肘掛けや手で支えます。'},
{id:'hip-abduction',name:'立って脚を横に開く',category:'お尻の横の筋力',side:true,purpose:'お尻の横を鍛え、立つ・歩くときの体の安定を助けます。',how:'安定した椅子の背や手すりにつかまります。つま先を前に向け、片脚を少し横に開いて戻します。左右行います。',care:'体を横に傾けず、脚を大きく開きすぎないようにします。支えを使って転倒を防ぎます。'},
{id:'heel-raise',name:'支えを使ってかかと上げ',category:'ふくらはぎの筋力',side:false,purpose:'ふくらはぎを鍛え、歩くときに地面を蹴る力をつけます。',how:'安定した椅子の背や手すりを両手で持ちます。両足のかかとをゆっくり上げ、ゆっくり下ろします。',care:'片足立ちにはせず、両足で行います。支えを使い、体が前に倒れないようにします。'}
];
const selected = new Map();
const $ = s=>document.querySelector(s);
function toast(message){$('#toast').textContent=message;$('#toast').classList.add('show');clearTimeout(window.toastTimer);window.toastTimer=setTimeout(()=>$('#toast').classList.remove('show'),3200)}
function render(){
$('#exercise-grid').innerHTML=exercises.map((e,i)=>`<article class="exercise-card ${selected.has(e.id)?'chosen':''}"><div class="image-wrap"><span class="exercise-no">0${i+1}</span><img src="assets/${e.id}.png" alt="${e.name}の動作イラスト"></div><div class="card-body"><span class="tag">${e.category}</span><h3>${e.name}</h3><p>${e.purpose}</p><details><summary>やり方・気をつけること</summary><p>${e.how}</p><p class="caution">${e.care}</p></details><button data-toggle="${e.id}" class="add-button ${selected.has(e.id)?'added':''}" aria-pressed="${selected.has(e.id)}">${selected.has(e.id)?'✓　選択済み':'＋　シートに追加'}</button></div></article>`).join('');
$('#counter').textContent=`${selected.size} / 4`;
$('#empty-state').hidden=selected.size>0;
$('#selected-list').innerHTML=[...selected].map(([id,v],i)=>{const e=exercises.find(e=>e.id===id);return `<div class="selected-item"><div class="selected-title"><span>${String(i+1).padStart(2,'0')}</span><strong>${e.name}</strong><button data-remove="${id}" class="remove" aria-label="${e.name}を削除">×</button></div><div class="dose"><label>${e.side?'左右各':'回数'}<input type="number" min="1" max="100" step="1" value="${v.reps}" data-id="${id}" data-field="reps" aria-label="${e.name}の回数"><span>回</span></label><b>×</b><label>セット数<input type="number" min="1" max="10" step="1" value="${v.sets}" data-id="${id}" data-field="sets" aria-label="${e.name}のセット数"><span>セット</span></label></div></div>`}).join('');
$('#preview-button').disabled=$('#print-button').disabled=selected.size===0;
}
function sheet(){return `<div class="sheet"><div class="sheet-heading"><small>あなたのペースで、無理なく続けましょう</small><h1>ひざの自主トレーニング</h1><p class="name-field">お名前 <span></span> 様</p></div><div class="sheet-grid">${[...selected].map(([id,v],i)=>{const e=exercises.find(e=>e.id===id);return `<article class="sheet-card"><h2><span>${i+1}</span>${e.name}</h2><img src="assets/${id}.png" alt="${e.name}"><div class="sheet-dose">${e.side?'左右各 ':''}<strong>${v.reps}</strong> 回 × <strong>${v.sets}</strong> セット</div><h3>運動の目的</h3><p>${e.purpose}</p><h3>やり方</h3><p>${e.how}</p><h3>気をつけること</h3><p>${e.care}</p></article>`}).join('')}</div><div class="sheet-advice"><strong>運動をするときのお約束</strong><p>息を止めず、ゆっくり行いましょう。強い痛みや腫れが出たら中止してください。痛みが翌日まで強く残る場合は回数を減らし、担当セラピストに相談しましょう。実施する曜日・頻度は担当者の指示に従ってください。</p></div><div class="sheet-footer">担当セラピストと確認した運動を行いましょう。<span>ひざの自主トレノート</span></div></div>`}
function validDose(){const inputs=[...document.querySelectorAll('#selected-list input')];const bad=inputs.find(i=>!i.checkValidity()||!i.value);if(bad){toast('回数は1〜100回、セット数は1〜10の整数で入力してください。');bad.reportValidity();bad.focus();return false}return true}
async function printSheet(){if(!selected.size||!validDose())return;$('#print-sheet').innerHTML=sheet();await Promise.all([...$('#print-sheet').querySelectorAll('img')].map(img=>img.decode().catch(()=>{})));window.print()}
document.addEventListener('click',event=>{const toggle=event.target.closest('[data-toggle]');if(toggle){const id=toggle.dataset.toggle;if(selected.has(id))selected.delete(id);else if(selected.size>=4){toast('選べる運動は最大4種目です。選択済みの運動を外してから追加してください。');return}else selected.set(id,{reps:10,sets:1});render()}const remove=event.target.closest('[data-remove]');if(remove){selected.delete(remove.dataset.remove);render()}if(event.target.closest('.close'))event.target.closest('dialog').close()});
$('#selected-list').addEventListener('input',event=>{const i=event.target;if(!i.matches('input'))return;if(i.checkValidity()&&i.value)selected.get(i.dataset.id)[i.dataset.field]=Number(i.value)});
$('#evidence-button').onclick=()=>$('#evidence').showModal();
$('#preview-button').onclick=()=>{if(!validDose())return;$('#preview-content').innerHTML=sheet();$('#preview').showModal()};
$('#print-button').onclick=$('#modal-print').onclick=printSheet;
render();
