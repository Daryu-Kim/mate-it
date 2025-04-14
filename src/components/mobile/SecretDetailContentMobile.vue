<template>
    <div class="content">
        <div class="title-area">
            <div class="text-area">
                <div>
                    <p class="title">{{ boardRefData.title }}</p>
                    <button
                        v-if="boardRefData.user_id === currentUserId"
                        @click="openSelectContextMenu"
                        class="post"
                        :value="
                            JSON.stringify({
                                post_id: boardRefData.post_id,
                                user_id: boardRefData.user_id,
                            })
                        "
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            height="16px"
                            viewBox="0 -960 960 960"
                            width="16px"
                            fill="#000000"
                        >
                            <path
                                d="M240-400q-33 0-56.5-23.5T160-480q0-33 23.5-56.5T240-560q33 0 56.5 23.5T320-480q0 33-23.5 56.5T240-400Zm240 0q-33 0-56.5-23.5T400-480q0-33 23.5-56.5T480-560q33 0 56.5 23.5T560-480q0 33-23.5 56.5T480-400Zm240 0q-33 0-56.5-23.5T640-480q0-33 23.5-56.5T720-560q33 0 56.5 23.5T800-480q0 33-23.5 56.5T720-400Z"
                            />
                        </svg>
                    </button>
                </div>
                <div>
                    <div>
                        <div class="male" v-if="userGender === 'male'">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                height="16px"
                                viewBox="0 -960 960 960"
                                width="16px"
                                fill="white"
                            >
                                <path
                                    d="M800-800v240h-80v-103L561-505q19 28 29 59.5t10 65.5q0 92-64 156t-156 64q-92 0-156-64t-64-156q0-92 64-156t156-64q33 0 65 9.5t59 29.5l159-159H560v-80h240ZM380-520q-58 0-99 41t-41 99q0 58 41 99t99 41q58 0 99-41t41-99q0-58-41-99t-99-41Z"
                                />
                            </svg>
                        </div>
                        <div class="female" v-else>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                height="16px"
                                viewBox="0 -960 960 960"
                                width="16px"
                                fill="white"
                            >
                                <path
                                    d="M440-120v-80h-80v-80h80v-84q-79-14-129.5-75.5T260-582q0-91 64.5-154.5T480-800q91 0 155.5 63.5T700-582q0 81-50.5 142.5T520-364v84h80v80h-80v80h-80Zm40-320q58 0 99-41t41-99q0-58-41-99t-99-41q-58 0-99 41t-41 99q0 58 41 99t99 41Z"
                                />
                            </svg>
                        </div>
                        <p>
                            {{
                                generateNickname(
                                    boardRefData.post_id,
                                    boardRefData.user_id
                                )
                            }}
                        </p>
                        <button
                            v-if="boardRefData.user_id !== currentUserId"
                            :value="
                                JSON.stringify({
                                    user_id: boardRefData.user_id,
                                })
                            "
                            @click="openFavContextMenu"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                height="18px"
                                viewBox="0 -960 960 960"
                                width="18px"
                                fill="#000000"
                            >
                                <defs>
                                    <linearGradient
                                        id="gradient1"
                                        x1="0%"
                                        y1="0%"
                                        x2="100%"
                                        y2="100%"
                                    >
                                        <stop
                                            offset="0%"
                                            style="
                                                stop-color: #2af598;
                                                stop-opacity: 1;
                                            "
                                        />
                                        <stop
                                            offset="100%"
                                            style="
                                                stop-color: #009efd;
                                                stop-opacity: 1;
                                            "
                                        />
                                    </linearGradient>
                                </defs>
                                <path
                                    :fill="'url(#gradient1)'"
                                    d="M480-440 160-640v400h360v80H160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h640q33 0 56.5 23.5T880-720v280h-80v-200L480-440Zm0-80 320-200H160l320 200ZM760-40l-56-56 63-64H600v-80h167l-64-64 57-56 160 160L760-40ZM160-640v440-240 3-283 80Z"
                                />
                            </svg>
                        </button>
                    </div>
                    <div>
                        <p>
                            {{ formatCategory(boardRefData.category) }} ·
                            {{ formatDate(boardRefData.created_at) }}
                        </p>
                    </div>
                </div>
            </div>
        </div>
        <div class="content-area">
            <p v-html="boardRefData.content"></p>
            <div class="like-area">
                <button @click="onClickLikeBtn()">
                    <div>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            height="24px"
                            viewBox="0 -960 960 960"
                            width="24px"
                            fill="#000000"
                        >
                            <defs>
                                <linearGradient
                                    id="gradient1"
                                    x1="0%"
                                    y1="0%"
                                    x2="100%"
                                    y2="100%"
                                >
                                    <stop
                                        offset="0%"
                                        style="
                                            stop-color: #2af598;
                                            stop-opacity: 1;
                                        "
                                    />
                                    <stop
                                        offset="100%"
                                        style="
                                            stop-color: #009efd;
                                            stop-opacity: 1;
                                        "
                                    />
                                </linearGradient>
                            </defs>
                            <path
                                :fill="isLiked ? 'url(#gradient1)' : '#000000'"
                                d="M720-120H280v-520l280-280 50 50q7 7 11.5 19t4.5 23v14l-44 174h258q32 0 56 24t24 56v80q0 7-2 15t-4 15L794-168q-9 20-30 34t-44 14Zm-360-80h360l120-280v-80H480l54-220-174 174v406Zm0-406v406-406Zm-80-34v80H160v360h120v80H80v-520h200Z"
                            />
                        </svg>
                    </div>
                    <p :class="isLiked ? 'gradient-font' : ''">
                        {{ formatNumber(likesCount) }}
                    </p>
                </button>
            </div>
        </div>
        <div class="comment-area" v-if="comments.length > 0">
            <div class="title-area">
                <p>총 댓글 수:</p>
                <p>{{ formatNumber(comments.length) }} 개</p>
            </div>
            <div class="content-area">
                <div v-for="(item, index) in comments" :key="index">
                    <div v-if="item.parent_comment_id === null">
                        <div class="parent-comment-area">
                            <div class="gender-area">
                                <div class="male" v-if="item.gender === 'male'">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        height="12px"
                                        viewBox="0 -960 960 960"
                                        width="12px"
                                        fill="white"
                                    >
                                        <path
                                            d="M800-800v240h-80v-103L561-505q19 28 29 59.5t10 65.5q0 92-64 156t-156 64q-92 0-156-64t-64-156q0-92 64-156t156-64q33 0 65 9.5t59 29.5l159-159H560v-80h240ZM380-520q-58 0-99 41t-41 99q0 58 41 99t99 41q58 0 99-41t41-99q0-58-41-99t-99-41Z"
                                        />
                                    </svg>
                                </div>
                                <div class="female" v-else>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        height="16px"
                                        viewBox="0 -960 960 960"
                                        width="16px"
                                        fill="white"
                                    >
                                        <path
                                            d="M440-120v-80h-80v-80h80v-84q-79-14-129.5-75.5T260-582q0-91 64.5-154.5T480-800q91 0 155.5 63.5T700-582q0 81-50.5 142.5T520-364v84h80v80h-80v80h-80Zm40-320q58 0 99-41t41-99q0-58-41-99t-99-41q-58 0-99 41t-41 99q0 58 41 99t99 41Z"
                                        />
                                    </svg>
                                </div>
                            </div>
                            <div class="info-area">
                                <div class="top-area">
                                    <div>
                                        <p>
                                            {{
                                                generateNickname(
                                                    item.post_id,
                                                    item.user_id
                                                )
                                            }}
                                        </p>
                                    </div>
                                    <div>
                                        <p>
                                            {{ formatDate(item.created_at) }}
                                        </p>
                                        <button
                                            class="comment"
                                            @click="openSelectContextMenu"
                                            :value="
                                                JSON.stringify({
                                                    comment_id: item.comment_id,
                                                    user_id: item.user_id,
                                                })
                                            "
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                height="16px"
                                                viewBox="0 -960 960 960"
                                                width="16px"
                                                fill="#000000"
                                            >
                                                <path
                                                    d="M240-400q-33 0-56.5-23.5T160-480q0-33 23.5-56.5T240-560q33 0 56.5 23.5T320-480q0 33-23.5 56.5T240-400Zm240 0q-33 0-56.5-23.5T400-480q0-33 23.5-56.5T480-560q33 0 56.5 23.5T560-480q0 33-23.5 56.5T480-400Zm240 0q-33 0-56.5-23.5T640-480q0-33 23.5-56.5T720-560q33 0 56.5 23.5T800-480q0 33-23.5 56.5T720-400Z"
                                                />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                                <div class="middle-area">
                                    <p>{{ item.content }}</p>
                                </div>
                                <div class="bottom-area">
                                    <button
                                        class="reply-btn"
                                        @click="
                                            onClickReplyBtn(
                                                item.comment_id,
                                                item.user_id
                                            )
                                        "
                                    >
                                        대댓글
                                    </button>
                                    <button
                                        class="fav-btn"
                                        v-if="item.user_id !== currentUserId"
                                        :value="
                                            JSON.stringify({
                                                user_id: item.user_id,
                                            })
                                        "
                                        @click="openFavContextMenu"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            height="18px"
                                            viewBox="0 -960 960 960"
                                            width="18px"
                                            fill="#000000"
                                        >
                                            <defs>
                                                <linearGradient
                                                    id="gradient1"
                                                    x1="0%"
                                                    y1="0%"
                                                    x2="100%"
                                                    y2="100%"
                                                >
                                                    <stop
                                                        offset="0%"
                                                        style="
                                                            stop-color: #2af598;
                                                            stop-opacity: 1;
                                                        "
                                                    />
                                                    <stop
                                                        offset="100%"
                                                        style="
                                                            stop-color: #009efd;
                                                            stop-opacity: 1;
                                                        "
                                                    />
                                                </linearGradient>
                                            </defs>
                                            <path
                                                :fill="'url(#gradient1)'"
                                                d="M480-440 160-640v400h360v80H160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h640q33 0 56.5 23.5T880-720v280h-80v-200L480-440Zm0-80 320-200H160l320 200ZM760-40l-56-56 63-64H600v-80h167l-64-64 57-56 160 160L760-40ZM160-640v440-240 3-283 80Z"
                                            />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div
                            class="child-comment-area"
                            v-for="(childItem, childIndex) in comments.filter(
                                (child) =>
                                    child.parent_comment_id === item.comment_id
                            )"
                            :key="childIndex"
                            style="margin-top: 8px"
                        >
                            <div>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    height="16px"
                                    viewBox="0 -960 960 960"
                                    width="16px"
                                    fill="#000000"
                                >
                                    <path
                                        d="m560-120-57-57 144-143H200v-480h80v400h367L503-544l56-57 241 241-240 240Z"
                                    />
                                </svg>
                                <div class="gender-area">
                                    <div
                                        class="male"
                                        v-if="childItem.gender === 'male'"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            height="12px"
                                            viewBox="0 -960 960 960"
                                            width="12px"
                                            fill="white"
                                        >
                                            <path
                                                d="M800-800v240h-80v-103L561-505q19 28 29 59.5t10 65.5q0 92-64 156t-156 64q-92 0-156-64t-64-156q0-92 64-156t156-64q33 0 65 9.5t59 29.5l159-159H560v-80h240ZM380-520q-58 0-99 41t-41 99q0 58 41 99t99 41q58 0 99-41t41-99q0-58-41-99t-99-41Z"
                                            />
                                        </svg>
                                    </div>
                                    <div class="female" v-else>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            height="16px"
                                            viewBox="0 -960 960 960"
                                            width="16px"
                                            fill="white"
                                        >
                                            <path
                                                d="M440-120v-80h-80v-80h80v-84q-79-14-129.5-75.5T260-582q0-91 64.5-154.5T480-800q91 0 155.5 63.5T700-582q0 81-50.5 142.5T520-364v84h80v80h-80v80h-80Zm40-320q58 0 99-41t41-99q0-58-41-99t-99-41q-58 0-99 41t-41 99q0 58 41 99t99 41Z"
                                            />
                                        </svg>
                                    </div>
                                </div>
                                <div class="info-area">
                                    <div class="top-area">
                                        <div>
                                            <p>
                                                {{
                                                    generateNickname(
                                                        childItem.post_id,
                                                        childItem.user_id
                                                    )
                                                }}
                                            </p>
                                        </div>
                                        <div>
                                            <p>
                                                {{
                                                    formatDate(
                                                        childItem.created_at
                                                    )
                                                }}
                                            </p>
                                            <button
                                                class="comment"
                                                @click="openSelectContextMenu"
                                                :value="
                                                    JSON.stringify({
                                                        comment_id:
                                                            childItem.comment_id,
                                                        user_id:
                                                            childItem.user_id,
                                                    })
                                                "
                                            >
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    height="16px"
                                                    viewBox="0 -960 960 960"
                                                    width="16px"
                                                    fill="#000000"
                                                >
                                                    <path
                                                        d="M240-400q-33 0-56.5-23.5T160-480q0-33 23.5-56.5T240-560q33 0 56.5 23.5T320-480q0 33-23.5 56.5T240-400Zm240 0q-33 0-56.5-23.5T400-480q0-33 23.5-56.5T480-560q33 0 56.5 23.5T560-480q0 33-23.5 56.5T480-400Zm240 0q-33 0-56.5-23.5T640-480q0-33 23.5-56.5T720-560q33 0 56.5 23.5T800-480q0 33-23.5 56.5T720-400Z"
                                                    />
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                    <div class="middle-area">
                                        <p>{{ childItem.content }}</p>
                                    </div>
                                    <div class="bottom-area">
                                        <button
                                            class="fav-btn"
                                            v-if="
                                                childItem.user_id !==
                                                currentUserId
                                            "
                                            :value="
                                                JSON.stringify({
                                                    user_id: childItem.user_id,
                                                })
                                            "
                                            @click="openFavContextMenu"
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                height="18px"
                                                viewBox="0 -960 960 960"
                                                width="18px"
                                                fill="#000000"
                                            >
                                                <defs>
                                                    <linearGradient
                                                        id="gradient1"
                                                        x1="0%"
                                                        y1="0%"
                                                        x2="100%"
                                                        y2="100%"
                                                    >
                                                        <stop
                                                            offset="0%"
                                                            style="
                                                                stop-color: #2af598;
                                                                stop-opacity: 1;
                                                            "
                                                        />
                                                        <stop
                                                            offset="100%"
                                                            style="
                                                                stop-color: #009efd;
                                                                stop-opacity: 1;
                                                            "
                                                        />
                                                    </linearGradient>
                                                </defs>
                                                <path
                                                    :fill="'url(#gradient1)'"
                                                    d="M480-440 160-640v400h360v80H160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h640q33 0 56.5 23.5T880-720v280h-80v-200L480-440Zm0-80 320-200H160l320 200ZM760-40l-56-56 63-64H600v-80h167l-64-64 57-56 160 160L760-40ZM160-640v440-240 3-283 80Z"
                                                />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <vue-bottom-sheet
            v-model="selectContextMenu"
            class="select-context-menu"
        >
            <button @click="openCheckContextMenu">
                {{
                    selectedProps && selectedProps.comment_id
                        ? "댓글"
                        : selectedProps && selectedProps.post_id
                        ? "게시물"
                        : ""
                }}
                삭제
            </button>
        </vue-bottom-sheet>
        <vue-bottom-sheet v-model="checkContextMenu" class="check-context-menu">
            <div class="title-area">
                <p class="title">경고</p>
            </div>
            <hr />
            <div class="content-area">
                <p>
                    정말로 작성하신
                    {{
                        selectedProps && selectedProps.comment_id
                            ? "댓글"
                            : selectedProps && selectedProps.post_id
                            ? "게시물"
                            : ""
                    }}을 삭제하시겠습니까?<br />포함되어 있던 모든 항목들이
                    삭제됩니다.
                </p>
                <button class="anyway" @click="onClickDeletePost">삭제</button>
                <button class="cancel" @click="closeCheckContextMenu">
                    취소
                </button>
            </div>
        </vue-bottom-sheet>
        <vue-bottom-sheet v-model="favContextMenu" class="check-context-menu">
            <div class="title-area">
                <p class="title">친구 요청하기</p>
            </div>
            <hr />
            <div class="content-area">
                <p>
                    {{
                        selectedProps &&
                        generateNickname(
                            boardRefData.post_id,
                            selectedProps.user_id
                        )
                    }}님에게 친구 요청하시겠습니까?<br />20 하트가 소모됩니다.
                </p>
                <button
                    class="request gradient-background"
                    @click="onClickSendFriend"
                >
                    요청
                </button>
                <button class="cancel" @click="closeFavContextMenu">
                    취소
                </button>
            </div>
        </vue-bottom-sheet>
    </div>
