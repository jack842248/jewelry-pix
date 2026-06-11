<template>
    <div style="margin-top: 90px">
        <section
            class="category-hero"
            style="background-image: url('/static/images/img-shopping-guide.jpg');">
            <div class="container h-100">
                <div class="row flex-column justify-content-end h-100">
                    <div class="text-right">
                        <h2 class="pr-3">購物須知</h2>
                        <slot name="breadcrumb"></slot>
                    </div>
                </div>
            </div>
        </section>
        <section class="py-5">
            <div class="container">
                <div class="mb-5">
                    <h3 class="mb-3">賣場資訊</h3>
                    <p>🚛 出貨資訊：全館現貨・台灣出貨</p>
                    <p>⏰ 營業時間：平日 09:00～21:00</p>
                    <p>下單後 48 小時內寄出（不含例假日）</p>
                    <p>⚠️ 若商品有瑕疵請勿直接確認收貨，請先透過聊聊聯繫我們</p>
                    <p>👉 本賣場不提供拆售、改耳環或客製化服務</p>
                </div>
                <hr>
                <div class="mb-5">
                    <h3 class="mb-3">售後服務</h3>
                    <p>JEWELRY PIX 提供只退不換「 7天鑑賞期退貨服務」，以保障買家權益並維持商品品質。</p>
                    <p class="text-main01">以下情況屬於非瑕疵範圍：</p>
                    <ol class="text-main01 mb-4">
                        <li class="mb-2">鍍銀耳針較細，運送過程可能產生輕微彎曲，屬正常現象，可自行輕微調整。</li>
                        <li class="mb-2">耳針表面略帶暗色為焊接保護處理，非瑕疵問題。</li>
                        <li class="mb-2">商品因螢幕顯示差異，可能存在些微色差，請以實品為準。</li>
                        <li class="mb-2">尺寸為人工測量，誤差 ±0.5cm 屬正常範圍。</li>
                        <li class="mb-2">手工製作商品可能有接縫、溢膠或鑲嵌不完全平整等狀況。</li>
                    </ol>
                    <p>若商品有瑕疵，請於收到後 7 天鑑賞期內提出退貨申請。
                        <br>並依照超商退貨流程寄回商品，待確認後將進行退款處理。
                        <br>退貨商品須保持完整包裝（含耳扣、耳墊等配件）。
                        <br>※ 7天鑑賞期非試用期
                    </p>
                </div>
            </div>
        </section>
    </div>
</template>
