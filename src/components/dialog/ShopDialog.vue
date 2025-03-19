<template>
    <div v-if="isVisible" class="dialog-overlay" @click.self="close">
        <div class="dialog-content">
            <div class="dialog-header">
                <div class="logo-area">
                    <p class="logo-font">FLOW</p>
                    <p>충전하기</p>
                </div>
                <div class="btn-area">
                    <button @click="close()">
                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px"
                            fill="#434343">
                            <path
                                d="M256-192.35 192.35-256l224-224-224-224L256-767.65l224 224 224-224L767.65-704l-224 224 224 224L704-192.35l-224-224-224 224Z" />
                        </svg>
                    </button>
                </div>
            </div>
            <div class="content">
                <div class="quantity-area">
                    <div class="stock-area">
                        <p>
                            <span>
                                보유 하트:
                            </span>000 하트
                        </p>
                    </div>
                    <router-link to="" class="gradient-font">이용내역</router-link>
                </div>
                <div class="card-area">
                    <button class="card" v-for="(item, index) in 7" :key="index">
                        <div class="title-area">
                            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px"
                                fill="#434343">
                                <path
                                    d="m479.76-109-63.5-57.02Q314.3-257.74 247.71-324.46q-66.6-66.71-105.72-119.81-39.12-53.1-54.74-97.82Q71.63-586.8 71.63-634q0-97.58 65.33-162.97 65.33-65.4 162.8-65.4 51.75 0 98.51 21.04 46.77 21.05 81.49 59.85 34.72-38.8 81.49-59.85 46.77-21.04 98.51-21.04 97.68 0 163.14 65.4 65.47 65.39 65.47 162.97 0 46.96-15.5 91.67-15.5 44.72-54.74 97.7-39.24 52.98-105.96 119.81-66.71 66.84-168.91 158.8L479.76-109Zm0-122.59q95.52-86 157.16-146.9 61.65-60.9 97.29-106.04 35.64-45.14 49.4-80.08 13.76-34.94 13.76-69.38 0-59.05-39.28-98.22-39.29-39.16-98.21-39.16-46.16 0-85.68 26.5-39.53 26.5-54.53 67.5h-79.58q-14.89-41-54.59-67.5t-85.67-26.5q-58.7 0-97.83 39.16-39.13 39.17-39.13 98.21 0 34.7 13.87 69.9 13.86 35.2 49.52 80.31 35.65 45.12 97.06 105.9 61.4 60.78 156.44 146.3Zm.48-269.89Z" />
                            </svg>
                            <p class="desc">000하트 충전</p>
                            <p class="chip gradient-background">인기</p>
                        </div>
                        <div class="desc-area">
                            <p class="origin-price">0,000원</p>
                            <div>
                                <p class="sale-percent gradient-font"> 0%</p>
                                <p class="sale-price">0,000원</p>
                            </div>
                        </div>
                    </button>
                </div>
                <div class="info-area">
                    <p>결제 이용 시 안내</p>
                    <ul>
                        <li>하트는 FLOW의 유료서비스를 이용하기 위해 사용하는 재화의 단위입니다.</li>
                        <li>모든 상품은 부가가치세가 포함된 가격입니다.</li>
                        <li>환불 시 사용된 하트는 환불 금액에서 제외됩니다.</li>
                        <li>환불을 원할 경우, 이메일(innovape@naver.com)을 통하여 회원 본인임을 인증하는 절차를 거쳐서 고객센터에 접수해야 합니다.</li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
    modelValue: {
        type: Boolean,
        required: true
    }
});

const emit = defineEmits(['update:modelValue']);

const isVisible = ref(props.modelValue);

watch(() => props.modelValue, (newValue) => {
    isVisible.value = newValue;
});

const close = () => {
    isVisible.value = false;
    emit('update:modelValue', false);
};
</script>

<style scoped>
.dialog-overlay {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;

    >.dialog-content {
        background: white;
        border-radius: 8px;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        display: flex;
        flex-direction: column;
        width: 90%;
        max-width: 480px;
        height: 90%;
        max-height: 640px;

        >.dialog-header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 8px 16px;
            box-shadow: 0 0 4px rgba(0, 0, 0, 0.35);

            >.logo-area {
                display: flex;
                align-items: center;
                gap: 4px;

                >.logo-font {
                    font-size: 18px;
                    height: 20px;
                }
            }
        }

        >.content {
            padding: 0 24px;
            overflow-y: auto;

            >.quantity-area {
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding: 20px 0;

                >.stock-area {
                    span {
                        font-weight: 700;
                    }
                }

                >a {
                    font-weight: 700;
                    font-size: 14px;
                }
            }

            >.card-area {
                display: flex;
                flex-direction: column;
                gap: 12px;

                >.card {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    background-color: #efefef;
                    border-radius: 8px;
                    padding: 20px 24px;
                    width: 100%;
                    height: 64px;

                    >div.title-area {
                        display: flex;
                        align-items: center;
                        gap: 6px;
                        font-size: 16px;

                        >.chip {
                            border-radius: 100rem;
                            font-weight: 700;
                            padding: 3px 9px;
                            margin-left: 4px;
                            font-size: 12px;
                        }
                    }

                    >div.desc-area {
                        display: flex;
                        flex-direction: column;
                        align-items: end;

                        >p {
                            color: grey;
                            text-decoration: line-through;
                        }

                        >div {
                            display: flex;
                            align-items: center;
                            gap: 4px;

                            >p.sale-percent {
                                font-weight: 500;
                            }

                            >p.sale-price {
                                font-weight: 700;
                                font-size: 16px;
                            }
                        }

                        /* p.origin-price,
                        p.sale-percent {
                            display: none;
                        } */
                    }
                }
            }

            >.info-area {
                border-radius: 8px;
                background-color: #dfdfdf;
                margin-top: 28px;
                padding: 16px;
                margin-bottom: 20px;

                >p {
                    font-weight: 700;
                    font-size: 14px;
                }

                >ul {
                    margin-top: 8px;
                    font-size: 12px;
                    text-align: left;
                    padding-left: 16px;
                    word-break: keep-all;
                }
            }
        }
    }
}
</style>