</template>

<style lang="scss" scoped>
.content {
    margin: 0 auto;
    margin-top: 60px;
    padding: 0 36px;
    padding-bottom: 96px;
    position: relative;

    > .title-area {
        padding: 48px 0 24px;
        text-align: left;
        display: flex;
        align-items: center;
        justify-content: space-between;

        > .text-area {
            width: 100%;

            > div {
                display: flex;
                align-items: center;
                justify-content: space-between;
                margin-top: 8px;
                width: 100%;

                > p.title {
                    font-size: 24px;
                    font-weight: 900;
                    word-break: keep-all;
                }

                > div {
                    display: flex;
                    align-items: center;
                    gap: 6px;
                    font-weight: 700;
                    font-size: 12px;

                    > div {
                        width: 24px;
                        height: 24px;
                        border-radius: 50%;
                        display: flex;
                        align-items: center;
                        justify-content: center;

                        &.male {
                            background-color: #007bff;
                        }

                        &.female {
                            background-color: #ff6f91;
                        }
                    }
                }
            }
        }
    }

    > .content-area {
        font-weight: 500;
        text-align: start;
        font-size: 14px;

        > .like-area {
            margin-top: 24px;
            display: flex;
            align-items: center;
            justify-content: center;

            > button {
                > div {
                    border-radius: 8px;
                    padding: 8px;
                    box-shadow: 0 0 8px rgba($color: #000000, $alpha: 0.35);
                }

                > p {
                    margin-top: 8px;
                    font-size: 12px;
                    font-weight: 700;
                }
            }
        }
    }

    > .comment-area {
        margin-top: 24px;

        > .title-area {
            display: flex;
            align-items: center;
            justify-content: space-between;

            > p {
                font-weight: 700;
                font-size: 14px;
            }
        }

        > .content-area {
            margin-top: 24px;

            > div {
                &:not(:first-child) {
                    margin-top: 16px;
                }
                > div {
                    background-color: #efefef;
                    border-radius: 8px;
                    padding: 8px;

                    .parent-comment-area,
                    .child-comment-area > div {
                        display: flex;
                        width: 100%;
                        gap: 8px;

                        > hr {
                            border-width: 2px;
                        }

                        > .gender-area {
                            > div {
                                width: 18px;
                                height: 18px;
                                border-radius: 50%;
                                display: flex;
                                align-items: center;
                                justify-content: center;

                                &.male {
                                    background-color: #007bff;
                                }

                                &.female {
                                    background-color: #ff6f91;
                                }
                            }
                        }

                        > .info-area {
                            width: 100%;
                            > .top-area {
                                display: flex;
                                align-items: center;
                                justify-content: space-between;

                                > div {
                                    display: flex;
                                    align-items: center;
                                    gap: 8px;
                                    > p {
                                        font-size: 12px;
                                        font-weight: 700;
                                    }
                                }
                            }

                            > .middle-area {
                                margin-top: 4px;
                                text-align: start;
                                font-size: 14px;
                                word-break: keep-all;
                            }

                            > .bottom-area {
                                display: flex;
                                align-items: center;
                                margin-top: 4px;

                                > .reply-btn {
                                    margin-right: auto;
                                    font-weight: 700;
                                    font-size: 10px;
                                }

                                > .fav-btn {
                                    margin-left: auto;
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}

.select-context-menu {
    button {
        font-weight: 700;
        width: 100%;
        color: red;
        font-size: 16px;
        padding: 16px;
    }
}

.check-context-menu {
    .title-area {
        text-align: center;
        font-weight: 700;
        font-size: 18px;
        padding: 8px 0;
    }

    hr {
        border: none;
        border-top: 1px solid #efefef;
    }

    .content-area {
        margin-top: 24px;
        padding: 0 16px 16px 16px;

        > p {
            text-align: center;
            font-weight: 500;
            word-break: keep-all;
            font-size: 14px;
        }

        > button {
            border-radius: 8px;
            width: 100%;
            height: 36px;
            font-weight: 700;
            font-size: 16px;
        }

        > .request {
            margin-top: 24px;
        }

        > .anyway {
            background-color: red;
            color: white;
            margin-top: 24px;
        }

        > .cancel {
            background-color: white;
            border: 1px solid #ececec;
            margin-top: 8px;
        }
    }
}
</style>

<script setup lang="js">
import { supabase } from '@/lib/supabase';
import router from '@/router';
import { onMounted, ref, defineEmits, defineProps } from 'vue';
import { useRoute } from "vue-router";
import { VueBottomSheet } from 'vue3-bottom-sheet';

const route = useRoute();
const emit = defineEmits();
const props = defineProps(['comments']);

const boardRefData = ref({});
const userGender = ref('');
const likesCount = ref(0);
const isLiked = ref(true);
const currentUserId = ref('');
const selectContextMenu = ref(false);
const checkContextMenu = ref(false);
const favContextMenu = ref(false);
const selectedProps = ref(null);

const onClickReplyBtn = (commentId, userId) => {
    emit('reply', commentId, userId);
}

const openSelectContextMenu = (event) => {
    const button = event.currentTarget;
    selectedProps.value = JSON.parse(button.value);
    selectContextMenu.value = true; // open 메서드 호출
};

const openCheckContextMenu = () => {
    if (currentUserId.value === selectedProps.value.user_id) checkContextMenu.value = true;
    else alert("작성자 본인만 삭제 가능합니다!");
};

const closeCheckContextMenu = () => {
    checkContextMenu.value = false;
    selectContextMenu.value = false;
}

const openFavContextMenu = (event) => {
    const button = event.currentTarget;
    selectedProps.value = JSON.parse(button.value);
    favContextMenu.value = true;
}

const closeFavContextMenu = () => {
    favContextMenu.value = false;
}

const onClickSendFriend = async () => {
    try {
        const { data: userData, error: userError } = await supabase
            .from('users')
            .select('id, heart')
            .eq('id', currentUserId.value)
            .single();
        if (userError) throw userError;

        if (userData.heart < 20) {
            alert("하트가 부족합니다! 충전 후 이용해주세요.");
            closeFavContextMenu();
            return false;
        }

        // currentUserId가 follow_id_1에 있을 때의 데이터 조회
        const { data: followData1, error: followError1 } = await supabase
            .from('user_follow')
            .select('*')
            .or(`follow_id_1.eq.${currentUserId.value},follow_id_2.eq.${selectedProps.value.user_id}`)

        if (followError1) throw followError1;

        // currentUserId가 follow_id_2에 있을 때의 데이터 조회
        const { data: followData2, error: followError2 } = await supabase
            .from('user_follow')
            .select('*')
            .or(`follow_id_1.eq.${selectedProps.value.user_id},follow_id_2.eq.${currentUserId.value}`)

        if (followError2) throw followError2;

        // 두 데이터의 길이를 합칩니다.
        const totalLength = (followData1 ? followData1.length : 0) + (followData2 ? followData2.length : 0);

        if (totalLength > 0) {
            alert("이미 친구 요청을 보낸 적 있는 상대입니다!");
            closeFavContextMenu();
            return false;
        }

        const { error: updateUserError } = await supabase
            .from('users')
            .upsert({
                id: currentUserId.value,
                heart: userData.heart - 20
            });
        if (updateUserError) throw updateUserError;

        const { error: followError } = await supabase
            .from('user_follow')
            .insert({
                follow_id_1: currentUserId.value,
                follow_id_2: selectedProps.value.user_id
            });
        if (followError) throw followError;

        alert("친구 요청을 완료했습니다!");
        closeFavContextMenu();
    } catch (error) {
        console.error("친구 요청 실패: ", error);
    }
}

const onClickDeletePost = async () => {
    try {
        if (selectedProps.value.post_id) {
            const { error: likeDeleteError } = await supabase
                .from('secret_board_likes')
                .delete()
                .eq('post_id', selectedProps.value.post_id)
            if (likeDeleteError) throw likeDeleteError;

            const { error: commentDeleteError } = await supabase
                .from('secret_board_comments')
                .delete()
                .eq('post_id', selectedProps.value.post_id)
            if (commentDeleteError) throw commentDeleteError;

            const { error: postDeleteError } = await supabase
                .from('secret_board')
                .delete()
                .eq('post_id', selectedProps.value.post_id)
            if (postDeleteError) throw postDeleteError;

            router.replace('/secret');
        } else if (selectedProps.value.comment_id) {
            const { error: childDeleteError } = await supabase
                .from('secret_board_comments')
                .delete()
                .eq('parent_comment_id', selectedProps.value.comment_id)
            if (childDeleteError) throw childDeleteError;

            const { error: parentDeleteError } = await supabase
                .from('secret_board_comments')
                .delete()
                .eq('comment_id', selectedProps.value.comment_id)
            if (parentDeleteError) throw parentDeleteError;

            emit('reloadComment');
        }

        closeCheckContextMenu();
    } catch (error) {
        console.error("삭제 중 오류 발생: ", error);
    }
}

const fetchData = async () => {
    try {
        const { data: boardData, error: boardError } = await supabase
            .from('secret_board')
            .select('*')
            .eq('post_id', route.query.id)
            .single();
        if (boardError) throw boardError;

        const { data: userData, error: userError } = await supabase
            .from('users')
            .select('gender')
            .eq('id', boardData.user_id)
            .single();
        if (userError) throw userError

        const { data: likeData, error: likeError } = await supabase
            .from('secret_board_likes')
            .select('*')
            .eq('post_id', route.query.id);
        if (likeError) throw likeError;

        const userSession = (await supabase.auth.getSession()).data.session.user;
        const userId = userSession ? userSession.id : null;

        const likesCountValue = likeData.filter(like => like.post_id === boardData.post_id).length;

        boardRefData.value = boardData;
        userGender.value = userData.gender;
        likesCount.value = likesCountValue;
        isLiked.value = likeData.some(like => like.user_id === userId);
        currentUserId.value = userId;
    } catch (error) {
        console.error("게시물 불러오기 실패: ", error);
    }
};

const generateNickname = (postId, userId) => {
    const combined = `${postId}-${userId}`;
    const hash = Array.from(combined).reduce((acc, char) => {
        return acc + char.charCodeAt(0);
    }, 0);

    // 6자리 숫자 생성
    const nicknameNumber = String(hash % 1000000).padStart(6, '0'); // 6자리로 맞추기
    return `메이트${nicknameNumber}`; // 닉네임 형식
}

const formatDate = (dateString) => {
    const date = new Date(dateString);

    // 연도, 월, 일, 시, 분을 추출
    const month = String(date.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 +1
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    // 원하는 형식으로 반환
    return `${month}/${day} ${hours}:${minutes}`;
}

const formatNumber = (number) => {
    if (number >= 10000) {
        return (number / 1000000).toFixed(1) + 'M'; // 1M 단위
    } else if (number >= 1000) {
        return (number / 1000).toFixed(1) + 'K'; // 1K 단위
    }
    return number; // 1000 미만은 그대로 반환
}

const onClickLikeBtn = async () => {
    try {
        const userSession = (await supabase.auth.getSession()).data.session.user;
        const userId = userSession ? userSession.id : null;

        if (isLiked.value) {
            const { error: likeError } = await supabase
                .from('secret_board_likes')
                .delete()
                .eq('post_id', boardRefData.value.post_id) // post_id 조건 추가
                .eq('user_id', userId); // user_id 조건 추가
            if (likeError) throw likeError;
            likesCount.value--;
        } else {
            // 좋아요 추가
            const { error: likeError } = await supabase
                .from('secret_board_likes')
                .insert([{ post_id: boardRefData.value.post_id, user_id: userId }]); // 데이터 추가
            if (likeError) throw likeError;
            likesCount.value++;
        }

        isLiked.value = !isLiked.value;
    } catch (error) {
        console.error("좋아요 누르기 실패: ", error);
    }
}

const formatCategory = (filter) => {
    switch (filter) {
        case "CONCERNS":
            return "고민";
        case "QUESTIONS":
            return "질문";
        case "LOOKING_FOR":
            return "찾아요";
        case "ADVICE":
            return "조언";
        case "STORIES":
            return "이야기";
        case "COMMUNICATION":
            return "소통";
        case "EMOTIONS":
            return "감정";
        case "HOBBIES":
            return "취미";
        case "RELATIONSHIPS":
            return "연애";
        case "DAILY_LIFE":
            return "일상";
        case "INFORMATION":
            return "정보";
        case "RECOMMENDATIONS":
            return "추천";
        case "EVENTS":
            return "이벤트";
        case "SELF_IMPROVEMENT":
            return "자기계발";
        default:
            return "알 수 없음";
    }
}

onMounted(() => {
    fetchData();
});
</script>
