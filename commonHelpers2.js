import"./assets/modulepreload-polyfill-3cfb730f.js";/* empty css                      */import{i as r}from"./assets/vendor-77e16229.js";const l=document.querySelector(".form");l.addEventListener("submit",s=>{s.preventDefault();const i=document.querySelector("input[name='delay']"),o=document.querySelector("input[name='state']:checked"),e=parseInt(i.value,10);new Promise((t,n)=>{o.value==="fulfilled"?setTimeout(()=>{t(e)},e):o.value==="rejected"&&setTimeout(()=>{n(e)},e)}).then(t=>{r.success({title:"OK",message:`Fulfilled promise in ${t}ms`,position:"topCenter"})}).catch(t=>{r.error({title:"Error",message:"Illegal operation",position:"topCenter"})})});
//# sourceMappingURL=commonHelpers2.js.map
