import{a as b,S as w,i as d}from"./assets/vendor-Z6SuAarM.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))u(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const c of o.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&u(c)}).observe(document,{childList:!0,subtree:!0});function s(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerPolicy&&(o.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?o.credentials="include":e.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function u(e){if(e.ep)return;e.ep=!0;const o=s(e);fetch(e.href,o)}})();const S="https://pixabay.com/api/",q="54320927-5ca4d41cc3ecb718a2e32b522";async function p(a,t){return(await b.get(S,{params:{key:q,q:a,image_type:"photo",orientation:"horizontal",safesearch:!0,page:t,per_page:15}})).data}const m=document.querySelector(".gallery"),l=document.querySelector(".loader"),f=document.querySelector(".load-more"),B=new w(".gallery a",{captionsData:"alt",captionDelay:250});let n=null;function y(a){const t=a.map(s=>`
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
    `).join("");m.insertAdjacentHTML("beforeend",t),B.refresh()}function $(){m.innerHTML=""}function h(a=400){n=setTimeout(()=>{l.textContent="Loading images, please wait...",l.classList.remove("hidden")},a)}function g(){n&&(clearTimeout(n),n=null),l.classList.add("hidden"),l.textContent=""}function x(){f.classList.remove("hidden")}function L(){f.classList.add("hidden")}const I=document.querySelector(".form"),M=document.querySelector(".load-more");let i="",r=1,v=0;I.addEventListener("submit",async a=>{if(a.preventDefault(),i=a.target.elements["search-text"].value.trim(),!!i){r=1,$(),L(),h();try{const t=await p(i,r);if(v=t.totalHits,t.hits.length===0){d.error({message:"Sorry, no images found."});return}y(t.hits),x()}catch{d.error({message:"Error fetching images."})}finally{g()}}});M.addEventListener("click",async()=>{r+=1,h();try{const a=await p(i,r);y(a.hits),r*15>=v&&(L(),d.info({message:"We're sorry, but you've reached the end of search results."}));const s=document.querySelector(".image-wrapper").getBoundingClientRect().height;window.scrollBy({top:s*2,behavior:"smooth"})}finally{g()}});
//# sourceMappingURL=index.js.map
