<template>
    <nav class="bg-dark">
        <div class="sidebar-sticky">
            <ul class="nav">
                <li class="nav-item flex-grow-1">
                    <router-link
                        class="nav-link d-flex flex-column align-items-center p-3"
                        to="products">
                        <i class="fas fa-box-open"></i>
                        <span>商品管理</span>
                    </router-link>
                </li>
                <li class="nav-item flex-grow-1">
                    <router-link
                        class="nav-link d-flex flex-column align-items-center p-3"
                        to="orders">
                        <i class="far fa-list-alt"></i>
                        <span>訂單管理</span>
                    </router-link>
                </li>
                <li class="nav-item flex-grow-1">
                    <router-link
                        class="nav-link d-flex flex-column align-items-center p-3"
                        to="coupons">
                        <i class="fas fa-ticket-alt"></i>
                        <span>優惠券管理</span>
                    </router-link>
                </li>
            </ul>
        </div>
    </nav>
</template>