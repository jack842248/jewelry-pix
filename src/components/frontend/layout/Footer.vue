<template>
    <footer class="bg-black">
        <div class="container"> 
            <div class="row">
                <div class="col-6 col-md-3 py-5 footer-area">
                    <div class="text-left">
                        <h5 class="h6 text-gray-500">聯絡我們</h5>
                        <ul class="nav flex-column small text-gray-600 list-unstyled">
                            <li class="nav-item">
                                <span class="nav-link pl-0 text-gray-600">JEWELRY PIX ｜ 豬寶盒飾品專賣</span>
                            </li>
                            <li class="nav-item">
                                <span class="nav-link pl-0 text-gray-600">Phone:0987-654-321</span>
                            </li>
                            <li class="nav-item">
                                <span class="nav-link pl-0 text-gray-600">Email:service@jewelry-pix.com</span>
                            </li>
                            <li class="nav-item">
                                <span class="nav-link pl-0 text-gray-600">官方Line: @111pfeca</span>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="col-6 col-md-3 py-5 footer-area">
                    <div class="text-left">
                        <h5 class="h6 text-gray-500">我的帳號</h5>
                        <ul class="nav flex-column small text-gray-600 list-unstyled">
                            <li class="nav-item">
                                <router-link
                                    to="/login"
                                    class="nav-link pl-0 text-gray-600">
                                    會員登入
                                </router-link>
                            </li>
                            <li class="nav-item">
                                <router-link
                                    to="/carts"
                                    class="nav-link pl-0 text-gray-600">
                                    購物車清單
                                </router-link>
                            </li>
                            <li class="nav-item">
                                <router-link
                                    to="/privacy"
                                    class="nav-link pl-0 text-gray-600">
                                    隱私權條款
                                </router-link>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="col-6 col-md-3 py-5 footer-area">
                    <div class="text-left">
                        <h5 class="h6 text-gray-500">站內連結</h5>
                        <ul class="nav flex-column small text-gray-600 list-unstyled">
                            <li class="nav-item">
                                <router-link
                                    to="/store"
                                    class="nav-link pl-0 text-gray-600">
                                    選購商品
                                </router-link>
                            </li>
                            <li class="nav-item">
                                <router-link
                                    to="/shopping-guide"
                                    class="nav-link pl-0 text-gray-600">
                                    購物須知
                                </router-link>
                            </li>
                            <li class="nav-item">
                                <router-link
                                    to="/jewelry-care"
                                    class="nav-link pl-0 text-gray-600">
                                    飾品保養
                                </router-link>
                            </li>
                            <li class="nav-item">
                                <router-link
                                    to="/about"
                                    class="nav-link pl-0 text-gray-600">
                                    關於我們
                                </router-link>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="col-6 col-md-3 py-5 footer-area">
                    <div class="text-left">
                        <h5 class="h6 text-gray-500">結帳資訊</h5>
                        <ul class="nav flex-column small text-gray-600 list-unstyled">
                            <li>
                                <span class="nav-link pl-0 text-gray-600">慶開幕全館商品滿299免運</span>
                            </li>
                            <li>
                                <img class="img-fluid" src="/static/images/img-payment-option.png" alt="">
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <div class="container">
            <div class="text-center border-top">
                <p class="small text-gray-600 py-3">Copyright © 2026 - 豬寶盒飾品專賣 Jewelry Pix All Rights Reserved.</p>
            </div>
        </div>
    </footer>
</template>