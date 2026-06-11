<template>
    <div style="margin-top: 90px">
        <section
            class="category-hero"
            :style="{ backgroundImage: `url(${require('@/assets/images/img-maintenance-bg.jpg')})` }">
            <div class="container h-100">
                <div class="row flex-column justify-content-end h-100">
                    <div class="text-right">
                        <h2 class="pr-3">飾品保養</h2>
                        <slot name="breadcrumb"></slot>
                    </div>
                </div>
            </div>
        </section>
        <section class="py-5">
            <div class="container mb-5">
                <div class="text-center mb-5">
                    <h3 class="h4">飾品保養小知識</h3>
                    <p class="text-gray-600">簡單步驟讓飾品保持完美狀態</p>
                </div>
                <div class="row">
                    <div class="col-md-3 d-flex flex-column justify-content-center">
                        <div class="d-flex flex-column align-items-center mb-3 mb-sm-0">
                            <h3 class="h4 order-2 order-sm-1">925 純銀飾品</h3>
                            <small class="order-1 order-sm-2 mb-2 mb-md-0">Silver Maintenance</small>
                        </div>
                    </div>
                    <div class="col-md-9">
                        <ul class="list-unstyled text-main01 mb-0">
                            <li>- 無配戴時，請先保持乾燥，再放入夾鏈袋保存，以避免發黑。</li>
                            <li>- 避免接觸水和酸性物質，例如：溫泉、香水、化妝品、洗髮精等。</li>
                            <li>- 輕微氧化可使用拭銀布擦拭（拭銀布含有銀的保養成分，請勿水洗後重複使用）。</li>
                            <li>- 嚴重氧化可浸泡洗銀水後擦拭乾淨（洗銀水具有腐蝕性，過度會造成銀飾容易泛黃）。</li>
                        </ul>
                    </div>
                </div>
                <hr>
                <div class="row">
                    <div class="col-md-3 d-flex flex-column justify-content-center">
                        <div class="d-flex flex-column align-items-center mb-3 mb-sm-0">
                            <h3 class="h4 order-2 order-sm-1">合金飾品</h3>
                            <small class="order-1 order-sm-2 mb-2 mb-md-0">Alloy Maintenance</small>
                        </div>
                    </div>
                    <div class="col-md-9">
                        <ul class="list-unstyled text-main01 mb-0">
                            <li>- 應保持乾燥，避免飾品存放在溫泉、游泳池等溼度高的環境下。</li>
                            <li>- 避免接觸到含有化學添加物的產品，例如：防曬乳、香水、噴霧劑、清潔劑等。</li>
                            <li>- 銀飾專用拭銀布因含有銀飾保養成分，請勿用來擦拭合金飾品，以免加速褪色。</li>
                            <li>- 因材質、軟硬度不同，避免將多個飾品混合存放，造成碰撞導致表面刮傷及氧化。</li>
                        </ul>
                    </div>
                </div>
                <hr>
                <div class="row">
                    <div class="col-md-3 d-flex flex-column justify-content-center">
                        <div class="d-flex flex-column align-items-center mb-3 mb-sm-0">
                            <h3 class="h4 order-2 order-sm-1">鋼飾品</h3>
                            <small class="order-1 order-sm-2 mb-2 mb-md-0">Stainless Steel</small>
                        </div>
                    </div>
                    <div class="col-md-9">
                        <ul class="list-unstyled text-main01 mb-0">
                            <li>- 鋼飾品是不易變形，不會氧化，能抵抗腐蝕也不易對皮膚造成過敏的材質。</li>
                            <li>- 若表面有髒汙，可使用溫水清洗，再用柔軟棉質布或麂皮布擦拭乾淨即可。</li>
                            <li>- 醫療鋼針因搭配的是銅＋電鍍的墜飾，僅耳針是屬於低敏的部分。</li>
                            <li>- 為減緩電鍍褪色程度，避免接觸任何化學成分物質，例如：香水、清潔劑、特殊色洗髮精等，若擔心褪色的狀況建議挑選原色為主。</li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>
