import{a as w,S,i as o}from"./assets/vendor-Z6SuAarM.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))i(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const f of r.addedNodes)f.tagName==="LINK"&&f.rel==="modulepreload"&&i(f)}).observe(document,{childList:!0,subtree:!0});function s(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(e){if(e.ep)return;e.ep=!0;const r=s(e);fetch(e.href,r)}})();const q="https://pixabay.com/api/",E="54320927-5ca4d41cc3ecb718a2e32b522";async function m(a,t){return(await w.get(q,{params:{key:E,q:a,image_type:"photo",orientation:"horizontal",safesearch:!0,page:t,per_page:15}})).data}const p=document.querySelector(".gallery"),u=document.querySelector(".loader"),h=document.querySelector(".load-more"),B=new S(".gallery a",{captionsData:"alt",captionDelay:250});let c=null;function y(a){const t=a.map(s=>`
      <li class="image-wrapper">
        <a href="${s.largeImageURL}">
          <img src="${s.webformatURL}" alt="${s.tags}" />
        </a>

        <div class="stats-panel">
          <div class="stat">
            <span class="stat-title">Likes</span>
            <span class="stat-number">${s.likes}</span>
          </div>
          <div class="stat">
            <span class="stat-title">Views</span>
            <span class="stat-number">${s.views}</span>
          </div>
          <div class="stat">
            <span class="stat-title">Comments</span>
            <span class="stat-number">${s.comments}</span>
          </div>
          <div class="stat">
            <span class="stat-title">Downloads</span>
            <span class="stat-number">${s.downloads}</span>
          </div>
        </div>
      </li>
    `).join("");p.insertAdjacentHTML("beforeend",t),B.refresh()}function $(){p.innerHTML=""}function g(a=400){c=setTimeout(()=>{u.textContent="Loading images, please wait...",u.classList.remove("hidden")},a)}function L(){c&&(clearTimeout(c),c=null),u.classList.add("hidden"),u.textContent=""}function v(){h.classList.remove("hidden")}function b(){h.classList.add("hidden")}const x=document.querySelector(".form"),I=document.querySelector(".load-more"),M=15;let l="",n=1,d=0;x.addEventListener("submit",async a=>{if(a.preventDefault(),l=a.target.elements["search-text"].value.trim(),!!l){n=1,d=0,$(),b(),g();try{const t=await m(l,n);if(d=t.totalHits,t.hits.length===0){o.error({message:"Sorry, no images found."});return}y(t.hits),t.hits.length<d?v():o.info({message:"We're sorry, but you've reached the end of search results."})}catch{o.error({message:"Error fetching images."})}finally{L()}}});I.addEventListener("click",async()=>{n+=1,b(),g();try{const a=await m(l,n);if(a.hits.length===0)return;y(a.hits),n*M<d?v():o.info({message:"We're sorry, but you've reached the end of search results."});const s=document.querySelector(".image-wrapper");if(s){const{height:i}=s.getBoundingClientRect();window.scrollBy({top:i*2,behavior:"smooth"})}}catch{o.error({message:"Error fetching images."})}finally{L()}});
//# sourceMappingURL=index.js.map
