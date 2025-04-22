var jo = Object.defineProperty;
var qo = (s, e, t) => e in s ? jo(s, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : s[e] = t;
var I = (s, e, t) => qo(s, typeof e != "symbol" ? e + "" : e, t);
const vs = /* @__PURE__ */ new Map();
function Go(s) {
  const e = Array.isArray(s) ? s : [
    s
  ], t = e.join(","), r = vs.get(t) ?? (() => {
    const a = ui(e), c = Ho(a);
    return vs.set(t, c), c;
  })();
  return (a) => r(a);
}
function ui(s) {
  return Array.isArray(s) ? s.map((e) => e.split(":")) : [
    s.split(":")
  ];
}
function Ho(s) {
  const e = s.flatMap((a) => zo(a, ci(a))), t = Zo(e), r = Ko(t);
  return (a) => !!r(a.update, a);
}
function ci(s) {
  const e = Yt, t = [
    s
  ].flatMap((r) => {
    const [a, c, l] = r;
    if (!(a in ks)) return [
      r
    ];
    if (!a && !c && !l) return [
      r
    ];
    const d = ks[a].map((g) => [
      g,
      c,
      l
    ]);
    return c === void 0 || c in On && (c || l) ? d : d.filter(([g]) => {
      var v;
      return !!((v = e[g]) != null && v[c]);
    });
  }).flatMap((r) => {
    const [a, c, l] = r;
    if (!(c in On)) return [
      r
    ];
    if (!c && !l) return [
      r
    ];
    const d = On[c].map((g) => [
      a,
      g,
      l
    ]);
    return l === void 0 ? d : d.filter(([, g]) => {
      var v, C;
      return !!((C = (v = e[a]) == null ? void 0 : v[g]) != null && C[l]);
    });
  });
  if (t.length === 0)
    throw new Error(`Shortcuts in '${s.join(":")}' do not expand to any valid filter query`);
  return t;
}
function zo(s, e) {
  if (e.length === 0) throw new Error("Empty filter query given");
  const t = e.map(Yo).filter((r) => r !== !0);
  if (t.length === 0) return e;
  throw t.length === 1 ? new Error(t[0]) : new Error(`Invalid filter query '${s.join(":")}'. There are ${t.length} errors after expanding the contained shortcuts: ${t.join("; ")}`);
}
function Yo(s) {
  const [e, t, r, ...a] = s;
  if (e === void 0) return "Empty filter query given";
  if (!(e in Yt)) {
    const p = Object.keys(Yt);
    return `Invalid L1 filter '${e}' given in '${s.join(":")}'. Permitted values are: ${p.map((d) => `'${d}'`).join(", ")}.`;
  }
  if (t === void 0) return !0;
  const c = Yt[e];
  if (!(t in c)) {
    const p = Object.keys(c);
    return `Invalid L2 filter '${t}' given in '${s.join(":")}'. Permitted values are: ${p.map((d) => `'${d}'`).join(", ")}.`;
  }
  if (r === void 0) return !0;
  const l = c[t];
  if (!(r in l)) {
    const p = Object.keys(l);
    return `Invalid L3 filter '${r}' given in '${s.join(":")}'. ${p.length === 0 ? `No further filtering is possible after '${e}:${t}'.` : `Permitted values are: ${p.map((d) => `'${d}'`).join(", ")}.`}`;
  }
  return a.length === 0 ? !0 : `Cannot filter further than three levels, ':${a.join(":")}' is invalid!`;
}
function Zo(s) {
  const e = {};
  for (const [t, r, a] of s) {
    const c = e[t] ?? (e[t] = {});
    if (r !== void 0) {
      const l = c[r] ?? (c[r] = /* @__PURE__ */ new Set());
      a !== void 0 && l.add(a);
    }
  }
  return e;
}
function Mn(s, e) {
  return (t, r) => s(t, r) || e(t, r);
}
function Cs(s, e) {
  return (t, r) => {
    const a = s(t, r);
    return a && e(a, r);
  };
}
function Ss(s) {
  return (e, t) => s(e, t) != null;
}
function Ko(s) {
  const e = Object.entries(s).map(([t, r]) => {
    const a = (l) => l[t], c = Object.entries(r).map(([l, p]) => {
      const d = (v) => v[l], g = Array.from(p).map((v) => v === "me" ? (_, N) => {
        const E = N.me.id;
        return Ts(_, (k) => k.id === E);
      } : (_) => Ts(_, (N) => N[v] || N.type === v));
      return g.length === 0 ? Ss(d) : Cs(d, g.reduce(Mn));
    });
    return c.length === 0 ? Ss(a) : Cs(a, c.reduce(Mn));
  });
  if (e.length === 0)
    throw new Error("Cannot create filter function for empty query");
  return e.reduce(Mn);
}
function Ts(s, e) {
  const t = (r) => r != null && e(r);
  return Array.isArray(s) ? s.some(t) : t(s);
}
const _s = {
  mention: {},
  hashtag: {},
  cashtag: {},
  bot_command: {},
  url: {},
  email: {},
  phone_number: {},
  bold: {},
  italic: {},
  underline: {},
  strikethrough: {},
  spoiler: {},
  blockquote: {},
  expandable_blockquote: {},
  code: {},
  pre: {},
  text_link: {},
  text_mention: {},
  custom_emoji: {}
}, Bn = {
  me: {},
  is_bot: {},
  is_premium: {},
  added_to_attachment_menu: {}
}, Qo = {
  user: {},
  hidden_user: {},
  chat: {},
  channel: {}
}, Jo = {
  is_video: {},
  is_animated: {},
  premium_animation: {}
}, Un = {
  emoji: {},
  custom_emoji: {},
  paid: {}
}, li = {
  forward_origin: Qo,
  is_topic_message: {},
  is_automatic_forward: {},
  business_connection_id: {},
  text: {},
  animation: {},
  audio: {},
  document: {},
  paid_media: {},
  photo: {},
  sticker: Jo,
  story: {},
  video: {},
  video_note: {},
  voice: {},
  contact: {},
  dice: {},
  game: {},
  poll: {},
  venue: {},
  location: {},
  entities: _s,
  caption_entities: _s,
  caption: {},
  effect_id: {},
  paid_star_count: {},
  has_media_spoiler: {},
  new_chat_title: {},
  new_chat_photo: {},
  delete_chat_photo: {},
  message_auto_delete_timer_changed: {},
  pinned_message: {},
  invoice: {},
  proximity_alert_triggered: {},
  chat_background_set: {},
  giveaway_created: {},
  giveaway: {
    only_new_members: {},
    has_public_winners: {}
  },
  giveaway_winners: {
    only_new_members: {},
    was_refunded: {}
  },
  giveaway_completed: {},
  gift: {},
  unique_gift: {},
  paid_message_price_changed: {},
  video_chat_scheduled: {},
  video_chat_started: {},
  video_chat_ended: {},
  video_chat_participants_invited: {},
  web_app_data: {}
}, Gt = {
  ...li,
  new_chat_members: Bn,
  left_chat_member: Bn,
  group_chat_created: {},
  supergroup_chat_created: {},
  migrate_to_chat_id: {},
  migrate_from_chat_id: {},
  successful_payment: {},
  refunded_payment: {},
  users_shared: {},
  chat_shared: {},
  connected_website: {},
  write_access_allowed: {},
  passport_data: {},
  boost_added: {},
  forum_topic_created: {},
  forum_topic_edited: {
    name: {},
    icon_custom_emoji_id: {}
  },
  forum_topic_closed: {},
  forum_topic_reopened: {},
  general_forum_topic_hidden: {},
  general_forum_topic_unhidden: {},
  sender_boost_count: {}
}, Es = {
  ...li,
  channel_chat_created: {}
}, Xo = {
  can_reply: {},
  is_enabled: {}
}, eu = {
  old_reaction: Un,
  new_reaction: Un
}, tu = {
  reactions: Un
}, nu = {
  data: {},
  game_short_name: {}
}, Is = {
  from: Bn
}, Yt = {
  message: Gt,
  edited_message: Gt,
  channel_post: Es,
  edited_channel_post: Es,
  business_connection: Xo,
  business_message: Gt,
  edited_business_message: Gt,
  deleted_business_messages: {},
  inline_query: {},
  chosen_inline_result: {},
  callback_query: nu,
  shipping_query: {},
  pre_checkout_query: {},
  poll: {},
  poll_answer: {},
  my_chat_member: Is,
  chat_member: Is,
  chat_join_request: {},
  message_reaction: eu,
  message_reaction_count: tu,
  chat_boost: {},
  removed_chat_boost: {},
  purchased_paid_media: {}
}, ks = {
  "": [
    "message",
    "channel_post"
  ],
  msg: [
    "message",
    "channel_post"
  ],
  edit: [
    "edited_message",
    "edited_channel_post"
  ]
}, On = {
  "": [
    "entities",
    "caption_entities"
  ],
  media: [
    "photo",
    "video"
  ],
  file: [
    "photo",
    "animation",
    "audio",
    "document",
    "video",
    "video_note",
    "voice",
    "sticker"
  ]
}, we = {
  filterQuery(s) {
    const e = Go(s);
    return (t) => e(t);
  },
  text(s) {
    const e = we.filterQuery([
      ":text",
      ":caption"
    ]), t = Le(s);
    return (r) => {
      if (!e(r)) return !1;
      const a = r.message ?? r.channelPost, c = a.text ?? a.caption;
      return Pe(r, c, t);
    };
  },
  command(s) {
    const e = we.filterQuery(":entities:bot_command"), t = /* @__PURE__ */ new Set(), r = /* @__PURE__ */ new Set();
    return Qt(s).forEach((a) => {
      if (a.startsWith("/"))
        throw new Error(`Do not include '/' when registering command handlers (use '${a.substring(1)}' not '${a}')`);
      (a.includes("@") ? t : r).add(a);
    }), (a) => {
      if (!e(a)) return !1;
      const c = a.message ?? a.channelPost, l = c.text ?? c.caption;
      return c.entities.some((p) => {
        if (p.type !== "bot_command" || p.offset !== 0) return !1;
        const d = l.substring(1, p.length);
        if (r.has(d) || t.has(d))
          return a.match = l.substring(d.length + 1).trimStart(), !0;
        const g = d.indexOf("@");
        if (g === -1) return !1;
        const v = d.substring(g + 1).toLowerCase(), C = a.me.username.toLowerCase();
        if (v !== C) return !1;
        const _ = d.substring(0, g);
        return r.has(_) ? (a.match = l.substring(d.length + 1).trimStart(), !0) : !1;
      });
    };
  },
  reaction(s) {
    const e = we.filterQuery("message_reaction"), t = typeof s == "string" ? [
      {
        type: "emoji",
        emoji: s
      }
    ] : (Array.isArray(s) ? s : [
      s
    ]).map((l) => typeof l == "string" ? {
      type: "emoji",
      emoji: l
    } : l), r = new Set(t.filter((l) => l.type === "emoji").map((l) => l.emoji)), a = new Set(t.filter((l) => l.type === "custom_emoji").map((l) => l.custom_emoji_id)), c = t.some((l) => l.type === "paid");
    return (l) => {
      if (!e(l)) return !1;
      const { old_reaction: p, new_reaction: d } = l.messageReaction;
      for (const g of d) {
        let v = !1;
        if (g.type === "emoji") {
          for (const C of p)
            if (C.type === "emoji" && C.emoji === g.emoji) {
              v = !0;
              break;
            }
        } else if (g.type === "custom_emoji") {
          for (const C of p)
            if (C.type === "custom_emoji" && C.custom_emoji_id === g.custom_emoji_id) {
              v = !0;
              break;
            }
        } else if (g.type === "paid") {
          for (const C of p)
            if (C.type === "paid") {
              v = !0;
              break;
            }
        }
        if (!v)
          if (g.type === "emoji") {
            if (r.has(g.emoji)) return !0;
          } else if (g.type === "custom_emoji") {
            if (a.has(g.custom_emoji_id)) return !0;
          } else if (g.type === "paid") {
            if (c) return !0;
          } else
            return !0;
      }
      return !1;
    };
  },
  chatType(s) {
    const e = new Set(Qt(s));
    return (t) => {
      var r;
      return ((r = t.chat) == null ? void 0 : r.type) !== void 0 && e.has(t.chat.type);
    };
  },
  callbackQuery(s) {
    const e = we.filterQuery("callback_query:data"), t = Le(s);
    return (r) => e(r) && Pe(r, r.callbackQuery.data, t);
  },
  gameQuery(s) {
    const e = we.filterQuery("callback_query:game_short_name"), t = Le(s);
    return (r) => e(r) && Pe(r, r.callbackQuery.game_short_name, t);
  },
  inlineQuery(s) {
    const e = we.filterQuery("inline_query"), t = Le(s);
    return (r) => e(r) && Pe(r, r.inlineQuery.query, t);
  },
  chosenInlineResult(s) {
    const e = we.filterQuery("chosen_inline_result"), t = Le(s);
    return (r) => e(r) && Pe(r, r.chosenInlineResult.result_id, t);
  },
  preCheckoutQuery(s) {
    const e = we.filterQuery("pre_checkout_query"), t = Le(s);
    return (r) => e(r) && Pe(r, r.preCheckoutQuery.invoice_payload, t);
  },
  shippingQuery(s) {
    const e = we.filterQuery("shipping_query"), t = Le(s);
    return (r) => e(r) && Pe(r, r.shippingQuery.invoice_payload, t);
  }
}, ae = class ae {
  constructor(e, t, r) {
    I(this, "update");
    I(this, "api");
    I(this, "me");
    I(this, "match");
    this.update = e, this.api = t, this.me = r;
  }
  get message() {
    return this.update.message;
  }
  get editedMessage() {
    return this.update.edited_message;
  }
  get channelPost() {
    return this.update.channel_post;
  }
  get editedChannelPost() {
    return this.update.edited_channel_post;
  }
  get businessConnection() {
    return this.update.business_connection;
  }
  get businessMessage() {
    return this.update.business_message;
  }
  get editedBusinessMessage() {
    return this.update.edited_business_message;
  }
  get deletedBusinessMessages() {
    return this.update.deleted_business_messages;
  }
  get messageReaction() {
    return this.update.message_reaction;
  }
  get messageReactionCount() {
    return this.update.message_reaction_count;
  }
  get inlineQuery() {
    return this.update.inline_query;
  }
  get chosenInlineResult() {
    return this.update.chosen_inline_result;
  }
  get callbackQuery() {
    return this.update.callback_query;
  }
  get shippingQuery() {
    return this.update.shipping_query;
  }
  get preCheckoutQuery() {
    return this.update.pre_checkout_query;
  }
  get poll() {
    return this.update.poll;
  }
  get pollAnswer() {
    return this.update.poll_answer;
  }
  get myChatMember() {
    return this.update.my_chat_member;
  }
  get chatMember() {
    return this.update.chat_member;
  }
  get chatJoinRequest() {
    return this.update.chat_join_request;
  }
  get chatBoost() {
    return this.update.chat_boost;
  }
  get removedChatBoost() {
    return this.update.removed_chat_boost;
  }
  get purchasedPaidMedia() {
    return this.update.purchased_paid_media;
  }
  get msg() {
    var e;
    return this.message ?? this.editedMessage ?? this.channelPost ?? this.editedChannelPost ?? this.businessMessage ?? this.editedBusinessMessage ?? ((e = this.callbackQuery) == null ? void 0 : e.message);
  }
  get chat() {
    var e;
    return (e = this.msg ?? this.deletedBusinessMessages ?? this.messageReaction ?? this.messageReactionCount ?? this.myChatMember ?? this.chatMember ?? this.chatJoinRequest ?? this.chatBoost ?? this.removedChatBoost) == null ? void 0 : e.chat;
  }
  get senderChat() {
    var e;
    return (e = this.msg) == null ? void 0 : e.sender_chat;
  }
  get from() {
    var e, t, r, a;
    return ((r = this.businessConnection ?? this.messageReaction ?? ((t = ((e = this.chatBoost) == null ? void 0 : e.boost) ?? this.removedChatBoost) == null ? void 0 : t.source)) == null ? void 0 : r.user) ?? ((a = this.callbackQuery ?? this.msg ?? this.inlineQuery ?? this.chosenInlineResult ?? this.shippingQuery ?? this.preCheckoutQuery ?? this.myChatMember ?? this.chatMember ?? this.chatJoinRequest ?? this.purchasedPaidMedia) == null ? void 0 : a.from);
  }
  get msgId() {
    var e, t, r;
    return ((e = this.msg) == null ? void 0 : e.message_id) ?? ((t = this.messageReaction) == null ? void 0 : t.message_id) ?? ((r = this.messageReactionCount) == null ? void 0 : r.message_id);
  }
  get chatId() {
    var e, t;
    return ((e = this.chat) == null ? void 0 : e.id) ?? ((t = this.businessConnection) == null ? void 0 : t.user_chat_id);
  }
  get inlineMessageId() {
    var e, t;
    return ((e = this.callbackQuery) == null ? void 0 : e.inline_message_id) ?? ((t = this.chosenInlineResult) == null ? void 0 : t.inline_message_id);
  }
  get businessConnectionId() {
    var e, t, r;
    return ((e = this.msg) == null ? void 0 : e.business_connection_id) ?? ((t = this.businessConnection) == null ? void 0 : t.id) ?? ((r = this.deletedBusinessMessages) == null ? void 0 : r.business_connection_id);
  }
  entities(e) {
    const t = this.msg;
    if (t === void 0) return [];
    const r = t.text ?? t.caption;
    if (r === void 0) return [];
    let a = t.entities ?? t.caption_entities;
    if (a === void 0) return [];
    if (e !== void 0) {
      const c = new Set(Qt(e));
      a = a.filter((l) => c.has(l.type));
    }
    return a.map((c) => ({
      ...c,
      text: r.substring(c.offset, c.offset + c.length)
    }));
  }
  reactions() {
    const e = [], t = [], r = [], a = [], c = [], l = [], p = [], d = [];
    let g = !1, v = !1;
    const C = this.messageReaction;
    if (C !== void 0) {
      const { old_reaction: _, new_reaction: N } = C;
      for (const E of N)
        E.type === "emoji" ? e.push(E.emoji) : E.type === "custom_emoji" ? c.push(E.custom_emoji_id) : E.type === "paid" && (g = v = !0);
      for (const E of _)
        E.type === "emoji" ? a.push(E.emoji) : E.type === "custom_emoji" ? d.push(E.custom_emoji_id) : E.type === "paid" && (v = !1);
      t.push(...e), l.push(...c);
      for (let E = 0; E < a.length; E++) {
        const k = t.length;
        if (k === 0) break;
        const L = a[E];
        for (let x = 0; x < k; x++)
          if (L === t[x]) {
            r.push(L), a.splice(E, 1), t.splice(x, 1), E--;
            break;
          }
      }
      for (let E = 0; E < d.length; E++) {
        const k = l.length;
        if (k === 0) break;
        const L = d[E];
        for (let x = 0; x < k; x++)
          if (L === l[x]) {
            p.push(L), d.splice(E, 1), l.splice(x, 1), E--;
            break;
          }
      }
    }
    return {
      emoji: e,
      emojiAdded: t,
      emojiKept: r,
      emojiRemoved: a,
      customEmoji: c,
      customEmojiAdded: l,
      customEmojiKept: p,
      customEmojiRemoved: d,
      paid: g,
      paidAdded: v
    };
  }
  has(e) {
    return ae.has.filterQuery(e)(this);
  }
  hasText(e) {
    return ae.has.text(e)(this);
  }
  hasCommand(e) {
    return ae.has.command(e)(this);
  }
  hasReaction(e) {
    return ae.has.reaction(e)(this);
  }
  hasChatType(e) {
    return ae.has.chatType(e)(this);
  }
  hasCallbackQuery(e) {
    return ae.has.callbackQuery(e)(this);
  }
  hasGameQuery(e) {
    return ae.has.gameQuery(e)(this);
  }
  hasInlineQuery(e) {
    return ae.has.inlineQuery(e)(this);
  }
  hasChosenInlineResult(e) {
    return ae.has.chosenInlineResult(e)(this);
  }
  hasPreCheckoutQuery(e) {
    return ae.has.preCheckoutQuery(e)(this);
  }
  hasShippingQuery(e) {
    return ae.has.shippingQuery(e)(this);
  }
  reply(e, t, r) {
    return this.api.sendMessage(w(this.chatId, "sendMessage"), e, {
      business_connection_id: this.businessConnectionId,
      ...t
    }, r);
  }
  forwardMessage(e, t, r) {
    return this.api.forwardMessage(e, w(this.chatId, "forwardMessage"), w(this.msgId, "forwardMessage"), t, r);
  }
  forwardMessages(e, t, r, a) {
    return this.api.forwardMessages(e, w(this.chatId, "forwardMessages"), t, r, a);
  }
  copyMessage(e, t, r) {
    return this.api.copyMessage(e, w(this.chatId, "copyMessage"), w(this.msgId, "copyMessage"), t, r);
  }
  copyMessages(e, t, r, a) {
    return this.api.copyMessages(e, w(this.chatId, "copyMessages"), t, r, a);
  }
  replyWithPhoto(e, t, r) {
    return this.api.sendPhoto(w(this.chatId, "sendPhoto"), e, {
      business_connection_id: this.businessConnectionId,
      ...t
    }, r);
  }
  replyWithAudio(e, t, r) {
    return this.api.sendAudio(w(this.chatId, "sendAudio"), e, {
      business_connection_id: this.businessConnectionId,
      ...t
    }, r);
  }
  replyWithDocument(e, t, r) {
    return this.api.sendDocument(w(this.chatId, "sendDocument"), e, {
      business_connection_id: this.businessConnectionId,
      ...t
    }, r);
  }
  replyWithVideo(e, t, r) {
    return this.api.sendVideo(w(this.chatId, "sendVideo"), e, {
      business_connection_id: this.businessConnectionId,
      ...t
    }, r);
  }
  replyWithAnimation(e, t, r) {
    return this.api.sendAnimation(w(this.chatId, "sendAnimation"), e, {
      business_connection_id: this.businessConnectionId,
      ...t
    }, r);
  }
  replyWithVoice(e, t, r) {
    return this.api.sendVoice(w(this.chatId, "sendVoice"), e, {
      business_connection_id: this.businessConnectionId,
      ...t
    }, r);
  }
  replyWithVideoNote(e, t, r) {
    return this.api.sendVideoNote(w(this.chatId, "sendVideoNote"), e, {
      business_connection_id: this.businessConnectionId,
      ...t
    }, r);
  }
  replyWithMediaGroup(e, t, r) {
    return this.api.sendMediaGroup(w(this.chatId, "sendMediaGroup"), e, {
      business_connection_id: this.businessConnectionId,
      ...t
    }, r);
  }
  replyWithLocation(e, t, r, a) {
    return this.api.sendLocation(w(this.chatId, "sendLocation"), e, t, {
      business_connection_id: this.businessConnectionId,
      ...r
    }, a);
  }
  editMessageLiveLocation(e, t, r, a) {
    const c = this.inlineMessageId;
    return c !== void 0 ? this.api.editMessageLiveLocationInline(c, e, t, {
      business_connection_id: this.businessConnectionId,
      ...r
    }, a) : this.api.editMessageLiveLocation(w(this.chatId, "editMessageLiveLocation"), w(this.msgId, "editMessageLiveLocation"), e, t, {
      business_connection_id: this.businessConnectionId,
      ...r
    }, a);
  }
  stopMessageLiveLocation(e, t) {
    const r = this.inlineMessageId;
    return r !== void 0 ? this.api.stopMessageLiveLocationInline(r, {
      business_connection_id: this.businessConnectionId,
      ...e
    }, t) : this.api.stopMessageLiveLocation(w(this.chatId, "stopMessageLiveLocation"), w(this.msgId, "stopMessageLiveLocation"), {
      business_connection_id: this.businessConnectionId,
      ...e
    }, t);
  }
  sendPaidMedia(e, t, r, a) {
    return this.api.sendPaidMedia(w(this.chatId, "sendPaidMedia"), e, t, {
      business_connection_id: this.businessConnectionId,
      ...r
    }, a);
  }
  replyWithVenue(e, t, r, a, c, l) {
    return this.api.sendVenue(w(this.chatId, "sendVenue"), e, t, r, a, {
      business_connection_id: this.businessConnectionId,
      ...c
    }, l);
  }
  replyWithContact(e, t, r, a) {
    return this.api.sendContact(w(this.chatId, "sendContact"), e, t, {
      business_connection_id: this.businessConnectionId,
      ...r
    }, a);
  }
  replyWithPoll(e, t, r, a) {
    return this.api.sendPoll(w(this.chatId, "sendPoll"), e, t, {
      business_connection_id: this.businessConnectionId,
      ...r
    }, a);
  }
  replyWithDice(e, t, r) {
    return this.api.sendDice(w(this.chatId, "sendDice"), e, {
      business_connection_id: this.businessConnectionId,
      ...t
    }, r);
  }
  replyWithChatAction(e, t, r) {
    return this.api.sendChatAction(w(this.chatId, "sendChatAction"), e, {
      business_connection_id: this.businessConnectionId,
      ...t
    }, r);
  }
  react(e, t, r) {
    return this.api.setMessageReaction(w(this.chatId, "setMessageReaction"), w(this.msgId, "setMessageReaction"), typeof e == "string" ? [
      {
        type: "emoji",
        emoji: e
      }
    ] : (Array.isArray(e) ? e : [
      e
    ]).map((a) => typeof a == "string" ? {
      type: "emoji",
      emoji: a
    } : a), t, r);
  }
  getUserProfilePhotos(e, t) {
    return this.api.getUserProfilePhotos(w(this.from, "getUserProfilePhotos").id, e, t);
  }
  setUserEmojiStatus(e, t) {
    return this.api.setUserEmojiStatus(w(this.from, "setUserEmojiStatus").id, e, t);
  }
  getUserChatBoosts(e, t) {
    return this.api.getUserChatBoosts(e, w(this.from, "getUserChatBoosts").id, t);
  }
  getBusinessConnection(e) {
    return this.api.getBusinessConnection(w(this.businessConnectionId, "getBusinessConnection"), e);
  }
  getFile(e) {
    const t = w(this.msg, "getFile"), r = t.photo !== void 0 ? t.photo[t.photo.length - 1] : t.animation ?? t.audio ?? t.document ?? t.video ?? t.video_note ?? t.voice ?? t.sticker;
    return this.api.getFile(w(r, "getFile").file_id, e);
  }
  kickAuthor(...e) {
    return this.banAuthor(...e);
  }
  banAuthor(e, t) {
    return this.api.banChatMember(w(this.chatId, "banAuthor"), w(this.from, "banAuthor").id, e, t);
  }
  kickChatMember(...e) {
    return this.banChatMember(...e);
  }
  banChatMember(e, t, r) {
    return this.api.banChatMember(w(this.chatId, "banChatMember"), e, t, r);
  }
  unbanChatMember(e, t, r) {
    return this.api.unbanChatMember(w(this.chatId, "unbanChatMember"), e, t, r);
  }
  restrictAuthor(e, t, r) {
    return this.api.restrictChatMember(w(this.chatId, "restrictAuthor"), w(this.from, "restrictAuthor").id, e, t, r);
  }
  restrictChatMember(e, t, r, a) {
    return this.api.restrictChatMember(w(this.chatId, "restrictChatMember"), e, t, r, a);
  }
  promoteAuthor(e, t) {
    return this.api.promoteChatMember(w(this.chatId, "promoteAuthor"), w(this.from, "promoteAuthor").id, e, t);
  }
  promoteChatMember(e, t, r) {
    return this.api.promoteChatMember(w(this.chatId, "promoteChatMember"), e, t, r);
  }
  setChatAdministratorAuthorCustomTitle(e, t) {
    return this.api.setChatAdministratorCustomTitle(w(this.chatId, "setChatAdministratorAuthorCustomTitle"), w(this.from, "setChatAdministratorAuthorCustomTitle").id, e, t);
  }
  setChatAdministratorCustomTitle(e, t, r) {
    return this.api.setChatAdministratorCustomTitle(w(this.chatId, "setChatAdministratorCustomTitle"), e, t, r);
  }
  banChatSenderChat(e, t) {
    return this.api.banChatSenderChat(w(this.chatId, "banChatSenderChat"), e, t);
  }
  unbanChatSenderChat(e, t) {
    return this.api.unbanChatSenderChat(w(this.chatId, "unbanChatSenderChat"), e, t);
  }
  setChatPermissions(e, t, r) {
    return this.api.setChatPermissions(w(this.chatId, "setChatPermissions"), e, t, r);
  }
  exportChatInviteLink(e) {
    return this.api.exportChatInviteLink(w(this.chatId, "exportChatInviteLink"), e);
  }
  createChatInviteLink(e, t) {
    return this.api.createChatInviteLink(w(this.chatId, "createChatInviteLink"), e, t);
  }
  editChatInviteLink(e, t, r) {
    return this.api.editChatInviteLink(w(this.chatId, "editChatInviteLink"), e, t, r);
  }
  createChatSubscriptionInviteLink(e, t, r, a) {
    return this.api.createChatSubscriptionInviteLink(w(this.chatId, "createChatSubscriptionInviteLink"), e, t, r, a);
  }
  editChatSubscriptionInviteLink(e, t, r) {
    return this.api.editChatSubscriptionInviteLink(w(this.chatId, "editChatSubscriptionInviteLink"), e, t, r);
  }
  revokeChatInviteLink(e, t) {
    return this.api.revokeChatInviteLink(w(this.chatId, "editChatInviteLink"), e, t);
  }
  approveChatJoinRequest(e, t) {
    return this.api.approveChatJoinRequest(w(this.chatId, "approveChatJoinRequest"), e, t);
  }
  declineChatJoinRequest(e, t) {
    return this.api.declineChatJoinRequest(w(this.chatId, "declineChatJoinRequest"), e, t);
  }
  setChatPhoto(e, t) {
    return this.api.setChatPhoto(w(this.chatId, "setChatPhoto"), e, t);
  }
  deleteChatPhoto(e) {
    return this.api.deleteChatPhoto(w(this.chatId, "deleteChatPhoto"), e);
  }
  setChatTitle(e, t) {
    return this.api.setChatTitle(w(this.chatId, "setChatTitle"), e, t);
  }
  setChatDescription(e, t) {
    return this.api.setChatDescription(w(this.chatId, "setChatDescription"), e, t);
  }
  pinChatMessage(e, t, r) {
    return this.api.pinChatMessage(w(this.chatId, "pinChatMessage"), e, {
      business_connection_id: this.businessConnectionId,
      ...t
    }, r);
  }
  unpinChatMessage(e, t, r) {
    return this.api.unpinChatMessage(w(this.chatId, "unpinChatMessage"), e, {
      business_connection_id: this.businessConnectionId,
      ...t
    }, r);
  }
  unpinAllChatMessages(e) {
    return this.api.unpinAllChatMessages(w(this.chatId, "unpinAllChatMessages"), e);
  }
  leaveChat(e) {
    return this.api.leaveChat(w(this.chatId, "leaveChat"), e);
  }
  getChat(e) {
    return this.api.getChat(w(this.chatId, "getChat"), e);
  }
  getChatAdministrators(e) {
    return this.api.getChatAdministrators(w(this.chatId, "getChatAdministrators"), e);
  }
  getChatMembersCount(...e) {
    return this.getChatMemberCount(...e);
  }
  getChatMemberCount(e) {
    return this.api.getChatMemberCount(w(this.chatId, "getChatMemberCount"), e);
  }
  getAuthor(e) {
    return this.api.getChatMember(w(this.chatId, "getAuthor"), w(this.from, "getAuthor").id, e);
  }
  getChatMember(e, t) {
    return this.api.getChatMember(w(this.chatId, "getChatMember"), e, t);
  }
  setChatStickerSet(e, t) {
    return this.api.setChatStickerSet(w(this.chatId, "setChatStickerSet"), e, t);
  }
  deleteChatStickerSet(e) {
    return this.api.deleteChatStickerSet(w(this.chatId, "deleteChatStickerSet"), e);
  }
  createForumTopic(e, t, r) {
    return this.api.createForumTopic(w(this.chatId, "createForumTopic"), e, t, r);
  }
  editForumTopic(e, t) {
    const r = w(this.msg, "editForumTopic"), a = w(r.message_thread_id, "editForumTopic");
    return this.api.editForumTopic(r.chat.id, a, e, t);
  }
  closeForumTopic(e) {
    const t = w(this.msg, "closeForumTopic"), r = w(t.message_thread_id, "closeForumTopic");
    return this.api.closeForumTopic(t.chat.id, r, e);
  }
  reopenForumTopic(e) {
    const t = w(this.msg, "reopenForumTopic"), r = w(t.message_thread_id, "reopenForumTopic");
    return this.api.reopenForumTopic(t.chat.id, r, e);
  }
  deleteForumTopic(e) {
    const t = w(this.msg, "deleteForumTopic"), r = w(t.message_thread_id, "deleteForumTopic");
    return this.api.deleteForumTopic(t.chat.id, r, e);
  }
  unpinAllForumTopicMessages(e) {
    const t = w(this.msg, "unpinAllForumTopicMessages"), r = w(t.message_thread_id, "unpinAllForumTopicMessages");
    return this.api.unpinAllForumTopicMessages(t.chat.id, r, e);
  }
  editGeneralForumTopic(e, t) {
    return this.api.editGeneralForumTopic(w(this.chatId, "editGeneralForumTopic"), e, t);
  }
  closeGeneralForumTopic(e) {
    return this.api.closeGeneralForumTopic(w(this.chatId, "closeGeneralForumTopic"), e);
  }
  reopenGeneralForumTopic(e) {
    return this.api.reopenGeneralForumTopic(w(this.chatId, "reopenGeneralForumTopic"), e);
  }
  hideGeneralForumTopic(e) {
    return this.api.hideGeneralForumTopic(w(this.chatId, "hideGeneralForumTopic"), e);
  }
  unhideGeneralForumTopic(e) {
    return this.api.unhideGeneralForumTopic(w(this.chatId, "unhideGeneralForumTopic"), e);
  }
  unpinAllGeneralForumTopicMessages(e) {
    return this.api.unpinAllGeneralForumTopicMessages(w(this.chatId, "unpinAllGeneralForumTopicMessages"), e);
  }
  answerCallbackQuery(e, t) {
    return this.api.answerCallbackQuery(w(this.callbackQuery, "answerCallbackQuery").id, typeof e == "string" ? {
      text: e
    } : e, t);
  }
  setChatMenuButton(e, t) {
    return this.api.setChatMenuButton(e, t);
  }
  getChatMenuButton(e, t) {
    return this.api.getChatMenuButton(e, t);
  }
  setMyDefaultAdministratorRights(e, t) {
    return this.api.setMyDefaultAdministratorRights(e, t);
  }
  getMyDefaultAdministratorRights(e, t) {
    return this.api.getMyDefaultAdministratorRights(e, t);
  }
  editMessageText(e, t, r) {
    var c, l, p;
    const a = this.inlineMessageId;
    return a !== void 0 ? this.api.editMessageTextInline(a, e, {
      business_connection_id: this.businessConnectionId,
      ...t
    }, r) : this.api.editMessageText(w(this.chatId, "editMessageText"), w(((c = this.msg) == null ? void 0 : c.message_id) ?? ((l = this.messageReaction) == null ? void 0 : l.message_id) ?? ((p = this.messageReactionCount) == null ? void 0 : p.message_id), "editMessageText"), e, {
      business_connection_id: this.businessConnectionId,
      ...t
    }, r);
  }
  editMessageCaption(e, t) {
    var a, c, l;
    const r = this.inlineMessageId;
    return r !== void 0 ? this.api.editMessageCaptionInline(r, {
      business_connection_id: this.businessConnectionId,
      ...e
    }, t) : this.api.editMessageCaption(w(this.chatId, "editMessageCaption"), w(((a = this.msg) == null ? void 0 : a.message_id) ?? ((c = this.messageReaction) == null ? void 0 : c.message_id) ?? ((l = this.messageReactionCount) == null ? void 0 : l.message_id), "editMessageCaption"), {
      business_connection_id: this.businessConnectionId,
      ...e
    }, t);
  }
  editMessageMedia(e, t, r) {
    var c, l, p;
    const a = this.inlineMessageId;
    return a !== void 0 ? this.api.editMessageMediaInline(a, e, {
      business_connection_id: this.businessConnectionId,
      ...t
    }, r) : this.api.editMessageMedia(w(this.chatId, "editMessageMedia"), w(((c = this.msg) == null ? void 0 : c.message_id) ?? ((l = this.messageReaction) == null ? void 0 : l.message_id) ?? ((p = this.messageReactionCount) == null ? void 0 : p.message_id), "editMessageMedia"), e, {
      business_connection_id: this.businessConnectionId,
      ...t
    }, r);
  }
  editMessageReplyMarkup(e, t) {
    var a, c, l;
    const r = this.inlineMessageId;
    return r !== void 0 ? this.api.editMessageReplyMarkupInline(r, {
      business_connection_id: this.businessConnectionId,
      ...e
    }, t) : this.api.editMessageReplyMarkup(w(this.chatId, "editMessageReplyMarkup"), w(((a = this.msg) == null ? void 0 : a.message_id) ?? ((c = this.messageReaction) == null ? void 0 : c.message_id) ?? ((l = this.messageReactionCount) == null ? void 0 : l.message_id), "editMessageReplyMarkup"), {
      business_connection_id: this.businessConnectionId,
      ...e
    }, t);
  }
  stopPoll(e, t) {
    var r, a, c;
    return this.api.stopPoll(w(this.chatId, "stopPoll"), w(((r = this.msg) == null ? void 0 : r.message_id) ?? ((a = this.messageReaction) == null ? void 0 : a.message_id) ?? ((c = this.messageReactionCount) == null ? void 0 : c.message_id), "stopPoll"), {
      business_connection_id: this.businessConnectionId,
      ...e
    }, t);
  }
  deleteMessage(e) {
    var t, r, a;
    return this.api.deleteMessage(w(this.chatId, "deleteMessage"), w(((t = this.msg) == null ? void 0 : t.message_id) ?? ((r = this.messageReaction) == null ? void 0 : r.message_id) ?? ((a = this.messageReactionCount) == null ? void 0 : a.message_id), "deleteMessage"), e);
  }
  deleteMessages(e, t) {
    return this.api.deleteMessages(w(this.chatId, "deleteMessages"), e, t);
  }
  deleteBusinessMessages(e, t) {
    return this.api.deleteBusinessMessages(w(this.businessConnectionId, "deleteBusinessMessages"), e, t);
  }
  setBusinessAccountName(e, t, r) {
    return this.api.setBusinessAccountName(w(this.businessConnectionId, "setBusinessAccountName"), e, t, r);
  }
  setBusinessAccountUsername(e, t) {
    return this.api.setBusinessAccountUsername(w(this.businessConnectionId, "setBusinessAccountUsername"), e, t);
  }
  setBusinessAccountBio(e, t) {
    return this.api.setBusinessAccountBio(w(this.businessConnectionId, "setBusinessAccountBio"), e, t);
  }
  setBusinessAccountProfilePhoto(e, t, r) {
    return this.api.setBusinessAccountProfilePhoto(w(this.businessConnectionId, "setBusinessAccountProfilePhoto"), e, t, r);
  }
  removeBusinessAccountProfilePhoto(e, t) {
    return this.api.removeBusinessAccountProfilePhoto(w(this.businessConnectionId, "removeBusinessAccountProfilePhoto"), e, t);
  }
  setBusinessAccountGiftSettings(e, t, r) {
    return this.api.setBusinessAccountGiftSettings(w(this.businessConnectionId, "setBusinessAccountGiftSettings"), e, t, r);
  }
  getBusinessAccountStarBalance(e) {
    return this.api.getBusinessAccountStarBalance(w(this.businessConnectionId, "getBusinessAccountStarBalance"), e);
  }
  transferBusinessAccountStars(e, t) {
    return this.api.transferBusinessAccountStars(w(this.businessConnectionId, "transferBusinessAccountStars"), e, t);
  }
  getBusinessAccountGifts(e, t) {
    return this.api.getBusinessAccountGifts(w(this.businessConnectionId, "getBusinessAccountGifts"), e, t);
  }
  convertGiftToStars(e, t) {
    return this.api.convertGiftToStars(w(this.businessConnectionId, "convertGiftToStars"), e, t);
  }
  upgradeGift(e, t, r) {
    return this.api.upgradeGift(w(this.businessConnectionId, "upgradeGift"), e, t, r);
  }
  transferGift(e, t, r, a) {
    return this.api.transferGift(w(this.businessConnectionId, "transferGift"), e, t, r, a);
  }
  postStory(e, t, r, a) {
    return this.api.postStory(w(this.businessConnectionId, "postStory"), e, t, r, a);
  }
  editStory(e, t, r, a) {
    return this.api.editStory(w(this.businessConnectionId, "editStory"), e, t, r, a);
  }
  deleteStory(e, t) {
    return this.api.deleteStory(w(this.businessConnectionId, "deleteStory"), e, t);
  }
  replyWithSticker(e, t, r) {
    return this.api.sendSticker(w(this.chatId, "sendSticker"), e, {
      business_connection_id: this.businessConnectionId,
      ...t
    }, r);
  }
  getCustomEmojiStickers(e) {
    var t;
    return this.api.getCustomEmojiStickers((((t = this.msg) == null ? void 0 : t.entities) ?? []).filter((r) => r.type === "custom_emoji").map((r) => r.custom_emoji_id), e);
  }
  replyWithGift(e, t, r) {
    return this.api.sendGift(w(this.from, "sendGift").id, e, t, r);
  }
  giftPremiumSubscription(e, t, r, a) {
    return this.api.giftPremiumSubscription(w(this.from, "giftPremiumSubscription").id, e, t, r, a);
  }
  replyWithGiftToChannel(e, t, r) {
    return this.api.sendGiftToChannel(w(this.chat, "sendGift").id, e, t, r);
  }
  answerInlineQuery(e, t, r) {
    return this.api.answerInlineQuery(w(this.inlineQuery, "answerInlineQuery").id, e, t, r);
  }
  savePreparedInlineMessage(e, t, r) {
    return this.api.savePreparedInlineMessage(w(this.from, "savePreparedInlineMessage").id, e, t, r);
  }
  replyWithInvoice(e, t, r, a, c, l, p) {
    return this.api.sendInvoice(w(this.chatId, "sendInvoice"), e, t, r, a, c, l, p);
  }
  answerShippingQuery(e, t, r) {
    return this.api.answerShippingQuery(w(this.shippingQuery, "answerShippingQuery").id, e, t, r);
  }
  answerPreCheckoutQuery(e, t, r) {
    return this.api.answerPreCheckoutQuery(w(this.preCheckoutQuery, "answerPreCheckoutQuery").id, e, typeof t == "string" ? {
      error_message: t
    } : t, r);
  }
  refundStarPayment(e) {
    var t;
    return this.api.refundStarPayment(w(this.from, "refundStarPayment").id, w((t = this.msg) == null ? void 0 : t.successful_payment, "refundStarPayment").telegram_payment_charge_id, e);
  }
  editUserStarSubscription(e, t, r) {
    return this.api.editUserStarSubscription(w(this.from, "editUserStarSubscription").id, e, t, r);
  }
  verifyUser(e, t) {
    return this.api.verifyUser(w(this.from, "verifyUser").id, e, t);
  }
  verifyChat(e, t) {
    return this.api.verifyChat(w(this.chatId, "verifyChat"), e, t);
  }
  removeUserVerification(e) {
    return this.api.removeUserVerification(w(this.from, "removeUserVerification").id, e);
  }
  removeChatVerification(e) {
    return this.api.removeChatVerification(w(this.chatId, "removeChatVerification"), e);
  }
  readBusinessMessage(e) {
    return this.api.readBusinessMessage(w(this.businessConnectionId, "readBusinessMessage"), w(this.chatId, "readBusinessMessage"), w(this.msgId, "readBusinessMessage"), e);
  }
  setPassportDataErrors(e, t) {
    return this.api.setPassportDataErrors(w(this.from, "setPassportDataErrors").id, e, t);
  }
  replyWithGame(e, t, r) {
    return this.api.sendGame(w(this.chatId, "sendGame"), e, {
      business_connection_id: this.businessConnectionId,
      ...t
    }, r);
  }
};
I(ae, "has", we);
let oe = ae;
function w(s, e) {
  if (s === void 0)
    throw new Error(`Missing information for API call to ${e}`);
  return s;
}
function Le(s) {
  return Qt(s).map((e) => typeof e == "string" ? (t) => t === e ? e : null : (t) => t.match(e));
}
function Pe(s, e, t) {
  for (const r of t) {
    const a = r(e);
    if (a)
      return s.match = a, !0;
  }
  return !1;
}
function Qt(s) {
  return Array.isArray(s) ? s : [
    s
  ];
}
class Wn extends Error {
  constructor(t, r) {
    super(ru(t));
    I(this, "error");
    I(this, "ctx");
    this.error = t, this.ctx = r, this.name = "BotError", t instanceof Error && (this.stack = t.stack);
  }
}
function ru(s) {
  let e;
  if (s instanceof Error)
    e = `${s.name} in middleware: ${s.message}`;
  else {
    const t = typeof s;
    switch (e = `Non-error value of type ${t} thrown in middleware`, t) {
      case "bigint":
      case "boolean":
      case "number":
      case "symbol":
        e += `: ${s}`;
        break;
      case "string":
        e += `: ${String(s).substring(0, 50)}`;
        break;
      default:
        e += "!";
        break;
    }
  }
  return e;
}
function It(s) {
  return typeof s == "function" ? s : (e, t) => s.middleware()(e, t);
}
function Ms(s, e) {
  return async (t, r) => {
    let a = !1;
    await s(t, async () => {
      if (a) throw new Error("`next` already called before!");
      a = !0, await e(t, r);
    });
  };
}
function Dn(s, e) {
  return e();
}
const su = () => Promise.resolve();
async function hi(s, e) {
  await s(e, su);
}
class Ae {
  constructor(...e) {
    I(this, "handler");
    this.handler = e.length === 0 ? Dn : e.map(It).reduce(Ms);
  }
  middleware() {
    return this.handler;
  }
  use(...e) {
    const t = new Ae(...e);
    return this.handler = Ms(this.handler, It(t)), t;
  }
  on(e, ...t) {
    return this.filter(oe.has.filterQuery(e), ...t);
  }
  hears(e, ...t) {
    return this.filter(oe.has.text(e), ...t);
  }
  command(e, ...t) {
    return this.filter(oe.has.command(e), ...t);
  }
  reaction(e, ...t) {
    return this.filter(oe.has.reaction(e), ...t);
  }
  chatType(e, ...t) {
    return this.filter(oe.has.chatType(e), ...t);
  }
  callbackQuery(e, ...t) {
    return this.filter(oe.has.callbackQuery(e), ...t);
  }
  gameQuery(e, ...t) {
    return this.filter(oe.has.gameQuery(e), ...t);
  }
  inlineQuery(e, ...t) {
    return this.filter(oe.has.inlineQuery(e), ...t);
  }
  chosenInlineResult(e, ...t) {
    return this.filter(oe.has.chosenInlineResult(e), ...t);
  }
  preCheckoutQuery(e, ...t) {
    return this.filter(oe.has.preCheckoutQuery(e), ...t);
  }
  shippingQuery(e, ...t) {
    return this.filter(oe.has.shippingQuery(e), ...t);
  }
  filter(e, ...t) {
    const r = new Ae(...t);
    return this.branch(e, r, Dn), r;
  }
  drop(e, ...t) {
    return this.filter(async (r) => !await e(r), ...t);
  }
  fork(...e) {
    const t = new Ae(...e), r = It(t);
    return this.use((a, c) => Promise.all([
      c(),
      hi(r, a)
    ])), t;
  }
  lazy(e) {
    return this.use(async (t, r) => {
      const a = await e(t), c = Array.isArray(a) ? a : [
        a
      ];
      await It(new Ae(...c))(t, r);
    });
  }
  route(e, t, r = Dn) {
    return this.lazy(async (a) => {
      const c = await e(a);
      return (c === void 0 || !t[c] ? r : t[c]) ?? [];
    });
  }
  branch(e, t, r) {
    return this.lazy(async (a) => await e(a) ? t : r);
  }
  errorBoundary(e, ...t) {
    const r = new Ae(...t), a = It(r);
    return this.use(async (c, l) => {
      let p = !1;
      const d = () => (p = !0, Promise.resolve());
      try {
        await a(c, d);
      } catch (g) {
        p = !1, await e(new Wn(g, c), d);
      }
      p && await l();
    }), r;
  }
}
var ct = 1e3, lt = ct * 60, ht = lt * 60, qe = ht * 24, iu = qe * 7, au = qe * 365.25, ou = function(s, e) {
  e = e || {};
  var t = typeof s;
  if (t === "string" && s.length > 0)
    return uu(s);
  if (t === "number" && isFinite(s))
    return e.long ? lu(s) : cu(s);
  throw new Error("val is not a non-empty string or a valid number. val=" + JSON.stringify(s));
};
function uu(s) {
  if (s = String(s), !(s.length > 100)) {
    var e = /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(s);
    if (e) {
      var t = parseFloat(e[1]), r = (e[2] || "ms").toLowerCase();
      switch (r) {
        case "years":
        case "year":
        case "yrs":
        case "yr":
        case "y":
          return t * au;
        case "weeks":
        case "week":
        case "w":
          return t * iu;
        case "days":
        case "day":
        case "d":
          return t * qe;
        case "hours":
        case "hour":
        case "hrs":
        case "hr":
        case "h":
          return t * ht;
        case "minutes":
        case "minute":
        case "mins":
        case "min":
        case "m":
          return t * lt;
        case "seconds":
        case "second":
        case "secs":
        case "sec":
        case "s":
          return t * ct;
        case "milliseconds":
        case "millisecond":
        case "msecs":
        case "msec":
        case "ms":
          return t;
        default:
          return;
      }
    }
  }
}
function cu(s) {
  var e = Math.abs(s);
  return e >= qe ? Math.round(s / qe) + "d" : e >= ht ? Math.round(s / ht) + "h" : e >= lt ? Math.round(s / lt) + "m" : e >= ct ? Math.round(s / ct) + "s" : s + "ms";
}
function lu(s) {
  var e = Math.abs(s);
  return e >= qe ? Ht(s, e, qe, "day") : e >= ht ? Ht(s, e, ht, "hour") : e >= lt ? Ht(s, e, lt, "minute") : e >= ct ? Ht(s, e, ct, "second") : s + " ms";
}
function Ht(s, e, t, r) {
  var a = e >= t * 1.5;
  return Math.round(s / t) + " " + r + (a ? "s" : "");
}
function di() {
  throw new Error("setTimeout has not been defined");
}
function fi() {
  throw new Error("clearTimeout has not been defined");
}
var Oe = di, De = fi, ot;
typeof window < "u" ? ot = window : typeof self < "u" ? ot = self : ot = {};
typeof ot.setTimeout == "function" && (Oe = setTimeout);
typeof ot.clearTimeout == "function" && (De = clearTimeout);
function mi(s) {
  if (Oe === setTimeout)
    return setTimeout(s, 0);
  if ((Oe === di || !Oe) && setTimeout)
    return Oe = setTimeout, setTimeout(s, 0);
  try {
    return Oe(s, 0);
  } catch {
    try {
      return Oe.call(null, s, 0);
    } catch {
      return Oe.call(this, s, 0);
    }
  }
}
function hu(s) {
  if (De === clearTimeout)
    return clearTimeout(s);
  if ((De === fi || !De) && clearTimeout)
    return De = clearTimeout, clearTimeout(s);
  try {
    return De(s);
  } catch {
    try {
      return De.call(null, s);
    } catch {
      return De.call(this, s);
    }
  }
}
var Ce = [], ut = !1, We, Zt = -1;
function du() {
  !ut || !We || (ut = !1, We.length ? Ce = We.concat(Ce) : Zt = -1, Ce.length && pi());
}
function pi() {
  if (!ut) {
    var s = mi(du);
    ut = !0;
    for (var e = Ce.length; e; ) {
      for (We = Ce, Ce = []; ++Zt < e; )
        We && We[Zt].run();
      Zt = -1, e = Ce.length;
    }
    We = null, ut = !1, hu(s);
  }
}
function fu(s) {
  var e = new Array(arguments.length - 1);
  if (arguments.length > 1)
    for (var t = 1; t < arguments.length; t++)
      e[t - 1] = arguments[t];
  Ce.push(new gi(s, e)), Ce.length === 1 && !ut && mi(pi);
}
function gi(s, e) {
  this.fun = s, this.array = e;
}
gi.prototype.run = function() {
  this.fun.apply(null, this.array);
};
var mu = "browser", pu = "browser", gu = !0, yu = [], wu = "", bu = {}, vu = {}, Cu = {};
function Ge() {
}
var Su = Ge, Tu = Ge, _u = Ge, Eu = Ge, Iu = Ge, ku = Ge, Mu = Ge;
function Ou(s) {
  throw new Error("process.binding is not supported");
}
function Du() {
  return "/";
}
function Au(s) {
  throw new Error("process.chdir is not supported");
}
function Nu() {
  return 0;
}
var it = ot.performance || {}, Fu = it.now || it.mozNow || it.msNow || it.oNow || it.webkitNow || function() {
  return (/* @__PURE__ */ new Date()).getTime();
};
function Ru(s) {
  var e = Fu.call(it) * 1e-3, t = Math.floor(e), r = Math.floor(e % 1 * 1e9);
  return s && (t = t - s[0], r = r - s[1], r < 0 && (t--, r += 1e9)), [
    t,
    r
  ];
}
var $u = /* @__PURE__ */ new Date();
function xu() {
  var s = /* @__PURE__ */ new Date(), e = s - $u;
  return e / 1e3;
}
var An = {
  nextTick: fu,
  title: mu,
  browser: gu,
  env: {
    NODE_ENV: "production"
  },
  argv: yu,
  version: wu,
  versions: bu,
  on: Su,
  addListener: Tu,
  once: _u,
  off: Eu,
  removeListener: Iu,
  removeAllListeners: ku,
  emit: Mu,
  binding: Ou,
  cwd: Du,
  chdir: Au,
  umask: Nu,
  hrtime: Ru,
  platform: pu,
  release: vu,
  config: Cu,
  uptime: xu
};
function Lu(s, e, t) {
  return t = {
    path: e,
    exports: {},
    require: function(r, a) {
      return Pu(r, a ?? t.path);
    }
  }, s(t, t.exports), t.exports;
}
function Pu() {
  throw new Error("Dynamic requires are not currently supported by @rollup/plugin-commonjs");
}
function Vu(s) {
  t.debug = t, t.default = t, t.coerce = d, t.disable = c, t.enable = a, t.enabled = l, t.humanize = ou, t.destroy = g, Object.keys(s).forEach((v) => {
    t[v] = s[v];
  }), t.names = [], t.skips = [], t.formatters = {};
  function e(v) {
    let C = 0;
    for (let _ = 0; _ < v.length; _++)
      C = (C << 5) - C + v.charCodeAt(_), C |= 0;
    return t.colors[Math.abs(C) % t.colors.length];
  }
  t.selectColor = e;
  function t(v) {
    let C, _ = null, N, E;
    function k(...L) {
      if (!k.enabled)
        return;
      const x = k, J = Number(/* @__PURE__ */ new Date()), ee = J - (C || J);
      x.diff = ee, x.prev = C, x.curr = J, C = J, L[0] = t.coerce(L[0]), typeof L[0] != "string" && L.unshift("%O");
      let F = 0;
      L[0] = L[0].replace(/%([a-zA-Z%])/g, ($, R) => {
        if ($ === "%%")
          return "%";
        F++;
        const j = t.formatters[R];
        if (typeof j == "function") {
          const Y = L[F];
          $ = j.call(x, Y), L.splice(F, 1), F--;
        }
        return $;
      }), t.formatArgs.call(x, L), (x.log || t.log).apply(x, L);
    }
    return k.namespace = v, k.useColors = t.useColors(), k.color = t.selectColor(v), k.extend = r, k.destroy = t.destroy, Object.defineProperty(k, "enabled", {
      enumerable: !0,
      configurable: !1,
      get: () => _ !== null ? _ : (N !== t.namespaces && (N = t.namespaces, E = t.enabled(v)), E),
      set: (L) => {
        _ = L;
      }
    }), typeof t.init == "function" && t.init(k), k;
  }
  function r(v, C) {
    const _ = t(this.namespace + (typeof C > "u" ? ":" : C) + v);
    return _.log = this.log, _;
  }
  function a(v) {
    t.save(v), t.namespaces = v, t.names = [], t.skips = [];
    let C;
    const _ = (typeof v == "string" ? v : "").split(/[\s,]+/), N = _.length;
    for (C = 0; C < N; C++)
      _[C] && (v = _[C].replace(/\*/g, ".*?"), v[0] === "-" ? t.skips.push(new RegExp("^" + v.slice(1) + "$")) : t.names.push(new RegExp("^" + v + "$")));
  }
  function c() {
    const v = [
      ...t.names.map(p),
      ...t.skips.map(p).map((C) => "-" + C)
    ].join(",");
    return t.enable(""), v;
  }
  function l(v) {
    if (v[v.length - 1] === "*")
      return !0;
    let C, _;
    for (C = 0, _ = t.skips.length; C < _; C++)
      if (t.skips[C].test(v))
        return !1;
    for (C = 0, _ = t.names.length; C < _; C++)
      if (t.names[C].test(v))
        return !0;
    return !1;
  }
  function p(v) {
    return v.toString().substring(2, v.toString().length - 2).replace(/\.\*\?$/, "*");
  }
  function d(v) {
    return v instanceof Error ? v.stack || v.message : v;
  }
  function g() {
    console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.");
  }
  return t.enable(t.load()), t;
}
var Bu = Vu, se = Lu(function(s, e) {
  e.formatArgs = r, e.save = a, e.load = c, e.useColors = t, e.storage = l(), e.destroy = /* @__PURE__ */ (() => {
    let d = !1;
    return () => {
      d || (d = !0, console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."));
    };
  })(), e.colors = [
    "#0000CC",
    "#0000FF",
    "#0033CC",
    "#0033FF",
    "#0066CC",
    "#0066FF",
    "#0099CC",
    "#0099FF",
    "#00CC00",
    "#00CC33",
    "#00CC66",
    "#00CC99",
    "#00CCCC",
    "#00CCFF",
    "#3300CC",
    "#3300FF",
    "#3333CC",
    "#3333FF",
    "#3366CC",
    "#3366FF",
    "#3399CC",
    "#3399FF",
    "#33CC00",
    "#33CC33",
    "#33CC66",
    "#33CC99",
    "#33CCCC",
    "#33CCFF",
    "#6600CC",
    "#6600FF",
    "#6633CC",
    "#6633FF",
    "#66CC00",
    "#66CC33",
    "#9900CC",
    "#9900FF",
    "#9933CC",
    "#9933FF",
    "#99CC00",
    "#99CC33",
    "#CC0000",
    "#CC0033",
    "#CC0066",
    "#CC0099",
    "#CC00CC",
    "#CC00FF",
    "#CC3300",
    "#CC3333",
    "#CC3366",
    "#CC3399",
    "#CC33CC",
    "#CC33FF",
    "#CC6600",
    "#CC6633",
    "#CC9900",
    "#CC9933",
    "#CCCC00",
    "#CCCC33",
    "#FF0000",
    "#FF0033",
    "#FF0066",
    "#FF0099",
    "#FF00CC",
    "#FF00FF",
    "#FF3300",
    "#FF3333",
    "#FF3366",
    "#FF3399",
    "#FF33CC",
    "#FF33FF",
    "#FF6600",
    "#FF6633",
    "#FF9900",
    "#FF9933",
    "#FFCC00",
    "#FFCC33"
  ];
  function t() {
    return typeof window < "u" && window.process && (window.process.type === "renderer" || window.process.__nwjs) ? !0 : typeof navigator < "u" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/) ? !1 : typeof document < "u" && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance || typeof window < "u" && window.console && (window.console.firebug || window.console.exception && window.console.table) || typeof navigator < "u" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31 || typeof navigator < "u" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/);
  }
  function r(d) {
    if (d[0] = (this.useColors ? "%c" : "") + this.namespace + (this.useColors ? " %c" : " ") + d[0] + (this.useColors ? "%c " : " ") + "+" + s.exports.humanize(this.diff), !this.useColors)
      return;
    const g = "color: " + this.color;
    d.splice(1, 0, g, "color: inherit");
    let v = 0, C = 0;
    d[0].replace(/%[a-zA-Z%]/g, (_) => {
      _ !== "%%" && (v++, _ === "%c" && (C = v));
    }), d.splice(C, 0, g);
  }
  e.log = console.debug || console.log || (() => {
  });
  function a(d) {
    try {
      d ? e.storage.setItem("debug", d) : e.storage.removeItem("debug");
    } catch {
    }
  }
  function c() {
    let d;
    try {
      d = e.storage.getItem("debug");
    } catch {
    }
    return !d && typeof An < "u" && "env" in An && (d = An.env.DEBUG), d;
  }
  function l() {
    try {
      return localStorage;
    } catch {
    }
  }
  s.exports = Bu(e);
  const { formatters: p } = s.exports;
  p.j = function(d) {
    try {
      return JSON.stringify(d);
    } catch (g) {
      return "[UnexpectedJSONParseError]: " + g.message;
    }
  };
});
se.colors;
se.destroy;
se.formatArgs;
se.load;
se.log;
se.save;
se.storage;
se.useColors;
const Uu = (s) => {
  const e = s[Symbol.asyncIterator]();
  return new ReadableStream({
    async pull(t) {
      const r = await e.next();
      r.done ? t.close() : t.enqueue(r.value);
    }
  });
}, Wu = (s) => ({}), Os = se("grammy:warn");
class rr extends Error {
  constructor(t, r, a, c) {
    super(`${t} (${r.error_code}: ${r.description})`);
    I(this, "method");
    I(this, "payload");
    I(this, "ok");
    I(this, "error_code");
    I(this, "description");
    I(this, "parameters");
    this.method = a, this.payload = c, this.ok = !1, this.name = "GrammyError", this.error_code = r.error_code, this.description = r.description, this.parameters = r.parameters ?? {};
  }
}
function ju(s, e, t) {
  switch (s.error_code) {
    case 401:
      Os("Error 401 means that your bot token is wrong, talk to https://t.me/BotFather to check it.");
      break;
    case 409:
      Os("Error 409 means that you are running your bot several times on long polling. Consider revoking the bot token if you believe that no other instance is running.");
      break;
  }
  return new rr(`Call to '${e}' failed!`, s, e, t);
}
class yi extends Error {
  constructor(t, r) {
    super(t);
    I(this, "error");
    this.error = r, this.name = "HttpError";
  }
}
function qu(s) {
  return typeof s == "object" && s !== null && "status" in s && "statusText" in s;
}
function Gu(s, e) {
  return (t) => {
    let r = `Network request for '${s}' failed!`;
    throw qu(t) && (r += ` (${t.status}: ${t.statusText})`), e && t instanceof Error && (r += ` ${t.message}`), new yi(r, t);
  };
}
const Hu = (() => {
  var t, r, a;
  const { Deno: s } = globalThis;
  if (typeof ((t = s == null ? void 0 : s.build) == null ? void 0 : t.os) == "string")
    return s.build.os;
  const { navigator: e } = globalThis;
  return (a = (r = e == null ? void 0 : e.appVersion) == null ? void 0 : r.includes) != null && a.call(r, "Win") ? "windows" : "linux";
})(), zu = Hu === "windows";
function Yu(s) {
  if (typeof s != "string")
    throw new TypeError(`Path must be a string. Received ${JSON.stringify(s)}`);
}
function wi(s, e) {
  if (e.length >= s.length)
    return s;
  const t = s.length - e.length;
  for (let r = e.length - 1; r >= 0; --r)
    if (s.charCodeAt(t + r) !== e.charCodeAt(r))
      return s;
  return s.slice(0, -e.length);
}
function bi(s, e, t = 0) {
  let r = !1, a = s.length;
  for (let c = s.length - 1; c >= t; --c)
    if (e(s.charCodeAt(c))) {
      if (r) {
        t = c + 1;
        break;
      }
    } else r || (r = !0, a = c + 1);
  return s.slice(t, a);
}
function vi(s, e) {
  if (Yu(s), s.length === 0) return s;
  if (typeof e != "string")
    throw new TypeError(`Suffix must be a string. Received ${JSON.stringify(e)}`);
}
function Ci(s, e) {
  if (s.length <= 1)
    return s;
  let t = s.length;
  for (let r = s.length - 1; r > 0 && e(s.charCodeAt(r)); r--)
    t = r;
  return s.slice(0, t);
}
function Ds(s) {
  return s === 47;
}
function Zu(s, e = "") {
  vi(s, e);
  const t = bi(s, Ds), r = Ci(t, Ds);
  return e ? wi(r, e) : r;
}
function As(s) {
  return s === 47 || s === 92;
}
function Ku(s) {
  return s >= 97 && s <= 122 || s >= 65 && s <= 90;
}
function Qu(s, e = "") {
  vi(s, e);
  let t = 0;
  if (s.length >= 2) {
    const c = s.charCodeAt(0);
    Ku(c) && s.charCodeAt(1) === 58 && (t = 2);
  }
  const r = bi(s, As, t), a = Ci(r, As);
  return e ? wi(a, e) : a;
}
function zt(s, e = "") {
  return zu ? Qu(s, e) : Zu(s, e);
}
class jn {
  constructor(e, t) {
    I(this, "consumed", !1);
    I(this, "fileData");
    I(this, "filename");
    this.fileData = e, t ?? (t = this.guessFilename(e)), this.filename = t;
  }
  guessFilename(e) {
    if (typeof e == "string") return zt(e);
    if (typeof e == "object") {
      if ("url" in e) return zt(e.url);
      if (e instanceof URL)
        return zt(e.pathname) || zt(e.hostname);
    }
  }
  toRaw() {
    if (this.consumed)
      throw new Error("Cannot reuse InputFile data source!");
    const e = this.fileData;
    return e instanceof Blob ? e.stream() : e instanceof URL ? Ns(e) : "url" in e ? Ns(e.url) : (e instanceof Uint8Array || (this.consumed = !0), e);
  }
}
async function* Ns(s) {
  const { body: e } = await fetch(s);
  if (e === null)
    throw new Error(`Download failed, no response body from '${s}'`);
  yield* e;
}
function qn(s) {
  return s instanceof jn || typeof s == "object" && s !== null && Object.values(s).some((e) => Array.isArray(e) ? e.some(qn) : e instanceof jn || qn(e));
}
function Si(s) {
  return JSON.stringify(s, (e, t) => t ?? void 0);
}
function Fs(s) {
  return {
    method: "POST",
    headers: {
      "content-type": "application/json",
      connection: "keep-alive"
    },
    body: Si(s)
  };
}
async function* Ju(s, e) {
  try {
    yield* s;
  } catch (t) {
    e(t);
  }
}
function Xu(s, e) {
  const t = ec(), r = tc(s, t), a = Ju(r, e), c = Uu(a);
  return {
    method: "POST",
    headers: {
      "content-type": `multipart/form-data; boundary=${t}`,
      connection: "keep-alive"
    },
    body: c
  };
}
function ec() {
  return "----------" + Ti(32);
}
function Ti(s = 16) {
  return Array.from(Array(s)).map(() => Math.random().toString(36)[2] || 0).join("");
}
const Dt = new TextEncoder();
async function* tc(s, e) {
  const t = Gn(s);
  yield Dt.encode(`--${e}\r
`);
  const r = Dt.encode(`\r
--${e}\r
`);
  let a = !0;
  for (const [c, l] of Object.entries(s))
    l != null && (a || (yield r), yield nc(c, typeof l == "object" ? Si(l) : l), a = !1);
  for (const { id: c, origin: l, file: p } of t)
    a || (yield r), yield* rc(c, l, p), a = !1;
  yield Dt.encode(`\r
--${e}--\r
`);
}
function Gn(s) {
  return typeof s != "object" || s === null ? [] : Object.entries(s).flatMap(([e, t]) => {
    if (Array.isArray(t)) return t.flatMap((r) => Gn(r));
    if (t instanceof jn) {
      const r = Ti();
      Object.assign(s, {
        [e]: `attach://${r}`
      });
      const a = e === "media" && "type" in s && typeof s.type == "string" ? s.type : e;
      return {
        id: r,
        origin: a,
        file: t
      };
    } else return Gn(t);
  });
}
function nc(s, e) {
  return Dt.encode(`content-disposition:form-data;name="${s}"\r
\r
${e}`);
}
async function* rc(s, e, t) {
  const r = t.filename || `${e}.${sc(e)}`;
  if (r.includes("\r") || r.includes(`
`))
    throw new Error(`File paths cannot contain carriage-return (\\r) or newline (\\n) characters! Filename for property '${e}' was:
"""
${r}
"""`);
  yield Dt.encode(`content-disposition:form-data;name="${s}";filename=${r}\r
content-type:application/octet-stream\r
\r
`);
  const a = await t.toRaw();
  a instanceof Uint8Array ? yield a : yield* a;
}
function sc(s) {
  switch (s) {
    case "certificate":
      return "pem";
    case "photo":
    case "thumbnail":
      return "jpg";
    case "voice":
      return "ogg";
    case "audio":
      return "mp3";
    case "animation":
    case "video":
    case "video_note":
      return "mp4";
    case "sticker":
      return "webp";
    default:
      return "dat";
  }
}
const ic = se("grammy:core");
function ac(s, e) {
  return (t, r, a) => e(s, t, r, a);
}
class oc {
  constructor(e, t = {}, r = {}) {
    I(this, "token");
    I(this, "webhookReplyEnvelope");
    I(this, "options");
    I(this, "fetch");
    I(this, "hasUsedWebhookReply");
    I(this, "installedTransformers");
    I(this, "call");
    this.token = e, this.webhookReplyEnvelope = r, this.hasUsedWebhookReply = !1, this.installedTransformers = [], this.call = async (d, g, v) => {
      const C = g ?? {};
      ic(`Calling ${d}`), v !== void 0 && mc(d, C, v);
      const _ = this.options, N = qn(C);
      if (this.webhookReplyEnvelope.send !== void 0 && !this.hasUsedWebhookReply && !N && _.canUseWebhookReply(d)) {
        this.hasUsedWebhookReply = !0;
        const R = Fs({
          ...C,
          method: d
        });
        return await this.webhookReplyEnvelope.send(R.body), {
          ok: !0,
          result: !0
        };
      }
      const E = fc(v), k = hc(E, _.timeoutSeconds, d), L = dc(E), x = _.buildUrl(_.apiRoot, this.token, d, _.environment), J = N ? Xu(C, (R) => L.catch(R)) : Fs(C), ee = E.signal, F = {
        ..._.baseFetchConfig,
        signal: ee,
        ...J
      }, $ = [
        this.fetch(x instanceof URL ? x.href : x, F).catch(Gu(d, _.sensitiveLogs)),
        L.promise,
        k.promise
      ];
      try {
        return await (await Promise.race($)).json();
      } finally {
        k.handle !== void 0 && clearTimeout(k.handle);
      }
    };
    const a = t.apiRoot ?? "https://api.telegram.org", c = t.environment ?? "prod", { fetch: l } = t, p = l ?? fetch;
    if (this.options = {
      apiRoot: a,
      environment: c,
      buildUrl: t.buildUrl ?? cc,
      timeoutSeconds: t.timeoutSeconds ?? 500,
      baseFetchConfig: {
        ...Wu(),
        ...t.baseFetchConfig
      },
      canUseWebhookReply: t.canUseWebhookReply ?? (() => !1),
      sensitiveLogs: t.sensitiveLogs ?? !1,
      fetch: (...d) => p(...d)
    }, this.fetch = this.options.fetch, this.options.apiRoot.endsWith("/"))
      throw new Error(`Remove the trailing '/' from the 'apiRoot' option (use '${this.options.apiRoot.substring(0, this.options.apiRoot.length - 1)}' instead of '${this.options.apiRoot}')`);
  }
  use(...e) {
    return this.call = e.reduce(ac, this.call), this.installedTransformers.push(...e), this;
  }
  async callApi(e, t, r) {
    const a = await this.call(e, t, r);
    if (a.ok) return a.result;
    throw ju(a, e, t);
  }
}
function uc(s, e, t) {
  const r = new oc(s, e, t), a = {
    get(d, g) {
      return g === "toJSON" ? "__internal" : g === "getMe" || g === "getWebhookInfo" || g === "getForumTopicIconStickers" || g === "getAvailableGifts" || g === "logOut" || g === "close" ? r.callApi.bind(r, g, {}) : r.callApi.bind(r, g);
    },
    ...lc
  }, c = new Proxy({}, a), l = r.installedTransformers, p = {
    raw: c,
    installedTransformers: l,
    use: (...d) => (r.use(...d), p)
  };
  return p;
}
const cc = (s, e, t, r) => `${s}/bot${e}/${r === "test" ? "test/" : ""}${t}`, lc = {
  set() {
    return !1;
  },
  defineProperty() {
    return !1;
  },
  deleteProperty() {
    return !1;
  },
  ownKeys() {
    return [];
  }
};
function hc(s, e, t) {
  let r;
  return {
    promise: new Promise((c, l) => {
      r = setTimeout(() => {
        const p = `Request to '${t}' timed out after ${e} seconds`;
        l(new Error(p)), s.abort();
      }, 1e3 * e);
    }),
    handle: r
  };
}
function dc(s) {
  let e = (r) => {
    throw r;
  };
  return {
    promise: new Promise((r, a) => {
      e = (c) => {
        a(c), s.abort();
      };
    }),
    catch: e
  };
}
function fc(s) {
  const e = new AbortController();
  if (s === void 0) return e;
  const t = s;
  function r() {
    e.abort(), t.removeEventListener("abort", r);
  }
  return t.aborted ? r() : t.addEventListener("abort", r), {
    abort: r,
    signal: e.signal
  };
}
function mc(s, e, t) {
  if (typeof (t == null ? void 0 : t.addEventListener) == "function")
    return;
  let r = JSON.stringify(e);
  r.length > 20 && (r = r.substring(0, 16) + " ...");
  let a = JSON.stringify(t);
  throw a.length > 20 && (a = a.substring(0, 16) + " ..."), new Error(`Incorrect abort signal instance found! You passed two payloads to '${s}' but you should merge the second one containing '${a}' into the first one containing '${r}'! If you are using context shortcuts, you may want to use a method on 'ctx.api' instead.

If you want to prevent such mistakes in the future, consider using TypeScript. https://www.typescriptlang.org/`);
}
class Rs {
  constructor(e, t, r) {
    I(this, "token");
    I(this, "options");
    I(this, "raw");
    I(this, "config");
    this.token = e, this.options = t;
    const { raw: a, use: c, installedTransformers: l } = uc(e, t, r);
    this.raw = a, this.config = {
      use: c,
      installedTransformers: () => l.slice()
    };
  }
  getUpdates(e, t) {
    return this.raw.getUpdates({
      ...e
    }, t);
  }
  setWebhook(e, t, r) {
    return this.raw.setWebhook({
      url: e,
      ...t
    }, r);
  }
  deleteWebhook(e, t) {
    return this.raw.deleteWebhook({
      ...e
    }, t);
  }
  getWebhookInfo(e) {
    return this.raw.getWebhookInfo(e);
  }
  getMe(e) {
    return this.raw.getMe(e);
  }
  logOut(e) {
    return this.raw.logOut(e);
  }
  close(e) {
    return this.raw.close(e);
  }
  sendMessage(e, t, r, a) {
    return this.raw.sendMessage({
      chat_id: e,
      text: t,
      ...r
    }, a);
  }
  forwardMessage(e, t, r, a, c) {
    return this.raw.forwardMessage({
      chat_id: e,
      from_chat_id: t,
      message_id: r,
      ...a
    }, c);
  }
  forwardMessages(e, t, r, a, c) {
    return this.raw.forwardMessages({
      chat_id: e,
      from_chat_id: t,
      message_ids: r,
      ...a
    }, c);
  }
  copyMessage(e, t, r, a, c) {
    return this.raw.copyMessage({
      chat_id: e,
      from_chat_id: t,
      message_id: r,
      ...a
    }, c);
  }
  copyMessages(e, t, r, a, c) {
    return this.raw.copyMessages({
      chat_id: e,
      from_chat_id: t,
      message_ids: r,
      ...a
    }, c);
  }
  sendPhoto(e, t, r, a) {
    return this.raw.sendPhoto({
      chat_id: e,
      photo: t,
      ...r
    }, a);
  }
  sendAudio(e, t, r, a) {
    return this.raw.sendAudio({
      chat_id: e,
      audio: t,
      ...r
    }, a);
  }
  sendDocument(e, t, r, a) {
    return this.raw.sendDocument({
      chat_id: e,
      document: t,
      ...r
    }, a);
  }
  sendVideo(e, t, r, a) {
    return this.raw.sendVideo({
      chat_id: e,
      video: t,
      ...r
    }, a);
  }
  sendAnimation(e, t, r, a) {
    return this.raw.sendAnimation({
      chat_id: e,
      animation: t,
      ...r
    }, a);
  }
  sendVoice(e, t, r, a) {
    return this.raw.sendVoice({
      chat_id: e,
      voice: t,
      ...r
    }, a);
  }
  sendVideoNote(e, t, r, a) {
    return this.raw.sendVideoNote({
      chat_id: e,
      video_note: t,
      ...r
    }, a);
  }
  sendMediaGroup(e, t, r, a) {
    return this.raw.sendMediaGroup({
      chat_id: e,
      media: t,
      ...r
    }, a);
  }
  sendLocation(e, t, r, a, c) {
    return this.raw.sendLocation({
      chat_id: e,
      latitude: t,
      longitude: r,
      ...a
    }, c);
  }
  editMessageLiveLocation(e, t, r, a, c, l) {
    return this.raw.editMessageLiveLocation({
      chat_id: e,
      message_id: t,
      latitude: r,
      longitude: a,
      ...c
    }, l);
  }
  editMessageLiveLocationInline(e, t, r, a, c) {
    return this.raw.editMessageLiveLocation({
      inline_message_id: e,
      latitude: t,
      longitude: r,
      ...a
    }, c);
  }
  stopMessageLiveLocation(e, t, r, a) {
    return this.raw.stopMessageLiveLocation({
      chat_id: e,
      message_id: t,
      ...r
    }, a);
  }
  stopMessageLiveLocationInline(e, t, r) {
    return this.raw.stopMessageLiveLocation({
      inline_message_id: e,
      ...t
    }, r);
  }
  sendPaidMedia(e, t, r, a, c) {
    return this.raw.sendPaidMedia({
      chat_id: e,
      star_count: t,
      media: r,
      ...a
    }, c);
  }
  sendVenue(e, t, r, a, c, l, p) {
    return this.raw.sendVenue({
      chat_id: e,
      latitude: t,
      longitude: r,
      title: a,
      address: c,
      ...l
    }, p);
  }
  sendContact(e, t, r, a, c) {
    return this.raw.sendContact({
      chat_id: e,
      phone_number: t,
      first_name: r,
      ...a
    }, c);
  }
  sendPoll(e, t, r, a, c) {
    return this.raw.sendPoll({
      chat_id: e,
      question: t,
      options: r,
      ...a
    }, c);
  }
  sendDice(e, t, r, a) {
    return this.raw.sendDice({
      chat_id: e,
      emoji: t,
      ...r
    }, a);
  }
  setMessageReaction(e, t, r, a, c) {
    return this.raw.setMessageReaction({
      chat_id: e,
      message_id: t,
      reaction: r,
      ...a
    }, c);
  }
  sendChatAction(e, t, r, a) {
    return this.raw.sendChatAction({
      chat_id: e,
      action: t,
      ...r
    }, a);
  }
  getUserProfilePhotos(e, t, r) {
    return this.raw.getUserProfilePhotos({
      user_id: e,
      ...t
    }, r);
  }
  setUserEmojiStatus(e, t, r) {
    return this.raw.setUserEmojiStatus({
      user_id: e,
      ...t
    }, r);
  }
  getUserChatBoosts(e, t, r) {
    return this.raw.getUserChatBoosts({
      chat_id: e,
      user_id: t
    }, r);
  }
  getBusinessConnection(e, t) {
    return this.raw.getBusinessConnection({
      business_connection_id: e
    }, t);
  }
  getFile(e, t) {
    return this.raw.getFile({
      file_id: e
    }, t);
  }
  kickChatMember(...e) {
    return this.banChatMember(...e);
  }
  banChatMember(e, t, r, a) {
    return this.raw.banChatMember({
      chat_id: e,
      user_id: t,
      ...r
    }, a);
  }
  unbanChatMember(e, t, r, a) {
    return this.raw.unbanChatMember({
      chat_id: e,
      user_id: t,
      ...r
    }, a);
  }
  restrictChatMember(e, t, r, a, c) {
    return this.raw.restrictChatMember({
      chat_id: e,
      user_id: t,
      permissions: r,
      ...a
    }, c);
  }
  promoteChatMember(e, t, r, a) {
    return this.raw.promoteChatMember({
      chat_id: e,
      user_id: t,
      ...r
    }, a);
  }
  setChatAdministratorCustomTitle(e, t, r, a) {
    return this.raw.setChatAdministratorCustomTitle({
      chat_id: e,
      user_id: t,
      custom_title: r
    }, a);
  }
  banChatSenderChat(e, t, r) {
    return this.raw.banChatSenderChat({
      chat_id: e,
      sender_chat_id: t
    }, r);
  }
  unbanChatSenderChat(e, t, r) {
    return this.raw.unbanChatSenderChat({
      chat_id: e,
      sender_chat_id: t
    }, r);
  }
  setChatPermissions(e, t, r, a) {
    return this.raw.setChatPermissions({
      chat_id: e,
      permissions: t,
      ...r
    }, a);
  }
  exportChatInviteLink(e, t) {
    return this.raw.exportChatInviteLink({
      chat_id: e
    }, t);
  }
  createChatInviteLink(e, t, r) {
    return this.raw.createChatInviteLink({
      chat_id: e,
      ...t
    }, r);
  }
  editChatInviteLink(e, t, r, a) {
    return this.raw.editChatInviteLink({
      chat_id: e,
      invite_link: t,
      ...r
    }, a);
  }
  createChatSubscriptionInviteLink(e, t, r, a, c) {
    return this.raw.createChatSubscriptionInviteLink({
      chat_id: e,
      subscription_period: t,
      subscription_price: r,
      ...a
    }, c);
  }
  editChatSubscriptionInviteLink(e, t, r, a) {
    return this.raw.editChatSubscriptionInviteLink({
      chat_id: e,
      invite_link: t,
      ...r
    }, a);
  }
  revokeChatInviteLink(e, t, r) {
    return this.raw.revokeChatInviteLink({
      chat_id: e,
      invite_link: t
    }, r);
  }
  approveChatJoinRequest(e, t, r) {
    return this.raw.approveChatJoinRequest({
      chat_id: e,
      user_id: t
    }, r);
  }
  declineChatJoinRequest(e, t, r) {
    return this.raw.declineChatJoinRequest({
      chat_id: e,
      user_id: t
    }, r);
  }
  setChatPhoto(e, t, r) {
    return this.raw.setChatPhoto({
      chat_id: e,
      photo: t
    }, r);
  }
  deleteChatPhoto(e, t) {
    return this.raw.deleteChatPhoto({
      chat_id: e
    }, t);
  }
  setChatTitle(e, t, r) {
    return this.raw.setChatTitle({
      chat_id: e,
      title: t
    }, r);
  }
  setChatDescription(e, t, r) {
    return this.raw.setChatDescription({
      chat_id: e,
      description: t
    }, r);
  }
  pinChatMessage(e, t, r, a) {
    return this.raw.pinChatMessage({
      chat_id: e,
      message_id: t,
      ...r
    }, a);
  }
  unpinChatMessage(e, t, r, a) {
    return this.raw.unpinChatMessage({
      chat_id: e,
      message_id: t,
      ...r
    }, a);
  }
  unpinAllChatMessages(e, t) {
    return this.raw.unpinAllChatMessages({
      chat_id: e
    }, t);
  }
  leaveChat(e, t) {
    return this.raw.leaveChat({
      chat_id: e
    }, t);
  }
  getChat(e, t) {
    return this.raw.getChat({
      chat_id: e
    }, t);
  }
  getChatAdministrators(e, t) {
    return this.raw.getChatAdministrators({
      chat_id: e
    }, t);
  }
  getChatMembersCount(...e) {
    return this.getChatMemberCount(...e);
  }
  getChatMemberCount(e, t) {
    return this.raw.getChatMemberCount({
      chat_id: e
    }, t);
  }
  getChatMember(e, t, r) {
    return this.raw.getChatMember({
      chat_id: e,
      user_id: t
    }, r);
  }
  setChatStickerSet(e, t, r) {
    return this.raw.setChatStickerSet({
      chat_id: e,
      sticker_set_name: t
    }, r);
  }
  deleteChatStickerSet(e, t) {
    return this.raw.deleteChatStickerSet({
      chat_id: e
    }, t);
  }
  getForumTopicIconStickers(e) {
    return this.raw.getForumTopicIconStickers(e);
  }
  createForumTopic(e, t, r, a) {
    return this.raw.createForumTopic({
      chat_id: e,
      name: t,
      ...r
    }, a);
  }
  editForumTopic(e, t, r, a) {
    return this.raw.editForumTopic({
      chat_id: e,
      message_thread_id: t,
      ...r
    }, a);
  }
  closeForumTopic(e, t, r) {
    return this.raw.closeForumTopic({
      chat_id: e,
      message_thread_id: t
    }, r);
  }
  reopenForumTopic(e, t, r) {
    return this.raw.reopenForumTopic({
      chat_id: e,
      message_thread_id: t
    }, r);
  }
  deleteForumTopic(e, t, r) {
    return this.raw.deleteForumTopic({
      chat_id: e,
      message_thread_id: t
    }, r);
  }
  unpinAllForumTopicMessages(e, t, r) {
    return this.raw.unpinAllForumTopicMessages({
      chat_id: e,
      message_thread_id: t
    }, r);
  }
  editGeneralForumTopic(e, t, r) {
    return this.raw.editGeneralForumTopic({
      chat_id: e,
      name: t
    }, r);
  }
  closeGeneralForumTopic(e, t) {
    return this.raw.closeGeneralForumTopic({
      chat_id: e
    }, t);
  }
  reopenGeneralForumTopic(e, t) {
    return this.raw.reopenGeneralForumTopic({
      chat_id: e
    }, t);
  }
  hideGeneralForumTopic(e, t) {
    return this.raw.hideGeneralForumTopic({
      chat_id: e
    }, t);
  }
  unhideGeneralForumTopic(e, t) {
    return this.raw.unhideGeneralForumTopic({
      chat_id: e
    }, t);
  }
  unpinAllGeneralForumTopicMessages(e, t) {
    return this.raw.unpinAllGeneralForumTopicMessages({
      chat_id: e
    }, t);
  }
  answerCallbackQuery(e, t, r) {
    return this.raw.answerCallbackQuery({
      callback_query_id: e,
      ...t
    }, r);
  }
  setMyName(e, t, r) {
    return this.raw.setMyName({
      name: e,
      ...t
    }, r);
  }
  getMyName(e, t) {
    return this.raw.getMyName(e ?? {}, t);
  }
  setMyCommands(e, t, r) {
    return this.raw.setMyCommands({
      commands: e,
      ...t
    }, r);
  }
  deleteMyCommands(e, t) {
    return this.raw.deleteMyCommands({
      ...e
    }, t);
  }
  getMyCommands(e, t) {
    return this.raw.getMyCommands({
      ...e
    }, t);
  }
  setMyDescription(e, t, r) {
    return this.raw.setMyDescription({
      description: e,
      ...t
    }, r);
  }
  getMyDescription(e, t) {
    return this.raw.getMyDescription({
      ...e
    }, t);
  }
  setMyShortDescription(e, t, r) {
    return this.raw.setMyShortDescription({
      short_description: e,
      ...t
    }, r);
  }
  getMyShortDescription(e, t) {
    return this.raw.getMyShortDescription({
      ...e
    }, t);
  }
  setChatMenuButton(e, t) {
    return this.raw.setChatMenuButton({
      ...e
    }, t);
  }
  getChatMenuButton(e, t) {
    return this.raw.getChatMenuButton({
      ...e
    }, t);
  }
  setMyDefaultAdministratorRights(e, t) {
    return this.raw.setMyDefaultAdministratorRights({
      ...e
    }, t);
  }
  getMyDefaultAdministratorRights(e, t) {
    return this.raw.getMyDefaultAdministratorRights({
      ...e
    }, t);
  }
  editMessageText(e, t, r, a, c) {
    return this.raw.editMessageText({
      chat_id: e,
      message_id: t,
      text: r,
      ...a
    }, c);
  }
  editMessageTextInline(e, t, r, a) {
    return this.raw.editMessageText({
      inline_message_id: e,
      text: t,
      ...r
    }, a);
  }
  editMessageCaption(e, t, r, a) {
    return this.raw.editMessageCaption({
      chat_id: e,
      message_id: t,
      ...r
    }, a);
  }
  editMessageCaptionInline(e, t, r) {
    return this.raw.editMessageCaption({
      inline_message_id: e,
      ...t
    }, r);
  }
  editMessageMedia(e, t, r, a, c) {
    return this.raw.editMessageMedia({
      chat_id: e,
      message_id: t,
      media: r,
      ...a
    }, c);
  }
  editMessageMediaInline(e, t, r, a) {
    return this.raw.editMessageMedia({
      inline_message_id: e,
      media: t,
      ...r
    }, a);
  }
  editMessageReplyMarkup(e, t, r, a) {
    return this.raw.editMessageReplyMarkup({
      chat_id: e,
      message_id: t,
      ...r
    }, a);
  }
  editMessageReplyMarkupInline(e, t, r) {
    return this.raw.editMessageReplyMarkup({
      inline_message_id: e,
      ...t
    }, r);
  }
  stopPoll(e, t, r, a) {
    return this.raw.stopPoll({
      chat_id: e,
      message_id: t,
      ...r
    }, a);
  }
  deleteMessage(e, t, r) {
    return this.raw.deleteMessage({
      chat_id: e,
      message_id: t
    }, r);
  }
  deleteMessages(e, t, r) {
    return this.raw.deleteMessages({
      chat_id: e,
      message_ids: t
    }, r);
  }
  deleteBusinessMessages(e, t, r) {
    return this.raw.deleteBusinessMessages({
      business_connection_id: e,
      message_ids: t
    }, r);
  }
  setBusinessAccountName(e, t, r, a) {
    return this.raw.setBusinessAccountName({
      business_connection_id: e,
      first_name: t,
      ...r
    }, a);
  }
  setBusinessAccountUsername(e, t, r) {
    return this.raw.setBusinessAccountUsername({
      business_connection_id: e,
      username: t
    }, r);
  }
  setBusinessAccountBio(e, t, r) {
    return this.raw.setBusinessAccountBio({
      business_connection_id: e,
      bio: t
    }, r);
  }
  setBusinessAccountProfilePhoto(e, t, r, a) {
    return this.raw.setBusinessAccountProfilePhoto({
      business_connection_id: e,
      photo: t,
      ...r
    }, a);
  }
  removeBusinessAccountProfilePhoto(e, t, r) {
    return this.raw.removeBusinessAccountProfilePhoto({
      business_connection_id: e,
      ...t
    }, r);
  }
  setBusinessAccountGiftSettings(e, t, r, a) {
    return this.raw.setBusinessAccountGiftSettings({
      business_connection_id: e,
      show_gift_button: t,
      accepted_gift_types: r
    }, a);
  }
  getBusinessAccountStarBalance(e, t) {
    return this.raw.getBusinessAccountStarBalance({
      business_connection_id: e
    }, t);
  }
  transferBusinessAccountStars(e, t, r) {
    return this.raw.transferBusinessAccountStars({
      business_connection_id: e,
      star_count: t
    }, r);
  }
  getBusinessAccountGifts(e, t, r) {
    return this.raw.getBusinessAccountGifts({
      business_connection_id: e,
      ...t
    }, r);
  }
  convertGiftToStars(e, t, r) {
    return this.raw.convertGiftToStars({
      business_connection_id: e,
      owned_gift_id: t
    }, r);
  }
  upgradeGift(e, t, r, a) {
    return this.raw.upgradeGift({
      business_connection_id: e,
      owned_gift_id: t,
      ...r
    }, a);
  }
  transferGift(e, t, r, a, c) {
    return this.raw.transferGift({
      business_connection_id: e,
      owned_gift_id: t,
      new_owner_chat_id: r,
      star_count: a
    }, c);
  }
  postStory(e, t, r, a, c) {
    return this.raw.postStory({
      business_connection_id: e,
      content: t,
      active_period: r,
      ...a
    }, c);
  }
  editStory(e, t, r, a, c) {
    return this.raw.editStory({
      business_connection_id: e,
      story_id: t,
      content: r,
      ...a
    }, c);
  }
  deleteStory(e, t, r) {
    return this.raw.deleteStory({
      business_connection_id: e,
      story_id: t
    }, r);
  }
  sendSticker(e, t, r, a) {
    return this.raw.sendSticker({
      chat_id: e,
      sticker: t,
      ...r
    }, a);
  }
  getStickerSet(e, t) {
    return this.raw.getStickerSet({
      name: e
    }, t);
  }
  getCustomEmojiStickers(e, t) {
    return this.raw.getCustomEmojiStickers({
      custom_emoji_ids: e
    }, t);
  }
  uploadStickerFile(e, t, r, a) {
    return this.raw.uploadStickerFile({
      user_id: e,
      sticker_format: t,
      sticker: r
    }, a);
  }
  createNewStickerSet(e, t, r, a, c, l) {
    return this.raw.createNewStickerSet({
      user_id: e,
      name: t,
      title: r,
      stickers: a,
      ...c
    }, l);
  }
  addStickerToSet(e, t, r, a) {
    return this.raw.addStickerToSet({
      user_id: e,
      name: t,
      sticker: r
    }, a);
  }
  setStickerPositionInSet(e, t, r) {
    return this.raw.setStickerPositionInSet({
      sticker: e,
      position: t
    }, r);
  }
  deleteStickerFromSet(e, t) {
    return this.raw.deleteStickerFromSet({
      sticker: e
    }, t);
  }
  replaceStickerInSet(e, t, r, a, c) {
    return this.raw.replaceStickerInSet({
      user_id: e,
      name: t,
      old_sticker: r,
      sticker: a
    }, c);
  }
  setStickerEmojiList(e, t, r) {
    return this.raw.setStickerEmojiList({
      sticker: e,
      emoji_list: t
    }, r);
  }
  setStickerKeywords(e, t, r) {
    return this.raw.setStickerKeywords({
      sticker: e,
      keywords: t
    }, r);
  }
  setStickerMaskPosition(e, t, r) {
    return this.raw.setStickerMaskPosition({
      sticker: e,
      mask_position: t
    }, r);
  }
  setStickerSetTitle(e, t, r) {
    return this.raw.setStickerSetTitle({
      name: e,
      title: t
    }, r);
  }
  deleteStickerSet(e, t) {
    return this.raw.deleteStickerSet({
      name: e
    }, t);
  }
  setStickerSetThumbnail(e, t, r, a, c) {
    return this.raw.setStickerSetThumbnail({
      name: e,
      user_id: t,
      thumbnail: r,
      format: a
    }, c);
  }
  setCustomEmojiStickerSetThumbnail(e, t, r) {
    return this.raw.setCustomEmojiStickerSetThumbnail({
      name: e,
      custom_emoji_id: t
    }, r);
  }
  getAvailableGifts(e) {
    return this.raw.getAvailableGifts(e);
  }
  sendGift(e, t, r, a) {
    return this.raw.sendGift({
      user_id: e,
      gift_id: t,
      ...r
    }, a);
  }
  giftPremiumSubscription(e, t, r, a, c) {
    return this.raw.giftPremiumSubscription({
      user_id: e,
      month_count: t,
      star_count: r,
      ...a
    }, c);
  }
  sendGiftToChannel(e, t, r, a) {
    return this.raw.sendGift({
      chat_id: e,
      gift_id: t,
      ...r
    }, a);
  }
  answerInlineQuery(e, t, r, a) {
    return this.raw.answerInlineQuery({
      inline_query_id: e,
      results: t,
      ...r
    }, a);
  }
  answerWebAppQuery(e, t, r) {
    return this.raw.answerWebAppQuery({
      web_app_query_id: e,
      result: t
    }, r);
  }
  savePreparedInlineMessage(e, t, r, a) {
    return this.raw.savePreparedInlineMessage({
      user_id: e,
      result: t,
      ...r
    }, a);
  }
  sendInvoice(e, t, r, a, c, l, p, d) {
    return this.raw.sendInvoice({
      chat_id: e,
      title: t,
      description: r,
      payload: a,
      currency: c,
      prices: l,
      ...p
    }, d);
  }
  createInvoiceLink(e, t, r, a, c, l, p, d) {
    return this.raw.createInvoiceLink({
      title: e,
      description: t,
      payload: r,
      provider_token: a,
      currency: c,
      prices: l,
      ...p
    }, d);
  }
  answerShippingQuery(e, t, r, a) {
    return this.raw.answerShippingQuery({
      shipping_query_id: e,
      ok: t,
      ...r
    }, a);
  }
  answerPreCheckoutQuery(e, t, r, a) {
    return this.raw.answerPreCheckoutQuery({
      pre_checkout_query_id: e,
      ok: t,
      ...r
    }, a);
  }
  getStarTransactions(e, t) {
    return this.raw.getStarTransactions({
      ...e
    }, t);
  }
  refundStarPayment(e, t, r) {
    return this.raw.refundStarPayment({
      user_id: e,
      telegram_payment_charge_id: t
    }, r);
  }
  editUserStarSubscription(e, t, r, a) {
    return this.raw.editUserStarSubscription({
      user_id: e,
      telegram_payment_charge_id: t,
      is_canceled: r
    }, a);
  }
  verifyUser(e, t, r) {
    return this.raw.verifyUser({
      user_id: e,
      ...t
    }, r);
  }
  verifyChat(e, t, r) {
    return this.raw.verifyChat({
      chat_id: e,
      ...t
    }, r);
  }
  removeUserVerification(e, t) {
    return this.raw.removeUserVerification({
      user_id: e
    }, t);
  }
  removeChatVerification(e, t) {
    return this.raw.removeChatVerification({
      chat_id: e
    }, t);
  }
  readBusinessMessage(e, t, r, a) {
    return this.raw.readBusinessMessage({
      business_connection_id: e,
      chat_id: t,
      message_id: r
    }, a);
  }
  setPassportDataErrors(e, t, r) {
    return this.raw.setPassportDataErrors({
      user_id: e,
      errors: t
    }, r);
  }
  sendGame(e, t, r, a) {
    return this.raw.sendGame({
      chat_id: e,
      game_short_name: t,
      ...r
    }, a);
  }
  setGameScore(e, t, r, a, c, l) {
    return this.raw.setGameScore({
      chat_id: e,
      message_id: t,
      user_id: r,
      score: a,
      ...c
    }, l);
  }
  setGameScoreInline(e, t, r, a, c) {
    return this.raw.setGameScore({
      inline_message_id: e,
      user_id: t,
      score: r,
      ...a
    }, c);
  }
  getGameHighScores(e, t, r, a) {
    return this.raw.getGameHighScores({
      chat_id: e,
      message_id: t,
      user_id: r
    }, a);
  }
  getGameHighScoresInline(e, t, r) {
    return this.raw.getGameHighScores({
      inline_message_id: e,
      user_id: t
    }, r);
  }
}
const ge = se("grammy:bot"), pc = se("grammy:warn"), at = se("grammy:error"), _i = [
  "message",
  "edited_message",
  "channel_post",
  "edited_channel_post",
  "business_connection",
  "business_message",
  "edited_business_message",
  "deleted_business_messages",
  "inline_query",
  "chosen_inline_result",
  "callback_query",
  "shipping_query",
  "pre_checkout_query",
  "poll",
  "poll_answer",
  "my_chat_member",
  "chat_join_request",
  "chat_boost",
  "removed_chat_boost"
];
class gc extends Ae {
  constructor(t, r) {
    super();
    I(this, "token");
    I(this, "pollingRunning");
    I(this, "pollingAbortController");
    I(this, "lastTriedUpdateId");
    I(this, "api");
    I(this, "me");
    I(this, "mePromise");
    I(this, "clientConfig");
    I(this, "ContextConstructor");
    I(this, "observedUpdateTypes");
    I(this, "errorHandler");
    if (this.token = t, this.pollingRunning = !1, this.lastTriedUpdateId = 0, this.observedUpdateTypes = /* @__PURE__ */ new Set(), this.errorHandler = async (a) => {
      var c, l;
      throw console.error("Error in middleware while handling update", (l = (c = a.ctx) == null ? void 0 : c.update) == null ? void 0 : l.update_id, a.error), console.error("No error handler was set!"), console.error("Set your own error handler with `bot.catch = ...`"), this.pollingRunning && (console.error("Stopping bot"), await this.stop()), a;
    }, !t) throw new Error("Empty token!");
    this.me = r == null ? void 0 : r.botInfo, this.clientConfig = r == null ? void 0 : r.client, this.ContextConstructor = (r == null ? void 0 : r.ContextConstructor) ?? oe, this.api = new Rs(t, this.clientConfig);
  }
  set botInfo(t) {
    this.me = t;
  }
  get botInfo() {
    if (this.me === void 0)
      throw new Error("Bot information unavailable! Make sure to call `await bot.init()` before accessing `bot.botInfo`!");
    return this.me;
  }
  on(t, ...r) {
    for (const [a] of ui(t).flatMap(ci))
      this.observedUpdateTypes.add(a);
    return super.on(t, ...r);
  }
  reaction(t, ...r) {
    return this.observedUpdateTypes.add("message_reaction"), super.reaction(t, ...r);
  }
  isInited() {
    return this.me !== void 0;
  }
  async init(t) {
    if (!this.isInited()) {
      ge("Initializing bot"), this.mePromise ?? (this.mePromise = $s(() => this.api.getMe(t), t));
      let r;
      try {
        r = await this.mePromise;
      } finally {
        this.mePromise = void 0;
      }
      this.me === void 0 ? this.me = r : ge("Bot info was set by now, will not overwrite");
    }
    ge(`I am ${this.me.username}!`);
  }
  async handleUpdates(t) {
    for (const r of t) {
      this.lastTriedUpdateId = r.update_id;
      try {
        await this.handleUpdate(r);
      } catch (a) {
        if (a instanceof Wn)
          await this.errorHandler(a);
        else
          throw console.error("FATAL: grammY unable to handle:", a), a;
      }
    }
  }
  async handleUpdate(t, r) {
    if (this.me === void 0)
      throw new Error("Bot not initialized! Either call `await bot.init()`, or directly set the `botInfo` option in the `Bot` constructor to specify a known bot info object.");
    ge(`Processing update ${t.update_id}`);
    const a = new Rs(this.token, this.clientConfig, r), c = this.api.config.installedTransformers();
    c.length > 0 && a.config.use(...c);
    const l = new this.ContextConstructor(t, a, this.me);
    try {
      await hi(this.middleware(), l);
    } catch (p) {
      throw at(`Error in middleware for update ${t.update_id}`), new Wn(p, l);
    }
  }
  async start(t) {
    var a, c, l;
    const r = [];
    if (this.isInited() || r.push(this.init((a = this.pollingAbortController) == null ? void 0 : a.signal)), this.pollingRunning) {
      await Promise.all(r), ge("Simple long polling already running!");
      return;
    }
    this.pollingRunning = !0, this.pollingAbortController = new AbortController();
    try {
      r.push($s(async () => {
        var p;
        await this.api.deleteWebhook({
          drop_pending_updates: t == null ? void 0 : t.drop_pending_updates
        }, (p = this.pollingAbortController) == null ? void 0 : p.signal);
      }, (c = this.pollingAbortController) == null ? void 0 : c.signal)), await Promise.all(r), await ((l = t == null ? void 0 : t.onStart) == null ? void 0 : l.call(t, this.botInfo));
    } catch (p) {
      throw this.pollingRunning = !1, this.pollingAbortController = void 0, p;
    }
    this.pollingRunning && (yc(this.observedUpdateTypes, t == null ? void 0 : t.allowed_updates), this.use = wc, ge("Starting simple long polling"), await this.loop(t), ge("Middleware is done running"));
  }
  async stop() {
    var t;
    if (this.pollingRunning) {
      ge("Stopping bot, saving update offset"), this.pollingRunning = !1, (t = this.pollingAbortController) == null || t.abort();
      const r = this.lastTriedUpdateId + 1;
      await this.api.getUpdates({
        offset: r,
        limit: 1
      }).finally(() => this.pollingAbortController = void 0);
    } else
      ge("Bot is not running!");
  }
  isRunning() {
    return this.pollingRunning;
  }
  catch(t) {
    this.errorHandler = t;
  }
  async loop(t) {
    const r = t == null ? void 0 : t.limit, a = (t == null ? void 0 : t.timeout) ?? 30;
    let c = (t == null ? void 0 : t.allowed_updates) ?? [];
    try {
      for (; this.pollingRunning; ) {
        const l = await this.fetchUpdates({
          limit: r,
          timeout: a,
          allowed_updates: c
        });
        if (l === void 0) break;
        await this.handleUpdates(l), c = void 0;
      }
    } finally {
      this.pollingRunning = !1;
    }
  }
  async fetchUpdates({ limit: t, timeout: r, allowed_updates: a }) {
    var p;
    const c = this.lastTriedUpdateId + 1;
    let l;
    do
      try {
        l = await this.api.getUpdates({
          offset: c,
          limit: t,
          timeout: r,
          allowed_updates: a
        }, (p = this.pollingAbortController) == null ? void 0 : p.signal);
      } catch (d) {
        await this.handlePollingError(d);
      }
    while (l === void 0 && this.pollingRunning);
    return l;
  }
  async handlePollingError(t) {
    if (!this.pollingRunning) {
      ge("Pending getUpdates request cancelled");
      return;
    }
    let r = 3;
    if (t instanceof rr) {
      if (at(t.message), t.error_code === 401 || t.error_code === 409)
        throw t;
      t.error_code === 429 && (at("Bot API server is closing."), r = t.parameters.retry_after ?? r);
    } else at(t);
    at(`Call to getUpdates failed, retrying in ${r} seconds ...`), await Hn(r);
  }
}
async function $s(s, e) {
  let r = 50;
  async function a(l) {
    let p = !1, d = "rethrow";
    if (l instanceof yi)
      p = !0, d = "retry";
    else if (l instanceof rr) {
      if (l.error_code >= 500)
        p = !0, d = "retry";
      else if (l.error_code === 429) {
        const g = l.parameters.retry_after;
        typeof g == "number" ? (await Hn(g, e), r = 50) : p = !0, d = "retry";
      }
    }
    if (p) {
      r !== 50 && await Hn(r, e);
      const g = 20 * 60 * 1e3;
      r = Math.min(g, 2 * r);
    }
    return d;
  }
  let c = {
    ok: !1
  };
  for (; !c.ok; )
    try {
      c = {
        ok: !0,
        value: await s()
      };
    } catch (l) {
      switch (at(l), await a(l)) {
        case "retry":
          continue;
        case "rethrow":
          throw l;
      }
    }
  return c.value;
}
async function Hn(s, e) {
  let t, r;
  function a() {
    r == null || r(new Error("Aborted delay")), t !== void 0 && clearTimeout(t);
  }
  try {
    await new Promise((c, l) => {
      if (r = l, e != null && e.aborted) {
        a();
        return;
      }
      e == null || e.addEventListener("abort", a), t = setTimeout(c, 1e3 * s);
    });
  } finally {
    e == null || e.removeEventListener("abort", a);
  }
}
function yc(s, e = _i) {
  const t = Array.from(s).filter((r) => !e.includes(r));
  t.length > 0 && pc(`You registered listeners for the following update types, but you did not specify them in \`allowed_updates\` so they may not be received: ${t.map((r) => `'${r}'`).join(", ")}`);
}
function wc() {
  throw new Error(`It looks like you are registering more listeners on your bot from within other listeners! This means that every time your bot handles a message like this one, new listeners will be added. This list grows until your machine crashes, so grammY throws this error to tell you that you should probably do things a bit differently. If you're unsure how to resolve this problem, you can ask in the group chat: https://telegram.me/grammyjs

On the other hand, if you actually know what you're doing and you do need to install further middleware while your bot is running, consider installing a composer instance on your bot, and in turn augment the composer after the fact. This way, you can circumvent this protection against memory leaks.`);
}
[
  ..._i
];
const bc = se("grammy:session");
function vc(s = {}) {
  return s.type === "multi" ? Sc(s) : Cc(s);
}
function Cc(s) {
  const { initial: e, storage: t, getSessionKey: r, custom: a } = Ii(s);
  return async (c, l) => {
    const p = new Ei(t, c, "session", e), d = await r(c);
    await p.init(d, {
      custom: a,
      lazy: !1
    }), await l(), await p.finish();
  };
}
function Sc(s) {
  const e = Object.keys(s).filter((r) => r !== "type"), t = Object.fromEntries(e.map((r) => [
    r,
    Ii(s[r])
  ]));
  return async (r, a) => {
    r.session = {};
    const c = await Promise.all(e.map(async (l) => {
      const { initial: p, storage: d, getSessionKey: g, custom: v } = t[l], C = new Ei(d, r.session, l, p), _ = await g(r);
      return await C.init(_, {
        custom: v,
        lazy: !1
      }), C;
    }));
    await a(), r.session == null && c.forEach((l) => l.delete()), await Promise.all(c.map((l) => l.finish()));
  };
}
class Ei {
  constructor(e, t, r, a) {
    I(this, "storage");
    I(this, "obj");
    I(this, "prop");
    I(this, "initial");
    I(this, "key");
    I(this, "value");
    I(this, "promise");
    I(this, "fetching");
    I(this, "read");
    I(this, "wrote");
    this.storage = e, this.obj = t, this.prop = r, this.initial = a, this.fetching = !1, this.read = !1, this.wrote = !1;
  }
  load() {
    if (this.key !== void 0 && !this.wrote)
      return this.promise === void 0 && (this.fetching = !0, this.promise = Promise.resolve(this.storage.read(this.key)).then((e) => {
        var t;
        return this.fetching = !1, this.wrote ? this.value : e !== void 0 ? (this.value = e, e) : (e = (t = this.initial) == null ? void 0 : t.call(this), e !== void 0 && (this.wrote = !0, this.value = e), e);
      })), this.promise;
  }
  async init(e, t) {
    this.key = e, t.lazy || await this.load(), Object.defineProperty(this.obj, this.prop, {
      enumerable: !0,
      get: () => {
        if (e === void 0) {
          const r = Ls("access", t);
          throw new Error(r);
        }
        return this.read = !0, !t.lazy || this.wrote ? this.value : (this.load(), this.fetching ? this.promise : this.value);
      },
      set: (r) => {
        if (e === void 0) {
          const a = Ls("assign", t);
          throw new Error(a);
        }
        this.wrote = !0, this.fetching = !1, this.value = r;
      }
    });
  }
  delete() {
    Object.assign(this.obj, {
      [this.prop]: void 0
    });
  }
  async finish() {
    if (this.key !== void 0 && (this.read && await this.load(), this.read || this.wrote)) {
      const e = await this.value;
      e == null ? await this.storage.delete(this.key) : await this.storage.write(this.key, e);
    }
  }
}
function Ii(s = {}) {
  let { prefix: e = "", getSessionKey: t = xs, initial: r, storage: a } = s;
  return a == null && (bc("Storing session data in memory, all data will be lost when the bot restarts."), a = new Tc()), {
    initial: r,
    storage: a,
    getSessionKey: async (l) => {
      const p = await t(l);
      return p === void 0 ? void 0 : e + p;
    },
    custom: t !== xs
  };
}
function xs(s) {
  var e;
  return (e = s.chatId) == null ? void 0 : e.toString();
}
function Ls(s, e) {
  const { lazy: t = !1, custom: r } = e;
  return `Cannot ${s} ${t ? "lazy " : ""}session data because ${r ? "the custom `getSessionKey` function returned undefined for this update" : "this update does not belong to a chat, so the session key is undefined"}!`;
}
class Tc {
  constructor(e) {
    I(this, "timeToLive");
    I(this, "storage");
    this.timeToLive = e, this.storage = /* @__PURE__ */ new Map();
  }
  read(e) {
    const t = this.storage.get(e);
    if (t !== void 0) {
      if (t.expires !== void 0 && t.expires < Date.now()) {
        this.delete(e);
        return;
      }
      return t.session;
    }
  }
  readAll() {
    return this.readAllValues();
  }
  readAllKeys() {
    return Array.from(this.storage.keys());
  }
  readAllValues() {
    return Array.from(this.storage.keys()).map((e) => this.read(e)).filter((e) => e !== void 0);
  }
  readAllEntries() {
    return Array.from(this.storage.keys()).map((e) => [
      e,
      this.read(e)
    ]).filter((e) => e[1] !== void 0);
  }
  has(e) {
    return this.storage.has(e);
  }
  write(e, t) {
    this.storage.set(e, _c(t, this.timeToLive));
  }
  delete(e) {
    this.storage.delete(e);
  }
}
function _c(s, e) {
  if (e !== void 0 && e < 1 / 0) {
    const t = Date.now();
    return {
      session: s,
      expires: t + e
    };
  } else
    return {
      session: s
    };
}
se("grammy:error");
function Ec(s) {
  if (Object.prototype.hasOwnProperty.call(s, "__esModule")) return s;
  var e = s.default;
  if (typeof e == "function") {
    var t = function r() {
      return this instanceof r ? Reflect.construct(e, arguments, this.constructor) : e.apply(this, arguments);
    };
    t.prototype = e.prototype;
  } else t = {};
  return Object.defineProperty(t, "__esModule", { value: !0 }), Object.keys(s).forEach(function(r) {
    var a = Object.getOwnPropertyDescriptor(s, r);
    Object.defineProperty(t, r, a.get ? a : {
      enumerable: !0,
      get: function() {
        return s[r];
      }
    });
  }), t;
}
var Ps = {}, ye = { exports: {} };
const Ic = {}, kc = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Ic
}, Symbol.toStringTag, { value: "Module" })), Mt = /* @__PURE__ */ Ec(kc), Mc = "16.5.0", Oc = {
  version: Mc
};
var Vs;
function Dc() {
  if (Vs) return ye.exports;
  Vs = 1;
  const s = Mt, e = Mt, t = Mt, r = Mt, c = Oc.version, l = /(?:^|^)\s*(?:export\s+)?([\w.-]+)(?:\s*=\s*?|:\s+?)(\s*'(?:\\'|[^'])*'|\s*"(?:\\"|[^"])*"|\s*`(?:\\`|[^`])*`|[^#\r\n]+)?\s*(?:#.*)?(?:$|$)/mg;
  function p(T) {
    const $ = {};
    let R = T.toString();
    R = R.replace(/\r\n?/mg, `
`);
    let j;
    for (; (j = l.exec(R)) != null; ) {
      const Y = j[1];
      let P = j[2] || "";
      P = P.trim();
      const q = P[0];
      P = P.replace(/^(['"`])([\s\S]*)\1$/mg, "$2"), q === '"' && (P = P.replace(/\\n/g, `
`), P = P.replace(/\\r/g, "\r")), $[Y] = P;
    }
    return $;
  }
  function d(T) {
    const $ = N(T), R = F.configDotenv({ path: $ });
    if (!R.parsed) {
      const q = new Error(`MISSING_DATA: Cannot parse ${$} for an unknown reason`);
      throw q.code = "MISSING_DATA", q;
    }
    const j = C(T).split(","), Y = j.length;
    let P;
    for (let q = 0; q < Y; q++)
      try {
        const Z = j[q].trim(), re = _(R, Z);
        P = F.decrypt(re.ciphertext, re.key);
        break;
      } catch (Z) {
        if (q + 1 >= Y)
          throw Z;
      }
    return F.parse(P);
  }
  function g(T) {
    console.log(`[dotenv@${c}][WARN] ${T}`);
  }
  function v(T) {
    console.log(`[dotenv@${c}][DEBUG] ${T}`);
  }
  function C(T) {
    return T && T.DOTENV_KEY && T.DOTENV_KEY.length > 0 ? T.DOTENV_KEY : process.env.DOTENV_KEY && process.env.DOTENV_KEY.length > 0 ? process.env.DOTENV_KEY : "";
  }
  function _(T, $) {
    let R;
    try {
      R = new URL($);
    } catch (Z) {
      if (Z.code === "ERR_INVALID_URL") {
        const re = new Error("INVALID_DOTENV_KEY: Wrong format. Must be in valid uri format like dotenv://:key_1234@dotenvx.com/vault/.env.vault?environment=development");
        throw re.code = "INVALID_DOTENV_KEY", re;
      }
      throw Z;
    }
    const j = R.password;
    if (!j) {
      const Z = new Error("INVALID_DOTENV_KEY: Missing key part");
      throw Z.code = "INVALID_DOTENV_KEY", Z;
    }
    const Y = R.searchParams.get("environment");
    if (!Y) {
      const Z = new Error("INVALID_DOTENV_KEY: Missing environment part");
      throw Z.code = "INVALID_DOTENV_KEY", Z;
    }
    const P = `DOTENV_VAULT_${Y.toUpperCase()}`, q = T.parsed[P];
    if (!q) {
      const Z = new Error(`NOT_FOUND_DOTENV_ENVIRONMENT: Cannot locate environment ${P} in your .env.vault file.`);
      throw Z.code = "NOT_FOUND_DOTENV_ENVIRONMENT", Z;
    }
    return { ciphertext: q, key: j };
  }
  function N(T) {
    let $ = null;
    if (T && T.path && T.path.length > 0)
      if (Array.isArray(T.path))
        for (const R of T.path)
          s.existsSync(R) && ($ = R.endsWith(".vault") ? R : `${R}.vault`);
      else
        $ = T.path.endsWith(".vault") ? T.path : `${T.path}.vault`;
    else
      $ = e.resolve(process.cwd(), ".env.vault");
    return s.existsSync($) ? $ : null;
  }
  function E(T) {
    return T[0] === "~" ? e.join(t.homedir(), T.slice(1)) : T;
  }
  function k(T) {
    !!(T && T.debug) && v("Loading env from encrypted .env.vault");
    const R = F._parseVault(T);
    let j = process.env;
    return T && T.processEnv != null && (j = T.processEnv), F.populate(j, R, T), { parsed: R };
  }
  function L(T) {
    const $ = e.resolve(process.cwd(), ".env");
    let R = "utf8";
    const j = !!(T && T.debug);
    T && T.encoding ? R = T.encoding : j && v("No encoding is specified. UTF-8 is used by default");
    let Y = [$];
    if (T && T.path)
      if (!Array.isArray(T.path))
        Y = [E(T.path)];
      else {
        Y = [];
        for (const re of T.path)
          Y.push(E(re));
      }
    let P;
    const q = {};
    for (const re of Y)
      try {
        const ve = F.parse(s.readFileSync(re, { encoding: R }));
        F.populate(q, ve, T);
      } catch (ve) {
        j && v(`Failed to load ${re} ${ve.message}`), P = ve;
      }
    let Z = process.env;
    return T && T.processEnv != null && (Z = T.processEnv), F.populate(Z, q, T), P ? { parsed: q, error: P } : { parsed: q };
  }
  function x(T) {
    if (C(T).length === 0)
      return F.configDotenv(T);
    const $ = N(T);
    return $ ? F._configVault(T) : (g(`You set DOTENV_KEY but you are missing a .env.vault file at ${$}. Did you forget to build it?`), F.configDotenv(T));
  }
  function J(T, $) {
    const R = Buffer.from($.slice(-64), "hex");
    let j = Buffer.from(T, "base64");
    const Y = j.subarray(0, 12), P = j.subarray(-16);
    j = j.subarray(12, -16);
    try {
      const q = r.createDecipheriv("aes-256-gcm", R, Y);
      return q.setAuthTag(P), `${q.update(j)}${q.final()}`;
    } catch (q) {
      const Z = q instanceof RangeError, re = q.message === "Invalid key length", ve = q.message === "Unsupported state or unable to authenticate data";
      if (Z || re) {
        const _e = new Error("INVALID_DOTENV_KEY: It must be 64 characters long (or more)");
        throw _e.code = "INVALID_DOTENV_KEY", _e;
      } else if (ve) {
        const _e = new Error("DECRYPTION_FAILED: Please check your DOTENV_KEY");
        throw _e.code = "DECRYPTION_FAILED", _e;
      } else
        throw q;
    }
  }
  function ee(T, $, R = {}) {
    const j = !!(R && R.debug), Y = !!(R && R.override);
    if (typeof $ != "object") {
      const P = new Error("OBJECT_REQUIRED: Please check the processEnv argument being passed to populate");
      throw P.code = "OBJECT_REQUIRED", P;
    }
    for (const P of Object.keys($))
      Object.prototype.hasOwnProperty.call(T, P) ? (Y === !0 && (T[P] = $[P]), j && v(Y === !0 ? `"${P}" is already defined and WAS overwritten` : `"${P}" is already defined and was NOT overwritten`)) : T[P] = $[P];
  }
  const F = {
    configDotenv: L,
    _configVault: k,
    _parseVault: d,
    config: x,
    decrypt: J,
    parse: p,
    populate: ee
  };
  return ye.exports.configDotenv = F.configDotenv, ye.exports._configVault = F._configVault, ye.exports._parseVault = F._parseVault, ye.exports.config = F.config, ye.exports.decrypt = F.decrypt, ye.exports.parse = F.parse, ye.exports.populate = F.populate, ye.exports = F, ye.exports;
}
var Nn, Bs;
function Ac() {
  if (Bs) return Nn;
  Bs = 1;
  const s = {};
  return process.env.DOTENV_CONFIG_ENCODING != null && (s.encoding = process.env.DOTENV_CONFIG_ENCODING), process.env.DOTENV_CONFIG_PATH != null && (s.path = process.env.DOTENV_CONFIG_PATH), process.env.DOTENV_CONFIG_DEBUG != null && (s.debug = process.env.DOTENV_CONFIG_DEBUG), process.env.DOTENV_CONFIG_OVERRIDE != null && (s.override = process.env.DOTENV_CONFIG_OVERRIDE), process.env.DOTENV_CONFIG_DOTENV_KEY != null && (s.DOTENV_KEY = process.env.DOTENV_CONFIG_DOTENV_KEY), Nn = s, Nn;
}
var Fn, Us;
function Nc() {
  if (Us) return Fn;
  Us = 1;
  const s = /^dotenv_config_(encoding|path|debug|override|DOTENV_KEY)=(.+)$/;
  return Fn = function(t) {
    return t.reduce(function(r, a) {
      const c = a.match(s);
      return c && (r[c[1]] = c[2]), r;
    }, {});
  }, Fn;
}
var Ws;
function Fc() {
  return Ws || (Ws = 1, function() {
    Dc().config(
      Object.assign(
        {},
        Ac(),
        Nc()(process.argv)
      )
    );
  }()), Ps;
}
Fc();
async function js(s) {
  let e = new FormData();
  if (s.document instanceof Buffer) {
    const t = new Blob([s.document], {
      type: s.contentType
    });
    e.append("document", t, s.documentName);
  } else if (s.document instanceof File)
    e.append("document", s.document, s.documentName);
  else if (s.document instanceof FormData)
    e = s.document;
  else if (s.document instanceof ReadableStream) {
    const t = [], r = s.document.getReader();
    for (; ; ) {
      const { done: c, value: l } = await r.read();
      if (c) break;
      t.push(l);
    }
    const a = new Blob(t, { type: s.contentType });
    e.append("document", a, s.documentName);
  }
  return e.append("documentName", s.documentName), e;
}
var Rc = [
  "/v1/pipes/run",
  "/beta/chat",
  "/beta/generate",
  "/v1/agent/run"
], be = class zn extends Error {
  constructor(e, t, r, a) {
    super(zn.makeMessage(e, t, r)), this.status = e, this.headers = a, this.request_id = a == null ? void 0 : a["lb-request-id"];
    const c = t;
    this.error = c, this.code = c == null ? void 0 : c.code, this.status = c == null ? void 0 : c.status;
  }
  static makeMessage(e, t, r) {
    const a = t != null && t.message ? typeof t.message == "string" ? t.message : JSON.stringify(t.message) : t ? JSON.stringify(t) : r;
    return e && a ? `${e} ${a}` : e ? `${e} status code (no body)` : a || "(no status code or body)";
  }
  static generate(e, t, r, a) {
    if (!e)
      return new ki({
        cause: t instanceof Error ? t : void 0
      });
    const c = t == null ? void 0 : t.error;
    switch (e) {
      case 400:
        return new $c(e, c, r, a);
      case 401:
        return new xc(e, c, r, a);
      case 403:
        return new Lc(
          e,
          c,
          r,
          a
        );
      case 404:
        return new Pc(e, c, r, a);
      case 409:
        return new Vc(e, c, r, a);
      case 422:
        return new Bc(
          e,
          c,
          r,
          a
        );
      case 429:
        return new Uc(e, c, r, a);
      default:
        return e >= 500 ? new Wc(e, c, r, a) : new zn(e, c, r, a);
    }
  }
}, ki = class extends be {
  constructor({ message: s, cause: e }) {
    super(void 0, void 0, s || "Connection error.", void 0), this.status = void 0, e && (this.cause = e);
  }
}, $c = class extends be {
  constructor() {
    super(...arguments), this.status = 400;
  }
}, xc = class extends be {
  constructor() {
    super(...arguments), this.status = 401;
  }
}, Lc = class extends be {
  constructor() {
    super(...arguments), this.status = 403;
  }
}, Pc = class extends be {
  constructor() {
    super(...arguments), this.status = 404;
  }
}, Vc = class extends be {
  constructor() {
    super(...arguments), this.status = 409;
  }
}, Bc = class extends be {
  constructor() {
    super(...arguments), this.status = 422;
  }
}, Uc = class extends be {
  constructor() {
    super(...arguments), this.status = 429;
  }
}, Wc = class extends be {
}, qs = class Ot {
  constructor(e, t) {
    this.iterator = e, this.controller = t;
  }
  /**
   * Creates a stream of AsyncIterator from a Server-Sent Events (SSE) response.
   *
   * @template Item - The type of items in the stream.
   * @param {Response} response - The SSE response object.
   * @param {AbortController} controller - The abort controller used to cancel the ongoing request.
   * @returns {Stream<AsyncIterator<Item, any, undefined>>} - The stream created from the SSE response.
   * @throws {Error} - If the stream has already been consumed.
   */
  static fromSSEResponse(e, t) {
    let r = !1;
    async function* a() {
      if (r)
        throw new Error(
          "Cannot iterate over a consumed stream, use `.tee()` to split the stream."
        );
      r = !0;
      let c = !1;
      try {
        for await (const l of jc(
          e,
          t
        ))
          if (!c) {
            if (l.data.startsWith("[DONE]")) {
              c = !0;
              continue;
            }
            if (l.event === null) {
              let p;
              try {
                p = JSON.parse(l.data);
              } catch (d) {
                throw console.error(
                  "Could not parse message into JSON:",
                  l.data
                ), console.error("From chunk:", l.raw), d;
              }
              if (p && p.error)
                throw new Error(p.error);
              yield p;
            } else {
              let p;
              try {
                p = JSON.parse(l.data);
              } catch (d) {
                throw console.error(
                  "Could not parse message into JSON:",
                  l.data
                ), console.error("From chunk:", l.raw), d;
              }
              if (l.event == "error")
                throw new Error(p.message);
              yield { event: l.event, data: p };
            }
          }
        c = !0;
      } catch (l) {
        if (l instanceof Error && l.name === "AbortError") return;
        throw l;
      } finally {
        c || t.abort();
      }
    }
    return new Ot(a, t);
  }
  /**
   * Generates a Stream from a newline-separated ReadableStream
   * where each item is a JSON value.
   *
   * @template Item - The type of items in the stream.
   * @param {ReadableStream} readableStream - The readable stream to create the stream from.
   * @param {AbortController} controller - The abort controller to control the stream.
   * @returns {Stream<Item>} - The created stream.
   */
  static fromReadableStream(e, t) {
    let r = !1;
    async function* a() {
      const l = new Mi(), p = Oi(e);
      for await (const d of p)
        for (const g of l.decode(d))
          yield g;
      for (const d of l.flush())
        yield d;
    }
    async function* c() {
      if (r)
        throw new Error(
          "Cannot iterate over a consumed stream, use `.tee()` to split the stream."
        );
      r = !0;
      let l = !1;
      try {
        for await (const p of a())
          l || p && (yield JSON.parse(p));
        l = !0;
      } catch (p) {
        if (p instanceof Error && p.name === "AbortError") return;
        throw p;
      } finally {
        l || t.abort();
      }
    }
    return new Ot(c, t);
  }
  [Symbol.asyncIterator]() {
    return this.iterator();
  }
  /**
   * Splits the stream into two streams which can be
   * independently read from at different speeds.
   */
  tee() {
    const e = [], t = [], r = this.iterator(), a = (c) => ({
      next: () => {
        if (c.length === 0) {
          const l = r.next();
          e.push(l), t.push(l);
        }
        return c.shift();
      }
    });
    return [
      new Ot(() => a(e), this.controller),
      new Ot(() => a(t), this.controller)
    ];
  }
  /**
   * Converts this stream to a newline-separated ReadableStream of
   * JSON stringified values in the stream which can be turned back into a Stream with `Stream.fromReadableStream()`.
   */
  toReadableStream() {
    const e = this;
    let t;
    const r = new TextEncoder();
    return new ReadableStream({
      async start() {
        t = e[Symbol.asyncIterator]();
      },
      async pull(a) {
        try {
          const { value: c, done: l } = await t.next();
          if (l) return a.close();
          const p = r.encode(JSON.stringify(c) + `
`);
          a.enqueue(p);
        } catch (c) {
          a.error(c);
        }
      },
      async cancel() {
        var a;
        await ((a = t.return) == null ? void 0 : a.call(t));
      }
    });
  }
};
async function* jc(s, e) {
  if (!s.body)
    throw e.abort(), new Error("Attempted to iterate over a response with no body");
  const t = new Hc(), r = new Mi(), a = Oi(s.body);
  for await (const c of qc(a))
    for (const l of r.decode(c)) {
      const p = t.decode(l);
      p && (yield p);
    }
  for (const c of r.flush()) {
    const l = t.decode(c);
    l && (yield l);
  }
}
async function* qc(s) {
  let e = new Uint8Array();
  for await (const t of s) {
    if (t == null)
      continue;
    const r = t instanceof ArrayBuffer ? new Uint8Array(t) : typeof t == "string" ? new TextEncoder().encode(t) : t;
    let a = new Uint8Array(e.length + r.length);
    a.set(e), a.set(r, e.length), e = a;
    let c;
    for (; (c = Gc(e)) !== -1; )
      yield e.slice(0, c), e = e.slice(c);
  }
  e.length > 0 && (yield e);
}
function Gc(s) {
  for (let r = 0; r < s.length - 2; r++) {
    if (s[r] === 10 && s[r + 1] === 10 || s[r] === 13 && s[r + 1] === 13)
      return r + 2;
    if (s[r] === 13 && s[r + 1] === 10 && r + 3 < s.length && s[r + 2] === 13 && s[r + 3] === 10)
      return r + 4;
  }
  return -1;
}
var Hc = class {
  constructor() {
    this.event = null, this.data = [], this.chunks = [];
  }
  /**
   * Decodes a line of text and returns a ServerSentEvent object if a complete event is found.
   * @param line - The line of text to decode.
   * @returns A ServerSentEvent object if a complete event is found, otherwise null.
   */
  decode(s) {
    if (s.endsWith("\r") && (s = s.substring(0, s.length - 1)), !s) {
      if (!this.event && !this.data.length) return null;
      const a = {
        event: this.event,
        data: this.data.join(`
`),
        raw: this.chunks
      };
      return this.event = null, this.data = [], this.chunks = [], a;
    }
    if (this.chunks.push(s), s.startsWith(":"))
      return null;
    let [e, t, r] = zc(s, ":");
    return r.startsWith(" ") && (r = r.substring(1)), e === "event" ? this.event = r : e === "data" && this.data.push(r), null;
  }
}, sr = class Yn {
  // TextDecoder found in browsers; not typed to avoid pulling in either "dom" or "node" types.
  constructor() {
    this.buffer = [], this.trailingCR = !1;
  }
  decode(e) {
    let t = this.decodeText(e);
    if (this.trailingCR && (t = "\r" + t, this.trailingCR = !1), t.endsWith("\r") && (this.trailingCR = !0, t = t.slice(0, -1)), !t)
      return [];
    const r = Yn.NEWLINE_CHARS.has(
      t[t.length - 1] || ""
    );
    let a = t.split(Yn.NEWLINE_REGEXP);
    return r && a.pop(), a.length === 1 && !r ? (this.buffer.push(a[0]), []) : (this.buffer.length > 0 && (a = [this.buffer.join("") + a[0], ...a.slice(1)], this.buffer = []), r || (this.buffer = [a.pop() || ""]), a);
  }
  decodeText(e) {
    var t;
    if (e == null) return "";
    if (typeof e == "string") return e;
    if (typeof Buffer < "u") {
      if (e instanceof Buffer)
        return e.toString();
      if (e instanceof Uint8Array)
        return Buffer.from(e).toString();
      throw new Error(
        `Unexpected: received non-Uint8Array (${e.constructor.name}) stream chunk in an environment with a global "Buffer" defined, which this library assumes to be Node. Please report this error.`
      );
    }
    if (typeof TextDecoder < "u") {
      if (e instanceof Uint8Array || e instanceof ArrayBuffer)
        return (t = this.textDecoder) != null || (this.textDecoder = new TextDecoder("utf8")), this.textDecoder.decode(e);
      throw new Error(
        `Unexpected: received non-Uint8Array/ArrayBuffer (${e.constructor.name}) in a web platform. Please report this error.`
      );
    }
    throw new Error(
      "Unexpected: neither Buffer nor TextDecoder are available as globals. Please report this error."
    );
  }
  flush() {
    if (!this.buffer.length && !this.trailingCR)
      return [];
    const e = [this.buffer.join("")];
    return this.buffer = [], this.trailingCR = !1, e;
  }
};
sr.NEWLINE_CHARS = /* @__PURE__ */ new Set([`
`, "\r"]);
sr.NEWLINE_REGEXP = /\r\n|[\n\r]/g;
var Mi = sr;
function zc(s, e) {
  const t = s.indexOf(e);
  return t !== -1 ? [
    s.substring(0, t),
    e,
    s.substring(t + e.length)
  ] : [s, "", ""];
}
function Oi(s) {
  if (s[Symbol.asyncIterator]) return s;
  const e = s.getReader();
  return {
    async next() {
      try {
        const t = await e.read();
        return t != null && t.done && e.releaseLock(), t;
      } catch (t) {
        throw e.releaseLock(), t;
      }
    },
    async return() {
      const t = e.cancel();
      return e.releaseLock(), await t, { done: !0, value: void 0 };
    },
    [Symbol.asyncIterator]() {
      return this;
    }
  };
}
var Gs = class {
  constructor(s) {
    this.config = s;
  }
  // Main send function
  async send({ endpoint: s, ...e }) {
    var t, r, a, c, l;
    const p = this.buildUrl({ endpoint: s }), d = this.buildHeaders({ headers: e.headers });
    let g;
    try {
      g = await this.makeRequest({ url: p, options: e, headers: d });
    } catch (C) {
      throw new ki({
        cause: C instanceof Error ? C : void 0
      });
    }
    if (g.ok || await this.handleErrorResponse({ response: g }), Rc.includes(s)) {
      const C = g.headers.get("lb-thread-id");
      return e.body ? (a = e.body) != null && a.stream && p.includes("run") ? this.handleRunResponseStream({
        response: g,
        rawResponse: e.body.rawResponse
      }) : e.body.stream ? this.handleStreamResponse({ response: g }) : this.handleRunResponse({
        response: g,
        threadId: C,
        rawResponse: (l = (c = e.body) == null ? void 0 : c.rawResponse) != null ? l : !1,
        endpoint: s
      }) : this.handleRunResponse({
        response: g,
        threadId: null,
        rawResponse: (r = (t = e.body) == null ? void 0 : t.rawResponse) != null ? r : !1,
        endpoint: s
      });
    } else
      return g.json();
  }
  buildUrl({ endpoint: s }) {
    return `${this.config.baseUrl}${s}`;
  }
  buildHeaders({
    headers: s
  }) {
    return {
      "Content-Type": "application/json",
      Authorization: `Bearer ${this.config.apiKey}`,
      ...s
    };
  }
  async makeRequest({
    url: s,
    options: e,
    headers: t
  }) {
    return fetch(s, {
      method: e.method,
      headers: t,
      body: JSON.stringify(e.body)
      // signal: AbortSignal.timeout(this.config.timeout || 30000),
    });
  }
  async handleErrorResponse({
    response: s
  }) {
    let e;
    try {
      e = await s.json();
    } catch {
      e = await s.text();
    }
    throw be.generate(
      s.status,
      e,
      s.statusText,
      s.headers
    );
  }
  handleStreamResponse({ response: s }) {
    const e = new AbortController();
    return { stream: qs.fromSSEResponse(s, e), threadId: s.headers.get("lb-thread-id") };
  }
  handleRunResponseStream({
    response: s,
    rawResponse: e
  }) {
    const t = new AbortController(), c = {
      stream: qs.fromSSEResponse(s, t).toReadableStream(),
      threadId: s.headers.get("lb-thread-id")
    };
    return e && (c.rawResponse = {
      headers: Object.fromEntries(s.headers.entries())
    }), c;
  }
  async handleRunResponse({
    response: s,
    threadId: e,
    rawResponse: t,
    endpoint: r
  }) {
    let a = !1;
    r === "/v1/agent/run" && (a = !0);
    const c = await s.json(), p = {
      ...c.raw ? a ? {
        output: c.output,
        ...c.raw
      } : {
        completion: c.completion,
        ...c.raw
      } : c
    };
    return e && (p.threadId = e), t && (p.rawResponse = {
      headers: Object.fromEntries(s.headers.entries())
    }), p;
  }
  async post(s) {
    return this.send({ ...s, method: "POST" });
  }
  async get(s) {
    return this.send({ ...s, method: "GET" });
  }
  async put(s) {
    return this.send({ ...s, method: "PUT" });
  }
  async delete(s) {
    return this.send({ ...s, method: "DELETE" });
  }
}, Yc = class {
  constructor(s) {
    var e, t;
    this.baseUrl = (e = s == null ? void 0 : s.baseUrl) != null ? e : "https://api.langbase.com", this.apiKey = (t = s == null ? void 0 : s.apiKey) != null ? t : "", this.request = new Gs({
      apiKey: this.apiKey,
      baseUrl: this.baseUrl
    }), this.pipe = {
      list: this.listPipe.bind(this),
      create: this.createPipe.bind(this),
      update: this.updatePipe.bind(this),
      run: this.runPipe.bind(this)
    }, this.pipes = {
      list: this.listPipe.bind(this),
      create: this.createPipe.bind(this),
      update: this.updatePipe.bind(this),
      run: this.runPipe.bind(this)
    }, this.memory = {
      create: this.createMemory.bind(this),
      delete: this.deleteMemory.bind(this),
      retrieve: this.retrieveMemory.bind(this),
      list: this.listMemory.bind(this),
      documents: {
        list: this.listDocs.bind(this),
        delete: this.deleteDoc.bind(this),
        upload: this.uploadDocs.bind(this),
        embedding: {
          retry: this.retryDocEmbed.bind(this)
        }
      }
    }, this.memories = {
      create: this.createMemory.bind(this),
      delete: this.deleteMemory.bind(this),
      retrieve: this.retrieveMemory.bind(this),
      list: this.listMemory.bind(this),
      documents: {
        list: this.listDocs.bind(this),
        delete: this.deleteDoc.bind(this),
        upload: this.uploadDocs.bind(this),
        embeddings: {
          retry: this.retryDocEmbed.bind(this)
        }
      }
    }, this.tools = {
      crawl: this.webCrawl.bind(this),
      webSearch: this.webSearch.bind(this)
    }, this.tool = {
      crawl: this.webCrawl.bind(this),
      webSearch: this.webSearch.bind(this)
    }, this.embed = this.generateEmbeddings.bind(this), this.chunk = this.chunkDocument.bind(this), this.parse = this.parseDocument.bind(this), this.threads = {
      create: this.createThread.bind(this),
      update: this.updateThread.bind(this),
      get: this.getThread.bind(this),
      delete: this.deleteThread.bind(this),
      append: this.appendThreadMessages.bind(this),
      messages: {
        list: this.listThreadMessages.bind(this)
      }
    }, this.agent = {
      run: this.runAgent.bind(this)
    };
  }
  async runPipe(s) {
    var e;
    if (!((e = s.name) != null && e.trim()) && !s.apiKey)
      throw new Error(
        "Pipe name or Pipe API key is required to run the pipe."
      );
    return typeof s.stream > "u" && delete s.stream, s.apiKey && (this.request = new Gs({
      apiKey: s.apiKey,
      baseUrl: this.baseUrl
    })), this.request.post({
      endpoint: "/v1/pipes/run",
      body: s,
      headers: {
        ...s.llmKey && {
          "LB-LLM-KEY": s.llmKey
        }
      }
    });
  }
  /**
   * Creates a new pipe on Langbase.
   *
   * @param {PipeCreateOptions} options - The options for creating the pipe.
   * @returns {Promise<PipeCreateResponse>} A promise that resolves to the response of the pipe creation.
   */
  async createPipe(s) {
    return this.request.post({
      endpoint: "/v1/pipes",
      body: s
    });
  }
  /**
   * Updates a pipe on Langbase.
   *
   * @param {PipeUpdateOptions} options - The options for updating the pipe.
   * @returns {Promise<PipeUpdateResponse>} A promise that resolves to the response of the update operation.
   */
  async updatePipe(s) {
    return this.request.post({
      endpoint: `/v1/pipes/${s.name}`,
      body: s
    });
  }
  /**
   * Retrieves a list of pipes.
   *
   * @returns {Promise<PipeListResponse[]>} A promise that resolves to an array of PipeListResponse objects.
   */
  async listPipe() {
    return this.request.get({
      endpoint: "/v1/pipes"
    });
  }
  /**
   * Creates a new memory on Langbase.
   *
   * @param {MemoryCreateOptions} options - The options to create the memory instance.
   * @param {string} options.name - The name of the memory.
   * @param {string} options.description - The description of the memory.
   * @returns {Promise<MemoryCreateResponse>} A promise that resolves to the response of the memory creation.
   */
  async createMemory(s) {
    return this.request.post({
      endpoint: "/v1/memory",
      body: s
    });
  }
  /**
   * Retrieves a list of all memories on Langbase.
   *
   * @returns {Promise<MemoryListResponse[]>} A promise that resolves to an array of memory list responses.
   */
  async listMemory() {
    return this.request.get({
      endpoint: "/v1/memory"
    });
  }
  /**
   * Deletes a memory on Langbase.
   *
   * @param {MemoryDeleteOptions} options - The options for deleting the memory resource.
   * @param {string} options.name - The name of the memory to delete.
   * @returns {Promise<MemoryDeleteResponse>} A promise that resolves to the response of the delete operation.
   */
  async deleteMemory(s) {
    return this.request.delete({
      endpoint: `/v1/memory/${s.name}`
    });
  }
  /**
   * Retrieves similar text from the memory.
   *
   * @param {MemoryRetrieveOptions} options - The options to use for retrieving memory data.
   * @param {string} options.query - The query text to search for.
   * @param {object[]} options.memory - The memory to search in.
   * @param {number} [options.topK] - The number of similar texts to retrieve.
   * @returns A promise that resolves to an array of `MemoryRetrieveResponse` objects.
   */
  async retrieveMemory(s) {
    return this.request.post({
      endpoint: "/v1/memory/retrieve",
      body: s
    });
  }
  /**
   * Retrieves a list of documents inside a memory.
   *
   * @param {MemoryListDocOptions} options - The options for listing documents, including the memory name.
   * @param {string} options.memoryName - The name of the memory to list documents from.
   * @returns A promise that resolves to an array of `MemoryListDocResponse` objects.
   */
  async listDocs(s) {
    return this.request.get({
      endpoint: `/v1/memory/${s.memoryName}/documents`
    });
  }
  /**
   * Deletes a document from a memory.
   *
   * @param {MemoryDeleteDocOptions} options - The options for deleting the document.
   * @param {string} options.memoryName - The name of the memory to delete the document from.
   * @param {string} options.documentName - The name of the document to delete.
   * @returns A promise that resolves to a `MemoryDeleteDocResponse` indicating the result of the delete operation.
   */
  async deleteDoc(s) {
    return this.request.delete({
      endpoint: `/v1/memory/${s.memoryName}/documents/${s.documentName}`
    });
  }
  /**
   * Uploads a document to the memory.
   *
   * @param {MemoryUploadDocOptions} options - The options for uploading the document.
   * @param {string} options.memoryName - The name of the memory to upload the document to.
   * @param {string} options.fileName - The name of the file being uploaded.
   * @param {object} [options.meta] - Optional metadata associated with the document.
   * @param {string} options.contentType - The MIME type of the file being uploaded.
   * @param {Blob | Buffer} options.file - The file content to be uploaded.
   * @returns {Promise<Response>} The response from the upload request.
   * @throws Will throw an error if the upload fails.
   */
  async uploadDocs(s) {
    try {
      const t = (await this.request.post({
        endpoint: "/v1/memory/documents",
        body: {
          memoryName: s.memoryName,
          fileName: s.documentName,
          meta: s.meta
        }
      })).signedUrl;
      return await fetch(t, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${this.apiKey}`,
          "Content-Type": s.contentType
        },
        body: s.document
      });
    } catch (e) {
      throw e;
    }
  }
  /**
   * Retries the embedding process for a specific document in memory.
   *
   * @param options - The options required to retry the document embedding.
   * @param options.memoryName - The name of the memory containing the document.
   * @param options.documentName - The name of the document to retry embedding for.
   * @returns A promise that resolves to the response of the retry operation.
   */
  async retryDocEmbed(s) {
    return this.request.get({
      endpoint: `/v1/memory/${s.memoryName}/documents/${s.documentName}/embeddings/retry`
    });
  }
  /**
   * Performs a web search using the Langbase API.
   *
   * @param options - Web search configuration options
   * @param options.apiKey - Optional API key for web search authentication
   * @returns Promise that resolves to an array of web search results
   */
  async webSearch(s) {
    const e = s.apiKey ? s.apiKey : null;
    return e && delete s.apiKey, this.request.post({
      endpoint: "/v1/tools/web-search",
      body: s,
      headers: {
        ...e && {
          "LB-WEB-SEARCH-KEY": e
        }
      }
    });
  }
  /**
   * Performs a web crawls on target websites using the Langbase API.
   *
   * @param options - Crawl configuration options
   * @returns An array of responses containing data from the crawl operation.
   */
  async webCrawl(s) {
    const e = s.apiKey ? s.apiKey : null;
    return e && delete s.apiKey, this.request.post({
      endpoint: "/v1/tools/crawl",
      body: s,
      headers: {
        ...e && {
          "LB-CRAWL-KEY": e
        }
      }
    });
  }
  /**
   * Generates embeddings for the given input using the LangBase API.
   *
   * @param options - Embed options
   * @returns Promise that resolves to the embedding response containing vector representations
   */
  async generateEmbeddings(s) {
    return this.request.post({
      endpoint: "/v1/embed",
      body: s
    });
  }
  /**
   * Splits a given document into multiple chunks using the Langbase API.
   *
   * @param options - The chunking options.
   * @param options.document - The document to be chunked.
   * @param options.chunk_max_length - An optional maximum length for each chunk.
   * @param options.chunk_overlap - An optional number of overlapping characters between chunks.
   * @param options.separator - An optional separator used to split the document.
   * @returns A promise that resolves to the chunked document response.
   */
  async chunkDocument(s) {
    const e = await js({
      document: s.document,
      documentName: s.documentName,
      contentType: s.contentType
    });
    return s.chunkMaxLength && e.append("chunkMaxLength", s.chunkMaxLength), s.chunkOverlap && e.append("chunkOverlap", s.chunkOverlap), (await fetch(`${this.baseUrl}/v1/chunk`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${this.apiKey}`
      },
      body: e
    })).json();
  }
  /**
   * Parses a document using the Langbase API.
   *
   * @param options - The options for parsing the document
   * @param options.document - The document to be parsed
   * @param options.documentName - The name of the document
   * @param options.contentType - The content type of the document
   *
   * @returns A promise that resolves to the parse response from the API
   *
   * @throws {Error} If the API request fails
   */
  async parseDocument(s) {
    const e = await js({
      document: s.document,
      documentName: s.documentName,
      contentType: s.contentType
    });
    return (await fetch(`${this.baseUrl}/v1/parse`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${this.apiKey}`
      },
      body: e
    })).json();
  }
  /**
   * Creates a new thread with specified options.
   * @param {ThreadsCreate} options - The options object containing thread creation parameters.
   * @returns {Promise<ThreadsBaseResponse>} A promise that resolves to the created thread response.
   * @private
   */
  async createThread(s) {
    return this.request.post({
      endpoint: "/v1/threads",
      body: s
    });
  }
  /**
   * Updates an existing thread with the provided options.
   *
   * @param options - The options to update the thread with
   * @param options.threadId - The ID of the thread to update
   * @returns A promise that resolves to the updated thread response
   * @throws {Error} If the request fails
   */
  async updateThread(s) {
    return this.request.post({
      endpoint: `/v1/threads/${s.threadId}`,
      body: s
    });
  }
  /**
   * Retrieves a thread by its ID.
   * @param {ThreadsGet} options - The options object containing the thread ID.
   * @param {string} options.threadId - The unique identifier of the thread to retrieve.
   * @returns {Promise<ThreadsBaseResponse>} A promise that resolves to the thread data.
   */
  async getThread(s) {
    return this.request.get({
      endpoint: `/v1/threads/${s.threadId}`
    });
  }
  async deleteThread(s) {
    return this.request.delete({
      endpoint: `/v1/threads/${s.threadId}`
    });
  }
  async appendThreadMessages(s) {
    return this.request.post({
      endpoint: `/v1/threads/${s.threadId}/messages`,
      body: s.messages
    });
  }
  async listThreadMessages(s) {
    return this.request.get({
      endpoint: `/v1/threads/${s.threadId}/messages`
    });
  }
  async runAgent(s) {
    if (!s.apiKey)
      throw new Error("LLM API key is required to run this LLM.");
    return typeof s.stream > "u" && delete s.stream, this.request.post({
      endpoint: "/v1/agent/run",
      body: s,
      headers: {
        ...s.apiKey && { "LB-LLM-Key": s.apiKey }
      }
    });
  }
};
const Di = new Yc({
  apiKey: process.env.LANGBASE_API_KEY
});
async function Zc({
  chunks: s,
  query: e
}) {
  const t = await Kc(s), { completion: r } = await Di.pipes.run({
    stream: !1,
    name: "ai-support-agent",
    messages: [
      {
        role: "system",
        content: t
      },
      {
        role: "user",
        content: e
      }
    ]
  });
  return r;
}
async function Kc(s) {
  let e = "";
  for (const r of s)
    e += r.text + `
`;
  return `
    You're a helpful AI assistant.
    You will assist users with their queries.

    Always ensure that you provide accurate and to the point information.
    Below is some CONTEXT for you to answer the questions. ONLY answer from the CONTEXT. CONTEXT consists of multiple information chunks. Each chunk has a source mentioned at the end.

For each piece of response you provide, cite the source in brackets like so: [1].

At the end of the answer, always list each source with its corresponding number and provide the document name. like so [1] Filename.doc. If there is a URL, make it hyperlink on the name.

 If you don't know the answer, say so. Ask for more context if needed.
    ${e}`;
}
async function Qc(s) {
  return await Di.memories.retrieve({
    query: s,
    topK: 4,
    memory: [
      {
        name: "knowledge-base"
      }
    ]
  });
}
var Rn = {}, kt = {}, ie = {}, Hs;
function Jc() {
  if (Hs) return ie;
  Hs = 1, Object.defineProperty(ie, "__esModule", { value: !0 });
  class s extends Error {
  }
  class e extends s {
    constructor(n) {
      super(`Invalid DateTime: ${n.toMessage()}`);
    }
  }
  class t extends s {
    constructor(n) {
      super(`Invalid Interval: ${n.toMessage()}`);
    }
  }
  class r extends s {
    constructor(n) {
      super(`Invalid Duration: ${n.toMessage()}`);
    }
  }
  class a extends s {
  }
  class c extends s {
    constructor(n) {
      super(`Invalid unit ${n}`);
    }
  }
  class l extends s {
  }
  class p extends s {
    constructor() {
      super("Zone is an abstract class");
    }
  }
  const d = "numeric", g = "short", v = "long", C = {
    year: d,
    month: d,
    day: d
  }, _ = {
    year: d,
    month: g,
    day: d
  }, N = {
    year: d,
    month: g,
    day: d,
    weekday: g
  }, E = {
    year: d,
    month: v,
    day: d
  }, k = {
    year: d,
    month: v,
    day: d,
    weekday: v
  }, L = {
    hour: d,
    minute: d
  }, x = {
    hour: d,
    minute: d,
    second: d
  }, J = {
    hour: d,
    minute: d,
    second: d,
    timeZoneName: g
  }, ee = {
    hour: d,
    minute: d,
    second: d,
    timeZoneName: v
  }, F = {
    hour: d,
    minute: d,
    hourCycle: "h23"
  }, T = {
    hour: d,
    minute: d,
    second: d,
    hourCycle: "h23"
  }, $ = {
    hour: d,
    minute: d,
    second: d,
    hourCycle: "h23",
    timeZoneName: g
  }, R = {
    hour: d,
    minute: d,
    second: d,
    hourCycle: "h23",
    timeZoneName: v
  }, j = {
    year: d,
    month: d,
    day: d,
    hour: d,
    minute: d
  }, Y = {
    year: d,
    month: d,
    day: d,
    hour: d,
    minute: d,
    second: d
  }, P = {
    year: d,
    month: g,
    day: d,
    hour: d,
    minute: d
  }, q = {
    year: d,
    month: g,
    day: d,
    hour: d,
    minute: d,
    second: d
  }, Z = {
    year: d,
    month: g,
    day: d,
    weekday: g,
    hour: d,
    minute: d
  }, re = {
    year: d,
    month: v,
    day: d,
    hour: d,
    minute: d,
    timeZoneName: g
  }, ve = {
    year: d,
    month: v,
    day: d,
    hour: d,
    minute: d,
    second: d,
    timeZoneName: g
  }, _e = {
    year: d,
    month: v,
    day: d,
    weekday: v,
    hour: d,
    minute: d,
    timeZoneName: v
  }, ar = {
    year: d,
    month: v,
    day: d,
    weekday: v,
    hour: d,
    minute: d,
    second: d,
    timeZoneName: v
  };
  class He {
    /**
     * The type of zone
     * @abstract
     * @type {string}
     */
    get type() {
      throw new p();
    }
    /**
     * The name of this zone.
     * @abstract
     * @type {string}
     */
    get name() {
      throw new p();
    }
    /**
     * The IANA name of this zone.
     * Defaults to `name` if not overwritten by a subclass.
     * @abstract
     * @type {string}
     */
    get ianaName() {
      return this.name;
    }
    /**
     * Returns whether the offset is known to be fixed for the whole year.
     * @abstract
     * @type {boolean}
     */
    get isUniversal() {
      throw new p();
    }
    /**
     * Returns the offset's common name (such as EST) at the specified timestamp
     * @abstract
     * @param {number} ts - Epoch milliseconds for which to get the name
     * @param {Object} opts - Options to affect the format
     * @param {string} opts.format - What style of offset to return. Accepts 'long' or 'short'.
     * @param {string} opts.locale - What locale to return the offset name in.
     * @return {string}
     */
    offsetName(n, i) {
      throw new p();
    }
    /**
     * Returns the offset's value as a string
     * @abstract
     * @param {number} ts - Epoch milliseconds for which to get the offset
     * @param {string} format - What style of offset to return.
     *                          Accepts 'narrow', 'short', or 'techie'. Returning '+6', '+06:00', or '+0600' respectively
     * @return {string}
     */
    formatOffset(n, i) {
      throw new p();
    }
    /**
     * Return the offset in minutes for this zone at the specified timestamp.
     * @abstract
     * @param {number} ts - Epoch milliseconds for which to compute the offset
     * @return {number}
     */
    offset(n) {
      throw new p();
    }
    /**
     * Return whether this Zone is equal to another zone
     * @abstract
     * @param {Zone} otherZone - the zone to compare
     * @return {boolean}
     */
    equals(n) {
      throw new p();
    }
    /**
     * Return whether this Zone is valid.
     * @abstract
     * @type {boolean}
     */
    get isValid() {
      throw new p();
    }
  }
  let Xt = null;
  class dt extends He {
    /**
     * Get a singleton instance of the local zone
     * @return {SystemZone}
     */
    static get instance() {
      return Xt === null && (Xt = new dt()), Xt;
    }
    /** @override **/
    get type() {
      return "system";
    }
    /** @override **/
    get name() {
      return new Intl.DateTimeFormat().resolvedOptions().timeZone;
    }
    /** @override **/
    get isUniversal() {
      return !1;
    }
    /** @override **/
    offsetName(n, {
      format: i,
      locale: u
    }) {
      return Fr(n, i, u);
    }
    /** @override **/
    formatOffset(n, i) {
      return gt(this.offset(n), i);
    }
    /** @override **/
    offset(n) {
      return -new Date(n).getTimezoneOffset();
    }
    /** @override **/
    equals(n) {
      return n.type === "system";
    }
    /** @override **/
    get isValid() {
      return !0;
    }
  }
  const en = /* @__PURE__ */ new Map();
  function Wi(o) {
    let n = en.get(o);
    return n === void 0 && (n = new Intl.DateTimeFormat("en-US", {
      hour12: !1,
      timeZone: o,
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      era: "short"
    }), en.set(o, n)), n;
  }
  const ji = {
    year: 0,
    month: 1,
    day: 2,
    era: 3,
    hour: 4,
    minute: 5,
    second: 6
  };
  function qi(o, n) {
    const i = o.format(n).replace(/\u200E/g, ""), u = /(\d+)\/(\d+)\/(\d+) (AD|BC),? (\d+):(\d+):(\d+)/.exec(i), [, h, f, m, y, b, S, M] = u;
    return [m, h, f, y, b, S, M];
  }
  function Gi(o, n) {
    const i = o.formatToParts(n), u = [];
    for (let h = 0; h < i.length; h++) {
      const {
        type: f,
        value: m
      } = i[h], y = ji[f];
      f === "era" ? u[y] = m : O(y) || (u[y] = parseInt(m, 10));
    }
    return u;
  }
  const tn = /* @__PURE__ */ new Map();
  class me extends He {
    /**
     * @param {string} name - Zone name
     * @return {IANAZone}
     */
    static create(n) {
      let i = tn.get(n);
      return i === void 0 && tn.set(n, i = new me(n)), i;
    }
    /**
     * Reset local caches. Should only be necessary in testing scenarios.
     * @return {void}
     */
    static resetCache() {
      tn.clear(), en.clear();
    }
    /**
     * Returns whether the provided string is a valid specifier. This only checks the string's format, not that the specifier identifies a known zone; see isValidZone for that.
     * @param {string} s - The string to check validity on
     * @example IANAZone.isValidSpecifier("America/New_York") //=> true
     * @example IANAZone.isValidSpecifier("Sport~~blorp") //=> false
     * @deprecated For backward compatibility, this forwards to isValidZone, better use `isValidZone()` directly instead.
     * @return {boolean}
     */
    static isValidSpecifier(n) {
      return this.isValidZone(n);
    }
    /**
     * Returns whether the provided string identifies a real zone
     * @param {string} zone - The string to check
     * @example IANAZone.isValidZone("America/New_York") //=> true
     * @example IANAZone.isValidZone("Fantasia/Castle") //=> false
     * @example IANAZone.isValidZone("Sport~~blorp") //=> false
     * @return {boolean}
     */
    static isValidZone(n) {
      if (!n)
        return !1;
      try {
        return new Intl.DateTimeFormat("en-US", {
          timeZone: n
        }).format(), !0;
      } catch {
        return !1;
      }
    }
    constructor(n) {
      super(), this.zoneName = n, this.valid = me.isValidZone(n);
    }
    /**
     * The type of zone. `iana` for all instances of `IANAZone`.
     * @override
     * @type {string}
     */
    get type() {
      return "iana";
    }
    /**
     * The name of this zone (i.e. the IANA zone name).
     * @override
     * @type {string}
     */
    get name() {
      return this.zoneName;
    }
    /**
     * Returns whether the offset is known to be fixed for the whole year:
     * Always returns false for all IANA zones.
     * @override
     * @type {boolean}
     */
    get isUniversal() {
      return !1;
    }
    /**
     * Returns the offset's common name (such as EST) at the specified timestamp
     * @override
     * @param {number} ts - Epoch milliseconds for which to get the name
     * @param {Object} opts - Options to affect the format
     * @param {string} opts.format - What style of offset to return. Accepts 'long' or 'short'.
     * @param {string} opts.locale - What locale to return the offset name in.
     * @return {string}
     */
    offsetName(n, {
      format: i,
      locale: u
    }) {
      return Fr(n, i, u, this.name);
    }
    /**
     * Returns the offset's value as a string
     * @override
     * @param {number} ts - Epoch milliseconds for which to get the offset
     * @param {string} format - What style of offset to return.
     *                          Accepts 'narrow', 'short', or 'techie'. Returning '+6', '+06:00', or '+0600' respectively
     * @return {string}
     */
    formatOffset(n, i) {
      return gt(this.offset(n), i);
    }
    /**
     * Return the offset in minutes for this zone at the specified timestamp.
     * @override
     * @param {number} ts - Epoch milliseconds for which to compute the offset
     * @return {number}
     */
    offset(n) {
      if (!this.valid) return NaN;
      const i = new Date(n);
      if (isNaN(i)) return NaN;
      const u = Wi(this.name);
      let [h, f, m, y, b, S, M] = u.formatToParts ? Gi(u, i) : qi(u, i);
      y === "BC" && (h = -Math.abs(h) + 1);
      const K = Lt({
        year: h,
        month: f,
        day: m,
        hour: b === 24 ? 0 : b,
        minute: S,
        second: M,
        millisecond: 0
      });
      let A = +i;
      const X = A % 1e3;
      return A -= X >= 0 ? X : 1e3 + X, (K - A) / (60 * 1e3);
    }
    /**
     * Return whether this Zone is equal to another zone
     * @override
     * @param {Zone} otherZone - the zone to compare
     * @return {boolean}
     */
    equals(n) {
      return n.type === "iana" && n.name === this.name;
    }
    /**
     * Return whether this Zone is valid.
     * @override
     * @type {boolean}
     */
    get isValid() {
      return this.valid;
    }
  }
  let or = {};
  function Hi(o, n = {}) {
    const i = JSON.stringify([o, n]);
    let u = or[i];
    return u || (u = new Intl.ListFormat(o, n), or[i] = u), u;
  }
  const nn = /* @__PURE__ */ new Map();
  function rn(o, n = {}) {
    const i = JSON.stringify([o, n]);
    let u = nn.get(i);
    return u === void 0 && (u = new Intl.DateTimeFormat(o, n), nn.set(i, u)), u;
  }
  const sn = /* @__PURE__ */ new Map();
  function zi(o, n = {}) {
    const i = JSON.stringify([o, n]);
    let u = sn.get(i);
    return u === void 0 && (u = new Intl.NumberFormat(o, n), sn.set(i, u)), u;
  }
  const an = /* @__PURE__ */ new Map();
  function Yi(o, n = {}) {
    const {
      base: i,
      ...u
    } = n, h = JSON.stringify([o, u]);
    let f = an.get(h);
    return f === void 0 && (f = new Intl.RelativeTimeFormat(o, n), an.set(h, f)), f;
  }
  let ft = null;
  function Zi() {
    return ft || (ft = new Intl.DateTimeFormat().resolvedOptions().locale, ft);
  }
  const on = /* @__PURE__ */ new Map();
  function ur(o) {
    let n = on.get(o);
    return n === void 0 && (n = new Intl.DateTimeFormat(o).resolvedOptions(), on.set(o, n)), n;
  }
  const un = /* @__PURE__ */ new Map();
  function Ki(o) {
    let n = un.get(o);
    if (!n) {
      const i = new Intl.Locale(o);
      n = "getWeekInfo" in i ? i.getWeekInfo() : i.weekInfo, "minimalDays" in n || (n = {
        ...cr,
        ...n
      }), un.set(o, n);
    }
    return n;
  }
  function Qi(o) {
    const n = o.indexOf("-x-");
    n !== -1 && (o = o.substring(0, n));
    const i = o.indexOf("-u-");
    if (i === -1)
      return [o];
    {
      let u, h;
      try {
        u = rn(o).resolvedOptions(), h = o;
      } catch {
        const b = o.substring(0, i);
        u = rn(b).resolvedOptions(), h = b;
      }
      const {
        numberingSystem: f,
        calendar: m
      } = u;
      return [h, f, m];
    }
  }
  function Ji(o, n, i) {
    return (i || n) && (o.includes("-u-") || (o += "-u"), i && (o += `-ca-${i}`), n && (o += `-nu-${n}`)), o;
  }
  function Xi(o) {
    const n = [];
    for (let i = 1; i <= 12; i++) {
      const u = D.utc(2009, i, 1);
      n.push(o(u));
    }
    return n;
  }
  function ea(o) {
    const n = [];
    for (let i = 1; i <= 7; i++) {
      const u = D.utc(2016, 11, 13 + i);
      n.push(o(u));
    }
    return n;
  }
  function Ft(o, n, i, u) {
    const h = o.listingMode();
    return h === "error" ? null : h === "en" ? i(n) : u(n);
  }
  function ta(o) {
    return o.numberingSystem && o.numberingSystem !== "latn" ? !1 : o.numberingSystem === "latn" || !o.locale || o.locale.startsWith("en") || ur(o.locale).numberingSystem === "latn";
  }
  class na {
    constructor(n, i, u) {
      this.padTo = u.padTo || 0, this.floor = u.floor || !1;
      const {
        padTo: h,
        floor: f,
        ...m
      } = u;
      if (!i || Object.keys(m).length > 0) {
        const y = {
          useGrouping: !1,
          ...u
        };
        u.padTo > 0 && (y.minimumIntegerDigits = u.padTo), this.inf = zi(n, y);
      }
    }
    format(n) {
      if (this.inf) {
        const i = this.floor ? Math.floor(n) : n;
        return this.inf.format(i);
      } else {
        const i = this.floor ? Math.floor(n) : yn(n, 3);
        return Q(i, this.padTo);
      }
    }
  }
  class ra {
    constructor(n, i, u) {
      this.opts = u, this.originalZone = void 0;
      let h;
      if (this.opts.timeZone)
        this.dt = n;
      else if (n.zone.type === "fixed") {
        const m = -1 * (n.offset / 60), y = m >= 0 ? `Etc/GMT+${m}` : `Etc/GMT${m}`;
        n.offset !== 0 && me.create(y).valid ? (h = y, this.dt = n) : (h = "UTC", this.dt = n.offset === 0 ? n : n.setZone("UTC").plus({
          minutes: n.offset
        }), this.originalZone = n.zone);
      } else n.zone.type === "system" ? this.dt = n : n.zone.type === "iana" ? (this.dt = n, h = n.zone.name) : (h = "UTC", this.dt = n.setZone("UTC").plus({
        minutes: n.offset
      }), this.originalZone = n.zone);
      const f = {
        ...this.opts
      };
      f.timeZone = f.timeZone || h, this.dtf = rn(i, f);
    }
    format() {
      return this.originalZone ? this.formatToParts().map(({
        value: n
      }) => n).join("") : this.dtf.format(this.dt.toJSDate());
    }
    formatToParts() {
      const n = this.dtf.formatToParts(this.dt.toJSDate());
      return this.originalZone ? n.map((i) => {
        if (i.type === "timeZoneName") {
          const u = this.originalZone.offsetName(this.dt.ts, {
            locale: this.dt.locale,
            format: this.opts.timeZoneName
          });
          return {
            ...i,
            value: u
          };
        } else
          return i;
      }) : n;
    }
    resolvedOptions() {
      return this.dtf.resolvedOptions();
    }
  }
  class sa {
    constructor(n, i, u) {
      this.opts = {
        style: "long",
        ...u
      }, !i && Or() && (this.rtf = Yi(n, u));
    }
    format(n, i) {
      return this.rtf ? this.rtf.format(n, i) : Ea(i, n, this.opts.numeric, this.opts.style !== "long");
    }
    formatToParts(n, i) {
      return this.rtf ? this.rtf.formatToParts(n, i) : [];
    }
  }
  const cr = {
    firstDay: 1,
    minimalDays: 4,
    weekend: [6, 7]
  };
  class W {
    static fromOpts(n) {
      return W.create(n.locale, n.numberingSystem, n.outputCalendar, n.weekSettings, n.defaultToEN);
    }
    static create(n, i, u, h, f = !1) {
      const m = n || H.defaultLocale, y = m || (f ? "en-US" : Zi()), b = i || H.defaultNumberingSystem, S = u || H.defaultOutputCalendar, M = pn(h) || H.defaultWeekSettings;
      return new W(y, b, S, M, m);
    }
    static resetCache() {
      ft = null, nn.clear(), sn.clear(), an.clear(), on.clear(), un.clear();
    }
    static fromObject({
      locale: n,
      numberingSystem: i,
      outputCalendar: u,
      weekSettings: h
    } = {}) {
      return W.create(n, i, u, h);
    }
    constructor(n, i, u, h, f) {
      const [m, y, b] = Qi(n);
      this.locale = m, this.numberingSystem = i || y || null, this.outputCalendar = u || b || null, this.weekSettings = h, this.intl = Ji(this.locale, this.numberingSystem, this.outputCalendar), this.weekdaysCache = {
        format: {},
        standalone: {}
      }, this.monthsCache = {
        format: {},
        standalone: {}
      }, this.meridiemCache = null, this.eraCache = {}, this.specifiedLocale = f, this.fastNumbersCached = null;
    }
    get fastNumbers() {
      return this.fastNumbersCached == null && (this.fastNumbersCached = ta(this)), this.fastNumbersCached;
    }
    listingMode() {
      const n = this.isEnglish(), i = (this.numberingSystem === null || this.numberingSystem === "latn") && (this.outputCalendar === null || this.outputCalendar === "gregory");
      return n && i ? "en" : "intl";
    }
    clone(n) {
      return !n || Object.getOwnPropertyNames(n).length === 0 ? this : W.create(n.locale || this.specifiedLocale, n.numberingSystem || this.numberingSystem, n.outputCalendar || this.outputCalendar, pn(n.weekSettings) || this.weekSettings, n.defaultToEN || !1);
    }
    redefaultToEN(n = {}) {
      return this.clone({
        ...n,
        defaultToEN: !0
      });
    }
    redefaultToSystem(n = {}) {
      return this.clone({
        ...n,
        defaultToEN: !1
      });
    }
    months(n, i = !1) {
      return Ft(this, n, xr, () => {
        const u = i ? {
          month: n,
          day: "numeric"
        } : {
          month: n
        }, h = i ? "format" : "standalone";
        return this.monthsCache[h][n] || (this.monthsCache[h][n] = Xi((f) => this.extract(f, u, "month"))), this.monthsCache[h][n];
      });
    }
    weekdays(n, i = !1) {
      return Ft(this, n, Vr, () => {
        const u = i ? {
          weekday: n,
          year: "numeric",
          month: "long",
          day: "numeric"
        } : {
          weekday: n
        }, h = i ? "format" : "standalone";
        return this.weekdaysCache[h][n] || (this.weekdaysCache[h][n] = ea((f) => this.extract(f, u, "weekday"))), this.weekdaysCache[h][n];
      });
    }
    meridiems() {
      return Ft(this, void 0, () => Br, () => {
        if (!this.meridiemCache) {
          const n = {
            hour: "numeric",
            hourCycle: "h12"
          };
          this.meridiemCache = [D.utc(2016, 11, 13, 9), D.utc(2016, 11, 13, 19)].map((i) => this.extract(i, n, "dayperiod"));
        }
        return this.meridiemCache;
      });
    }
    eras(n) {
      return Ft(this, n, Ur, () => {
        const i = {
          era: n
        };
        return this.eraCache[n] || (this.eraCache[n] = [D.utc(-40, 1, 1), D.utc(2017, 1, 1)].map((u) => this.extract(u, i, "era"))), this.eraCache[n];
      });
    }
    extract(n, i, u) {
      const h = this.dtFormatter(n, i), f = h.formatToParts(), m = f.find((y) => y.type.toLowerCase() === u);
      return m ? m.value : null;
    }
    numberFormatter(n = {}) {
      return new na(this.intl, n.forceSimple || this.fastNumbers, n);
    }
    dtFormatter(n, i = {}) {
      return new ra(n, this.intl, i);
    }
    relFormatter(n = {}) {
      return new sa(this.intl, this.isEnglish(), n);
    }
    listFormatter(n = {}) {
      return Hi(this.intl, n);
    }
    isEnglish() {
      return this.locale === "en" || this.locale.toLowerCase() === "en-us" || ur(this.intl).locale.startsWith("en-us");
    }
    getWeekSettings() {
      return this.weekSettings ? this.weekSettings : Dr() ? Ki(this.locale) : cr;
    }
    getStartOfWeek() {
      return this.getWeekSettings().firstDay;
    }
    getMinDaysInFirstWeek() {
      return this.getWeekSettings().minimalDays;
    }
    getWeekendDays() {
      return this.getWeekSettings().weekend;
    }
    equals(n) {
      return this.locale === n.locale && this.numberingSystem === n.numberingSystem && this.outputCalendar === n.outputCalendar;
    }
    toString() {
      return `Locale(${this.locale}, ${this.numberingSystem}, ${this.outputCalendar})`;
    }
  }
  let cn = null;
  class te extends He {
    /**
     * Get a singleton instance of UTC
     * @return {FixedOffsetZone}
     */
    static get utcInstance() {
      return cn === null && (cn = new te(0)), cn;
    }
    /**
     * Get an instance with a specified offset
     * @param {number} offset - The offset in minutes
     * @return {FixedOffsetZone}
     */
    static instance(n) {
      return n === 0 ? te.utcInstance : new te(n);
    }
    /**
     * Get an instance of FixedOffsetZone from a UTC offset string, like "UTC+6"
     * @param {string} s - The offset string to parse
     * @example FixedOffsetZone.parseSpecifier("UTC+6")
     * @example FixedOffsetZone.parseSpecifier("UTC+06")
     * @example FixedOffsetZone.parseSpecifier("UTC-6:00")
     * @return {FixedOffsetZone}
     */
    static parseSpecifier(n) {
      if (n) {
        const i = n.match(/^utc(?:([+-]\d{1,2})(?::(\d{2}))?)?$/i);
        if (i)
          return new te(Pt(i[1], i[2]));
      }
      return null;
    }
    constructor(n) {
      super(), this.fixed = n;
    }
    /**
     * The type of zone. `fixed` for all instances of `FixedOffsetZone`.
     * @override
     * @type {string}
     */
    get type() {
      return "fixed";
    }
    /**
     * The name of this zone.
     * All fixed zones' names always start with "UTC" (plus optional offset)
     * @override
     * @type {string}
     */
    get name() {
      return this.fixed === 0 ? "UTC" : `UTC${gt(this.fixed, "narrow")}`;
    }
    /**
     * The IANA name of this zone, i.e. `Etc/UTC` or `Etc/GMT+/-nn`
     *
     * @override
     * @type {string}
     */
    get ianaName() {
      return this.fixed === 0 ? "Etc/UTC" : `Etc/GMT${gt(-this.fixed, "narrow")}`;
    }
    /**
     * Returns the offset's common name at the specified timestamp.
     *
     * For fixed offset zones this equals to the zone name.
     * @override
     */
    offsetName() {
      return this.name;
    }
    /**
     * Returns the offset's value as a string
     * @override
     * @param {number} ts - Epoch milliseconds for which to get the offset
     * @param {string} format - What style of offset to return.
     *                          Accepts 'narrow', 'short', or 'techie'. Returning '+6', '+06:00', or '+0600' respectively
     * @return {string}
     */
    formatOffset(n, i) {
      return gt(this.fixed, i);
    }
    /**
     * Returns whether the offset is known to be fixed for the whole year:
     * Always returns true for all fixed offset zones.
     * @override
     * @type {boolean}
     */
    get isUniversal() {
      return !0;
    }
    /**
     * Return the offset in minutes for this zone at the specified timestamp.
     *
     * For fixed offset zones, this is constant and does not depend on a timestamp.
     * @override
     * @return {number}
     */
    offset() {
      return this.fixed;
    }
    /**
     * Return whether this Zone is equal to another zone (i.e. also fixed and same offset)
     * @override
     * @param {Zone} otherZone - the zone to compare
     * @return {boolean}
     */
    equals(n) {
      return n.type === "fixed" && n.fixed === this.fixed;
    }
    /**
     * Return whether this Zone is valid:
     * All fixed offset zones are valid.
     * @override
     * @type {boolean}
     */
    get isValid() {
      return !0;
    }
  }
  class lr extends He {
    constructor(n) {
      super(), this.zoneName = n;
    }
    /** @override **/
    get type() {
      return "invalid";
    }
    /** @override **/
    get name() {
      return this.zoneName;
    }
    /** @override **/
    get isUniversal() {
      return !1;
    }
    /** @override **/
    offsetName() {
      return null;
    }
    /** @override **/
    formatOffset() {
      return "";
    }
    /** @override **/
    offset() {
      return NaN;
    }
    /** @override **/
    equals() {
      return !1;
    }
    /** @override **/
    get isValid() {
      return !1;
    }
  }
  function Ee(o, n) {
    if (O(o) || o === null)
      return n;
    if (o instanceof He)
      return o;
    if (la(o)) {
      const i = o.toLowerCase();
      return i === "default" ? n : i === "local" || i === "system" ? dt.instance : i === "utc" || i === "gmt" ? te.utcInstance : te.parseSpecifier(i) || me.create(o);
    } else return Ie(o) ? te.instance(o) : typeof o == "object" && "offset" in o && typeof o.offset == "function" ? o : new lr(o);
  }
  const ln = {
    arab: "[٠-٩]",
    arabext: "[۰-۹]",
    bali: "[᭐-᭙]",
    beng: "[০-৯]",
    deva: "[०-९]",
    fullwide: "[０-９]",
    gujr: "[૦-૯]",
    hanidec: "[〇|一|二|三|四|五|六|七|八|九]",
    khmr: "[០-៩]",
    knda: "[೦-೯]",
    laoo: "[໐-໙]",
    limb: "[᥆-᥏]",
    mlym: "[൦-൯]",
    mong: "[᠐-᠙]",
    mymr: "[၀-၉]",
    orya: "[୦-୯]",
    tamldec: "[௦-௯]",
    telu: "[౦-౯]",
    thai: "[๐-๙]",
    tibt: "[༠-༩]",
    latn: "\\d"
  }, hr = {
    arab: [1632, 1641],
    arabext: [1776, 1785],
    bali: [6992, 7001],
    beng: [2534, 2543],
    deva: [2406, 2415],
    fullwide: [65296, 65303],
    gujr: [2790, 2799],
    khmr: [6112, 6121],
    knda: [3302, 3311],
    laoo: [3792, 3801],
    limb: [6470, 6479],
    mlym: [3430, 3439],
    mong: [6160, 6169],
    mymr: [4160, 4169],
    orya: [2918, 2927],
    tamldec: [3046, 3055],
    telu: [3174, 3183],
    thai: [3664, 3673],
    tibt: [3872, 3881]
  }, ia = ln.hanidec.replace(/[\[|\]]/g, "").split("");
  function aa(o) {
    let n = parseInt(o, 10);
    if (isNaN(n)) {
      n = "";
      for (let i = 0; i < o.length; i++) {
        const u = o.charCodeAt(i);
        if (o[i].search(ln.hanidec) !== -1)
          n += ia.indexOf(o[i]);
        else
          for (const h in hr) {
            const [f, m] = hr[h];
            u >= f && u <= m && (n += u - f);
          }
      }
      return parseInt(n, 10);
    } else
      return n;
  }
  const hn = /* @__PURE__ */ new Map();
  function oa() {
    hn.clear();
  }
  function he({
    numberingSystem: o
  }, n = "") {
    const i = o || "latn";
    let u = hn.get(i);
    u === void 0 && (u = /* @__PURE__ */ new Map(), hn.set(i, u));
    let h = u.get(n);
    return h === void 0 && (h = new RegExp(`${ln[i]}${n}`), u.set(n, h)), h;
  }
  let dr = () => Date.now(), fr = "system", mr = null, pr = null, gr = null, yr = 60, wr, br = null;
  class H {
    /**
     * Get the callback for returning the current timestamp.
     * @type {function}
     */
    static get now() {
      return dr;
    }
    /**
     * Set the callback for returning the current timestamp.
     * The function should return a number, which will be interpreted as an Epoch millisecond count
     * @type {function}
     * @example Settings.now = () => Date.now() + 3000 // pretend it is 3 seconds in the future
     * @example Settings.now = () => 0 // always pretend it's Jan 1, 1970 at midnight in UTC time
     */
    static set now(n) {
      dr = n;
    }
    /**
     * Set the default time zone to create DateTimes in. Does not affect existing instances.
     * Use the value "system" to reset this value to the system's time zone.
     * @type {string}
     */
    static set defaultZone(n) {
      fr = n;
    }
    /**
     * Get the default time zone object currently used to create DateTimes. Does not affect existing instances.
     * The default value is the system's time zone (the one set on the machine that runs this code).
     * @type {Zone}
     */
    static get defaultZone() {
      return Ee(fr, dt.instance);
    }
    /**
     * Get the default locale to create DateTimes with. Does not affect existing instances.
     * @type {string}
     */
    static get defaultLocale() {
      return mr;
    }
    /**
     * Set the default locale to create DateTimes with. Does not affect existing instances.
     * @type {string}
     */
    static set defaultLocale(n) {
      mr = n;
    }
    /**
     * Get the default numbering system to create DateTimes with. Does not affect existing instances.
     * @type {string}
     */
    static get defaultNumberingSystem() {
      return pr;
    }
    /**
     * Set the default numbering system to create DateTimes with. Does not affect existing instances.
     * @type {string}
     */
    static set defaultNumberingSystem(n) {
      pr = n;
    }
    /**
     * Get the default output calendar to create DateTimes with. Does not affect existing instances.
     * @type {string}
     */
    static get defaultOutputCalendar() {
      return gr;
    }
    /**
     * Set the default output calendar to create DateTimes with. Does not affect existing instances.
     * @type {string}
     */
    static set defaultOutputCalendar(n) {
      gr = n;
    }
    /**
     * @typedef {Object} WeekSettings
     * @property {number} firstDay
     * @property {number} minimalDays
     * @property {number[]} weekend
     */
    /**
     * @return {WeekSettings|null}
     */
    static get defaultWeekSettings() {
      return br;
    }
    /**
     * Allows overriding the default locale week settings, i.e. the start of the week, the weekend and
     * how many days are required in the first week of a year.
     * Does not affect existing instances.
     *
     * @param {WeekSettings|null} weekSettings
     */
    static set defaultWeekSettings(n) {
      br = pn(n);
    }
    /**
     * Get the cutoff year for whether a 2-digit year string is interpreted in the current or previous century. Numbers higher than the cutoff will be considered to mean 19xx and numbers lower or equal to the cutoff will be considered 20xx.
     * @type {number}
     */
    static get twoDigitCutoffYear() {
      return yr;
    }
    /**
     * Set the cutoff year for whether a 2-digit year string is interpreted in the current or previous century. Numbers higher than the cutoff will be considered to mean 19xx and numbers lower or equal to the cutoff will be considered 20xx.
     * @type {number}
     * @example Settings.twoDigitCutoffYear = 0 // all 'yy' are interpreted as 20th century
     * @example Settings.twoDigitCutoffYear = 99 // all 'yy' are interpreted as 21st century
     * @example Settings.twoDigitCutoffYear = 50 // '49' -> 2049; '50' -> 1950
     * @example Settings.twoDigitCutoffYear = 1950 // interpreted as 50
     * @example Settings.twoDigitCutoffYear = 2050 // ALSO interpreted as 50
     */
    static set twoDigitCutoffYear(n) {
      yr = n % 100;
    }
    /**
     * Get whether Luxon will throw when it encounters invalid DateTimes, Durations, or Intervals
     * @type {boolean}
     */
    static get throwOnInvalid() {
      return wr;
    }
    /**
     * Set whether Luxon will throw when it encounters invalid DateTimes, Durations, or Intervals
     * @type {boolean}
     */
    static set throwOnInvalid(n) {
      wr = n;
    }
    /**
     * Reset Luxon's global caches. Should only be necessary in testing scenarios.
     * @return {void}
     */
    static resetCaches() {
      W.resetCache(), me.resetCache(), D.resetCache(), oa();
    }
  }
  class de {
    constructor(n, i) {
      this.reason = n, this.explanation = i;
    }
    toMessage() {
      return this.explanation ? `${this.reason}: ${this.explanation}` : this.reason;
    }
  }
  const vr = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334], Cr = [0, 31, 60, 91, 121, 152, 182, 213, 244, 274, 305, 335];
  function ue(o, n) {
    return new de("unit out of range", `you specified ${n} (of type ${typeof n}) as a ${o}, which is invalid`);
  }
  function dn(o, n, i) {
    const u = new Date(Date.UTC(o, n - 1, i));
    o < 100 && o >= 0 && u.setUTCFullYear(u.getUTCFullYear() - 1900);
    const h = u.getUTCDay();
    return h === 0 ? 7 : h;
  }
  function Sr(o, n, i) {
    return i + (mt(o) ? Cr : vr)[n - 1];
  }
  function Tr(o, n) {
    const i = mt(o) ? Cr : vr, u = i.findIndex((f) => f < n), h = n - i[u];
    return {
      month: u + 1,
      day: h
    };
  }
  function fn(o, n) {
    return (o - n + 7) % 7 + 1;
  }
  function Rt(o, n = 4, i = 1) {
    const {
      year: u,
      month: h,
      day: f
    } = o, m = Sr(u, h, f), y = fn(dn(u, h, f), i);
    let b = Math.floor((m - y + 14 - n) / 7), S;
    return b < 1 ? (S = u - 1, b = pt(S, n, i)) : b > pt(u, n, i) ? (S = u + 1, b = 1) : S = u, {
      weekYear: S,
      weekNumber: b,
      weekday: y,
      ...Bt(o)
    };
  }
  function _r(o, n = 4, i = 1) {
    const {
      weekYear: u,
      weekNumber: h,
      weekday: f
    } = o, m = fn(dn(u, 1, n), i), y = Ye(u);
    let b = h * 7 + f - m - 7 + n, S;
    b < 1 ? (S = u - 1, b += Ye(S)) : b > y ? (S = u + 1, b -= Ye(u)) : S = u;
    const {
      month: M,
      day: V
    } = Tr(S, b);
    return {
      year: S,
      month: M,
      day: V,
      ...Bt(o)
    };
  }
  function mn(o) {
    const {
      year: n,
      month: i,
      day: u
    } = o, h = Sr(n, i, u);
    return {
      year: n,
      ordinal: h,
      ...Bt(o)
    };
  }
  function Er(o) {
    const {
      year: n,
      ordinal: i
    } = o, {
      month: u,
      day: h
    } = Tr(n, i);
    return {
      year: n,
      month: u,
      day: h,
      ...Bt(o)
    };
  }
  function Ir(o, n) {
    if (!O(o.localWeekday) || !O(o.localWeekNumber) || !O(o.localWeekYear)) {
      if (!O(o.weekday) || !O(o.weekNumber) || !O(o.weekYear))
        throw new a("Cannot mix locale-based week fields with ISO-based week fields");
      return O(o.localWeekday) || (o.weekday = o.localWeekday), O(o.localWeekNumber) || (o.weekNumber = o.localWeekNumber), O(o.localWeekYear) || (o.weekYear = o.localWeekYear), delete o.localWeekday, delete o.localWeekNumber, delete o.localWeekYear, {
        minDaysInFirstWeek: n.getMinDaysInFirstWeek(),
        startOfWeek: n.getStartOfWeek()
      };
    } else
      return {
        minDaysInFirstWeek: 4,
        startOfWeek: 1
      };
  }
  function ua(o, n = 4, i = 1) {
    const u = $t(o.weekYear), h = ce(o.weekNumber, 1, pt(o.weekYear, n, i)), f = ce(o.weekday, 1, 7);
    return u ? h ? f ? !1 : ue("weekday", o.weekday) : ue("week", o.weekNumber) : ue("weekYear", o.weekYear);
  }
  function ca(o) {
    const n = $t(o.year), i = ce(o.ordinal, 1, Ye(o.year));
    return n ? i ? !1 : ue("ordinal", o.ordinal) : ue("year", o.year);
  }
  function kr(o) {
    const n = $t(o.year), i = ce(o.month, 1, 12), u = ce(o.day, 1, xt(o.year, o.month));
    return n ? i ? u ? !1 : ue("day", o.day) : ue("month", o.month) : ue("year", o.year);
  }
  function Mr(o) {
    const {
      hour: n,
      minute: i,
      second: u,
      millisecond: h
    } = o, f = ce(n, 0, 23) || n === 24 && i === 0 && u === 0 && h === 0, m = ce(i, 0, 59), y = ce(u, 0, 59), b = ce(h, 0, 999);
    return f ? m ? y ? b ? !1 : ue("millisecond", h) : ue("second", u) : ue("minute", i) : ue("hour", n);
  }
  function O(o) {
    return typeof o > "u";
  }
  function Ie(o) {
    return typeof o == "number";
  }
  function $t(o) {
    return typeof o == "number" && o % 1 === 0;
  }
  function la(o) {
    return typeof o == "string";
  }
  function ha(o) {
    return Object.prototype.toString.call(o) === "[object Date]";
  }
  function Or() {
    try {
      return typeof Intl < "u" && !!Intl.RelativeTimeFormat;
    } catch {
      return !1;
    }
  }
  function Dr() {
    try {
      return typeof Intl < "u" && !!Intl.Locale && ("weekInfo" in Intl.Locale.prototype || "getWeekInfo" in Intl.Locale.prototype);
    } catch {
      return !1;
    }
  }
  function da(o) {
    return Array.isArray(o) ? o : [o];
  }
  function Ar(o, n, i) {
    if (o.length !== 0)
      return o.reduce((u, h) => {
        const f = [n(h), h];
        return u && i(u[0], f[0]) === u[0] ? u : f;
      }, null)[1];
  }
  function fa(o, n) {
    return n.reduce((i, u) => (i[u] = o[u], i), {});
  }
  function ze(o, n) {
    return Object.prototype.hasOwnProperty.call(o, n);
  }
  function pn(o) {
    if (o == null)
      return null;
    if (typeof o != "object")
      throw new l("Week settings must be an object");
    if (!ce(o.firstDay, 1, 7) || !ce(o.minimalDays, 1, 7) || !Array.isArray(o.weekend) || o.weekend.some((n) => !ce(n, 1, 7)))
      throw new l("Invalid week settings");
    return {
      firstDay: o.firstDay,
      minimalDays: o.minimalDays,
      weekend: Array.from(o.weekend)
    };
  }
  function ce(o, n, i) {
    return $t(o) && o >= n && o <= i;
  }
  function ma(o, n) {
    return o - n * Math.floor(o / n);
  }
  function Q(o, n = 2) {
    const i = o < 0;
    let u;
    return i ? u = "-" + ("" + -o).padStart(n, "0") : u = ("" + o).padStart(n, "0"), u;
  }
  function ke(o) {
    if (!(O(o) || o === null || o === ""))
      return parseInt(o, 10);
  }
  function Re(o) {
    if (!(O(o) || o === null || o === ""))
      return parseFloat(o);
  }
  function gn(o) {
    if (!(O(o) || o === null || o === "")) {
      const n = parseFloat("0." + o) * 1e3;
      return Math.floor(n);
    }
  }
  function yn(o, n, i = !1) {
    const u = 10 ** n;
    return (i ? Math.trunc : Math.round)(o * u) / u;
  }
  function mt(o) {
    return o % 4 === 0 && (o % 100 !== 0 || o % 400 === 0);
  }
  function Ye(o) {
    return mt(o) ? 366 : 365;
  }
  function xt(o, n) {
    const i = ma(n - 1, 12) + 1, u = o + (n - i) / 12;
    return i === 2 ? mt(u) ? 29 : 28 : [31, null, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][i - 1];
  }
  function Lt(o) {
    let n = Date.UTC(o.year, o.month - 1, o.day, o.hour, o.minute, o.second, o.millisecond);
    return o.year < 100 && o.year >= 0 && (n = new Date(n), n.setUTCFullYear(o.year, o.month - 1, o.day)), +n;
  }
  function Nr(o, n, i) {
    return -fn(dn(o, 1, n), i) + n - 1;
  }
  function pt(o, n = 4, i = 1) {
    const u = Nr(o, n, i), h = Nr(o + 1, n, i);
    return (Ye(o) - u + h) / 7;
  }
  function wn(o) {
    return o > 99 ? o : o > H.twoDigitCutoffYear ? 1900 + o : 2e3 + o;
  }
  function Fr(o, n, i, u = null) {
    const h = new Date(o), f = {
      hourCycle: "h23",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit"
    };
    u && (f.timeZone = u);
    const m = {
      timeZoneName: n,
      ...f
    }, y = new Intl.DateTimeFormat(i, m).formatToParts(h).find((b) => b.type.toLowerCase() === "timezonename");
    return y ? y.value : null;
  }
  function Pt(o, n) {
    let i = parseInt(o, 10);
    Number.isNaN(i) && (i = 0);
    const u = parseInt(n, 10) || 0, h = i < 0 || Object.is(i, -0) ? -u : u;
    return i * 60 + h;
  }
  function Rr(o) {
    const n = Number(o);
    if (typeof o == "boolean" || o === "" || Number.isNaN(n)) throw new l(`Invalid unit value ${o}`);
    return n;
  }
  function Vt(o, n) {
    const i = {};
    for (const u in o)
      if (ze(o, u)) {
        const h = o[u];
        if (h == null) continue;
        i[n(u)] = Rr(h);
      }
    return i;
  }
  function gt(o, n) {
    const i = Math.trunc(Math.abs(o / 60)), u = Math.trunc(Math.abs(o % 60)), h = o >= 0 ? "+" : "-";
    switch (n) {
      case "short":
        return `${h}${Q(i, 2)}:${Q(u, 2)}`;
      case "narrow":
        return `${h}${i}${u > 0 ? `:${u}` : ""}`;
      case "techie":
        return `${h}${Q(i, 2)}${Q(u, 2)}`;
      default:
        throw new RangeError(`Value format ${n} is out of range for property format`);
    }
  }
  function Bt(o) {
    return fa(o, ["hour", "minute", "second", "millisecond"]);
  }
  const pa = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"], $r = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"], ga = ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"];
  function xr(o) {
    switch (o) {
      case "narrow":
        return [...ga];
      case "short":
        return [...$r];
      case "long":
        return [...pa];
      case "numeric":
        return ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];
      case "2-digit":
        return ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];
      default:
        return null;
    }
  }
  const Lr = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"], Pr = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"], ya = ["M", "T", "W", "T", "F", "S", "S"];
  function Vr(o) {
    switch (o) {
      case "narrow":
        return [...ya];
      case "short":
        return [...Pr];
      case "long":
        return [...Lr];
      case "numeric":
        return ["1", "2", "3", "4", "5", "6", "7"];
      default:
        return null;
    }
  }
  const Br = ["AM", "PM"], wa = ["Before Christ", "Anno Domini"], ba = ["BC", "AD"], va = ["B", "A"];
  function Ur(o) {
    switch (o) {
      case "narrow":
        return [...va];
      case "short":
        return [...ba];
      case "long":
        return [...wa];
      default:
        return null;
    }
  }
  function Ca(o) {
    return Br[o.hour < 12 ? 0 : 1];
  }
  function Sa(o, n) {
    return Vr(n)[o.weekday - 1];
  }
  function Ta(o, n) {
    return xr(n)[o.month - 1];
  }
  function _a(o, n) {
    return Ur(n)[o.year < 0 ? 0 : 1];
  }
  function Ea(o, n, i = "always", u = !1) {
    const h = {
      years: ["year", "yr."],
      quarters: ["quarter", "qtr."],
      months: ["month", "mo."],
      weeks: ["week", "wk."],
      days: ["day", "day", "days"],
      hours: ["hour", "hr."],
      minutes: ["minute", "min."],
      seconds: ["second", "sec."]
    }, f = ["hours", "minutes", "seconds"].indexOf(o) === -1;
    if (i === "auto" && f) {
      const V = o === "days";
      switch (n) {
        case 1:
          return V ? "tomorrow" : `next ${h[o][0]}`;
        case -1:
          return V ? "yesterday" : `last ${h[o][0]}`;
        case 0:
          return V ? "today" : `this ${h[o][0]}`;
      }
    }
    const m = Object.is(n, -0) || n < 0, y = Math.abs(n), b = y === 1, S = h[o], M = u ? b ? S[1] : S[2] || S[1] : b ? h[o][0] : o;
    return m ? `${y} ${M} ago` : `in ${y} ${M}`;
  }
  function Wr(o, n) {
    let i = "";
    for (const u of o)
      u.literal ? i += u.val : i += n(u.val);
    return i;
  }
  const Ia = {
    D: C,
    DD: _,
    DDD: E,
    DDDD: k,
    t: L,
    tt: x,
    ttt: J,
    tttt: ee,
    T: F,
    TT: T,
    TTT: $,
    TTTT: R,
    f: j,
    ff: P,
    fff: re,
    ffff: _e,
    F: Y,
    FF: q,
    FFF: ve,
    FFFF: ar
  };
  class ne {
    static create(n, i = {}) {
      return new ne(n, i);
    }
    static parseFormat(n) {
      let i = null, u = "", h = !1;
      const f = [];
      for (let m = 0; m < n.length; m++) {
        const y = n.charAt(m);
        y === "'" ? (u.length > 0 && f.push({
          literal: h || /^\s+$/.test(u),
          val: u
        }), i = null, u = "", h = !h) : h || y === i ? u += y : (u.length > 0 && f.push({
          literal: /^\s+$/.test(u),
          val: u
        }), u = y, i = y);
      }
      return u.length > 0 && f.push({
        literal: h || /^\s+$/.test(u),
        val: u
      }), f;
    }
    static macroTokenToFormatOpts(n) {
      return Ia[n];
    }
    constructor(n, i) {
      this.opts = i, this.loc = n, this.systemLoc = null;
    }
    formatWithSystemDefault(n, i) {
      return this.systemLoc === null && (this.systemLoc = this.loc.redefaultToSystem()), this.systemLoc.dtFormatter(n, {
        ...this.opts,
        ...i
      }).format();
    }
    dtFormatter(n, i = {}) {
      return this.loc.dtFormatter(n, {
        ...this.opts,
        ...i
      });
    }
    formatDateTime(n, i) {
      return this.dtFormatter(n, i).format();
    }
    formatDateTimeParts(n, i) {
      return this.dtFormatter(n, i).formatToParts();
    }
    formatInterval(n, i) {
      return this.dtFormatter(n.start, i).dtf.formatRange(n.start.toJSDate(), n.end.toJSDate());
    }
    resolvedOptions(n, i) {
      return this.dtFormatter(n, i).resolvedOptions();
    }
    num(n, i = 0) {
      if (this.opts.forceSimple)
        return Q(n, i);
      const u = {
        ...this.opts
      };
      return i > 0 && (u.padTo = i), this.loc.numberFormatter(u).format(n);
    }
    formatDateTimeFromString(n, i) {
      const u = this.loc.listingMode() === "en", h = this.loc.outputCalendar && this.loc.outputCalendar !== "gregory", f = (A, X) => this.loc.extract(n, A, X), m = (A) => n.isOffsetFixed && n.offset === 0 && A.allowZ ? "Z" : n.isValid ? n.zone.formatOffset(n.ts, A.format) : "", y = () => u ? Ca(n) : f({
        hour: "numeric",
        hourCycle: "h12"
      }, "dayperiod"), b = (A, X) => u ? Ta(n, A) : f(X ? {
        month: A
      } : {
        month: A,
        day: "numeric"
      }, "month"), S = (A, X) => u ? Sa(n, A) : f(X ? {
        weekday: A
      } : {
        weekday: A,
        month: "long",
        day: "numeric"
      }, "weekday"), M = (A) => {
        const X = ne.macroTokenToFormatOpts(A);
        return X ? this.formatWithSystemDefault(n, X) : A;
      }, V = (A) => u ? _a(n, A) : f({
        era: A
      }, "era"), K = (A) => {
        switch (A) {
          // ms
          case "S":
            return this.num(n.millisecond);
          case "u":
          // falls through
          case "SSS":
            return this.num(n.millisecond, 3);
          // seconds
          case "s":
            return this.num(n.second);
          case "ss":
            return this.num(n.second, 2);
          // fractional seconds
          case "uu":
            return this.num(Math.floor(n.millisecond / 10), 2);
          case "uuu":
            return this.num(Math.floor(n.millisecond / 100));
          // minutes
          case "m":
            return this.num(n.minute);
          case "mm":
            return this.num(n.minute, 2);
          // hours
          case "h":
            return this.num(n.hour % 12 === 0 ? 12 : n.hour % 12);
          case "hh":
            return this.num(n.hour % 12 === 0 ? 12 : n.hour % 12, 2);
          case "H":
            return this.num(n.hour);
          case "HH":
            return this.num(n.hour, 2);
          // offset
          case "Z":
            return m({
              format: "narrow",
              allowZ: this.opts.allowZ
            });
          case "ZZ":
            return m({
              format: "short",
              allowZ: this.opts.allowZ
            });
          case "ZZZ":
            return m({
              format: "techie",
              allowZ: this.opts.allowZ
            });
          case "ZZZZ":
            return n.zone.offsetName(n.ts, {
              format: "short",
              locale: this.loc.locale
            });
          case "ZZZZZ":
            return n.zone.offsetName(n.ts, {
              format: "long",
              locale: this.loc.locale
            });
          // zone
          case "z":
            return n.zoneName;
          // meridiems
          case "a":
            return y();
          // dates
          case "d":
            return h ? f({
              day: "numeric"
            }, "day") : this.num(n.day);
          case "dd":
            return h ? f({
              day: "2-digit"
            }, "day") : this.num(n.day, 2);
          // weekdays - standalone
          case "c":
            return this.num(n.weekday);
          case "ccc":
            return S("short", !0);
          case "cccc":
            return S("long", !0);
          case "ccccc":
            return S("narrow", !0);
          // weekdays - format
          case "E":
            return this.num(n.weekday);
          case "EEE":
            return S("short", !1);
          case "EEEE":
            return S("long", !1);
          case "EEEEE":
            return S("narrow", !1);
          // months - standalone
          case "L":
            return h ? f({
              month: "numeric",
              day: "numeric"
            }, "month") : this.num(n.month);
          case "LL":
            return h ? f({
              month: "2-digit",
              day: "numeric"
            }, "month") : this.num(n.month, 2);
          case "LLL":
            return b("short", !0);
          case "LLLL":
            return b("long", !0);
          case "LLLLL":
            return b("narrow", !0);
          // months - format
          case "M":
            return h ? f({
              month: "numeric"
            }, "month") : this.num(n.month);
          case "MM":
            return h ? f({
              month: "2-digit"
            }, "month") : this.num(n.month, 2);
          case "MMM":
            return b("short", !1);
          case "MMMM":
            return b("long", !1);
          case "MMMMM":
            return b("narrow", !1);
          // years
          case "y":
            return h ? f({
              year: "numeric"
            }, "year") : this.num(n.year);
          case "yy":
            return h ? f({
              year: "2-digit"
            }, "year") : this.num(n.year.toString().slice(-2), 2);
          case "yyyy":
            return h ? f({
              year: "numeric"
            }, "year") : this.num(n.year, 4);
          case "yyyyyy":
            return h ? f({
              year: "numeric"
            }, "year") : this.num(n.year, 6);
          // eras
          case "G":
            return V("short");
          case "GG":
            return V("long");
          case "GGGGG":
            return V("narrow");
          case "kk":
            return this.num(n.weekYear.toString().slice(-2), 2);
          case "kkkk":
            return this.num(n.weekYear, 4);
          case "W":
            return this.num(n.weekNumber);
          case "WW":
            return this.num(n.weekNumber, 2);
          case "n":
            return this.num(n.localWeekNumber);
          case "nn":
            return this.num(n.localWeekNumber, 2);
          case "ii":
            return this.num(n.localWeekYear.toString().slice(-2), 2);
          case "iiii":
            return this.num(n.localWeekYear, 4);
          case "o":
            return this.num(n.ordinal);
          case "ooo":
            return this.num(n.ordinal, 3);
          case "q":
            return this.num(n.quarter);
          case "qq":
            return this.num(n.quarter, 2);
          case "X":
            return this.num(Math.floor(n.ts / 1e3));
          case "x":
            return this.num(n.ts);
          default:
            return M(A);
        }
      };
      return Wr(ne.parseFormat(i), K);
    }
    formatDurationFromString(n, i) {
      const u = (b) => {
        switch (b[0]) {
          case "S":
            return "millisecond";
          case "s":
            return "second";
          case "m":
            return "minute";
          case "h":
            return "hour";
          case "d":
            return "day";
          case "w":
            return "week";
          case "M":
            return "month";
          case "y":
            return "year";
          default:
            return null;
        }
      }, h = (b) => (S) => {
        const M = u(S);
        return M ? this.num(b.get(M), S.length) : S;
      }, f = ne.parseFormat(i), m = f.reduce((b, {
        literal: S,
        val: M
      }) => S ? b : b.concat(M), []), y = n.shiftTo(...m.map(u).filter((b) => b));
      return Wr(f, h(y));
    }
  }
  const jr = /[A-Za-z_+-]{1,256}(?::?\/[A-Za-z0-9_+-]{1,256}(?:\/[A-Za-z0-9_+-]{1,256})?)?/;
  function Ze(...o) {
    const n = o.reduce((i, u) => i + u.source, "");
    return RegExp(`^${n}$`);
  }
  function Ke(...o) {
    return (n) => o.reduce(([i, u, h], f) => {
      const [m, y, b] = f(n, h);
      return [{
        ...i,
        ...m
      }, y || u, b];
    }, [{}, null, 1]).slice(0, 2);
  }
  function Qe(o, ...n) {
    if (o == null)
      return [null, null];
    for (const [i, u] of n) {
      const h = i.exec(o);
      if (h)
        return u(h);
    }
    return [null, null];
  }
  function qr(...o) {
    return (n, i) => {
      const u = {};
      let h;
      for (h = 0; h < o.length; h++)
        u[o[h]] = ke(n[i + h]);
      return [u, null, i + h];
    };
  }
  const Gr = /(?:(Z)|([+-]\d\d)(?::?(\d\d))?)/, ka = `(?:${Gr.source}?(?:\\[(${jr.source})\\])?)?`, bn = /(\d\d)(?::?(\d\d)(?::?(\d\d)(?:[.,](\d{1,30}))?)?)?/, Hr = RegExp(`${bn.source}${ka}`), vn = RegExp(`(?:T${Hr.source})?`), Ma = /([+-]\d{6}|\d{4})(?:-?(\d\d)(?:-?(\d\d))?)?/, Oa = /(\d{4})-?W(\d\d)(?:-?(\d))?/, Da = /(\d{4})-?(\d{3})/, Aa = qr("weekYear", "weekNumber", "weekDay"), Na = qr("year", "ordinal"), Fa = /(\d{4})-(\d\d)-(\d\d)/, zr = RegExp(`${bn.source} ?(?:${Gr.source}|(${jr.source}))?`), Ra = RegExp(`(?: ${zr.source})?`);
  function Je(o, n, i) {
    const u = o[n];
    return O(u) ? i : ke(u);
  }
  function $a(o, n) {
    return [{
      year: Je(o, n),
      month: Je(o, n + 1, 1),
      day: Je(o, n + 2, 1)
    }, null, n + 3];
  }
  function Xe(o, n) {
    return [{
      hours: Je(o, n, 0),
      minutes: Je(o, n + 1, 0),
      seconds: Je(o, n + 2, 0),
      milliseconds: gn(o[n + 3])
    }, null, n + 4];
  }
  function yt(o, n) {
    const i = !o[n] && !o[n + 1], u = Pt(o[n + 1], o[n + 2]), h = i ? null : te.instance(u);
    return [{}, h, n + 3];
  }
  function wt(o, n) {
    const i = o[n] ? me.create(o[n]) : null;
    return [{}, i, n + 1];
  }
  const xa = RegExp(`^T?${bn.source}$`), La = /^-?P(?:(?:(-?\d{1,20}(?:\.\d{1,20})?)Y)?(?:(-?\d{1,20}(?:\.\d{1,20})?)M)?(?:(-?\d{1,20}(?:\.\d{1,20})?)W)?(?:(-?\d{1,20}(?:\.\d{1,20})?)D)?(?:T(?:(-?\d{1,20}(?:\.\d{1,20})?)H)?(?:(-?\d{1,20}(?:\.\d{1,20})?)M)?(?:(-?\d{1,20})(?:[.,](-?\d{1,20}))?S)?)?)$/;
  function Pa(o) {
    const [n, i, u, h, f, m, y, b, S] = o, M = n[0] === "-", V = b && b[0] === "-", K = (A, X = !1) => A !== void 0 && (X || A && M) ? -A : A;
    return [{
      years: K(Re(i)),
      months: K(Re(u)),
      weeks: K(Re(h)),
      days: K(Re(f)),
      hours: K(Re(m)),
      minutes: K(Re(y)),
      seconds: K(Re(b), b === "-0"),
      milliseconds: K(gn(S), V)
    }];
  }
  const Va = {
    GMT: 0,
    EDT: -4 * 60,
    EST: -5 * 60,
    CDT: -5 * 60,
    CST: -6 * 60,
    MDT: -6 * 60,
    MST: -7 * 60,
    PDT: -7 * 60,
    PST: -8 * 60
  };
  function Cn(o, n, i, u, h, f, m) {
    const y = {
      year: n.length === 2 ? wn(ke(n)) : ke(n),
      month: $r.indexOf(i) + 1,
      day: ke(u),
      hour: ke(h),
      minute: ke(f)
    };
    return m && (y.second = ke(m)), o && (y.weekday = o.length > 3 ? Lr.indexOf(o) + 1 : Pr.indexOf(o) + 1), y;
  }
  const Ba = /^(?:(Mon|Tue|Wed|Thu|Fri|Sat|Sun),\s)?(\d{1,2})\s(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s(\d{2,4})\s(\d\d):(\d\d)(?::(\d\d))?\s(?:(UT|GMT|[ECMP][SD]T)|([Zz])|(?:([+-]\d\d)(\d\d)))$/;
  function Ua(o) {
    const [, n, i, u, h, f, m, y, b, S, M, V] = o, K = Cn(n, h, u, i, f, m, y);
    let A;
    return b ? A = Va[b] : S ? A = 0 : A = Pt(M, V), [K, new te(A)];
  }
  function Wa(o) {
    return o.replace(/\([^()]*\)|[\n\t]/g, " ").replace(/(\s\s+)/g, " ").trim();
  }
  const ja = /^(Mon|Tue|Wed|Thu|Fri|Sat|Sun), (\d\d) (Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec) (\d{4}) (\d\d):(\d\d):(\d\d) GMT$/, qa = /^(Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday), (\d\d)-(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)-(\d\d) (\d\d):(\d\d):(\d\d) GMT$/, Ga = /^(Mon|Tue|Wed|Thu|Fri|Sat|Sun) (Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec) ( \d|\d\d) (\d\d):(\d\d):(\d\d) (\d{4})$/;
  function Yr(o) {
    const [, n, i, u, h, f, m, y] = o;
    return [Cn(n, h, u, i, f, m, y), te.utcInstance];
  }
  function Ha(o) {
    const [, n, i, u, h, f, m, y] = o;
    return [Cn(n, y, i, u, h, f, m), te.utcInstance];
  }
  const za = Ze(Ma, vn), Ya = Ze(Oa, vn), Za = Ze(Da, vn), Ka = Ze(Hr), Zr = Ke($a, Xe, yt, wt), Qa = Ke(Aa, Xe, yt, wt), Ja = Ke(Na, Xe, yt, wt), Xa = Ke(Xe, yt, wt);
  function eo(o) {
    return Qe(o, [za, Zr], [Ya, Qa], [Za, Ja], [Ka, Xa]);
  }
  function to(o) {
    return Qe(Wa(o), [Ba, Ua]);
  }
  function no(o) {
    return Qe(o, [ja, Yr], [qa, Yr], [Ga, Ha]);
  }
  function ro(o) {
    return Qe(o, [La, Pa]);
  }
  const so = Ke(Xe);
  function io(o) {
    return Qe(o, [xa, so]);
  }
  const ao = Ze(Fa, Ra), oo = Ze(zr), uo = Ke(Xe, yt, wt);
  function co(o) {
    return Qe(o, [ao, Zr], [oo, uo]);
  }
  const Kr = "Invalid Duration", Qr = {
    weeks: {
      days: 7,
      hours: 7 * 24,
      minutes: 7 * 24 * 60,
      seconds: 7 * 24 * 60 * 60,
      milliseconds: 7 * 24 * 60 * 60 * 1e3
    },
    days: {
      hours: 24,
      minutes: 24 * 60,
      seconds: 24 * 60 * 60,
      milliseconds: 24 * 60 * 60 * 1e3
    },
    hours: {
      minutes: 60,
      seconds: 60 * 60,
      milliseconds: 60 * 60 * 1e3
    },
    minutes: {
      seconds: 60,
      milliseconds: 60 * 1e3
    },
    seconds: {
      milliseconds: 1e3
    }
  }, lo = {
    years: {
      quarters: 4,
      months: 12,
      weeks: 52,
      days: 365,
      hours: 365 * 24,
      minutes: 365 * 24 * 60,
      seconds: 365 * 24 * 60 * 60,
      milliseconds: 365 * 24 * 60 * 60 * 1e3
    },
    quarters: {
      months: 3,
      weeks: 13,
      days: 91,
      hours: 91 * 24,
      minutes: 91 * 24 * 60,
      seconds: 91 * 24 * 60 * 60,
      milliseconds: 91 * 24 * 60 * 60 * 1e3
    },
    months: {
      weeks: 4,
      days: 30,
      hours: 30 * 24,
      minutes: 30 * 24 * 60,
      seconds: 30 * 24 * 60 * 60,
      milliseconds: 30 * 24 * 60 * 60 * 1e3
    },
    ...Qr
  }, le = 146097 / 400, et = 146097 / 4800, ho = {
    years: {
      quarters: 4,
      months: 12,
      weeks: le / 7,
      days: le,
      hours: le * 24,
      minutes: le * 24 * 60,
      seconds: le * 24 * 60 * 60,
      milliseconds: le * 24 * 60 * 60 * 1e3
    },
    quarters: {
      months: 3,
      weeks: le / 28,
      days: le / 4,
      hours: le * 24 / 4,
      minutes: le * 24 * 60 / 4,
      seconds: le * 24 * 60 * 60 / 4,
      milliseconds: le * 24 * 60 * 60 * 1e3 / 4
    },
    months: {
      weeks: et / 7,
      days: et,
      hours: et * 24,
      minutes: et * 24 * 60,
      seconds: et * 24 * 60 * 60,
      milliseconds: et * 24 * 60 * 60 * 1e3
    },
    ...Qr
  }, $e = ["years", "quarters", "months", "weeks", "days", "hours", "minutes", "seconds", "milliseconds"], fo = $e.slice(0).reverse();
  function Me(o, n, i = !1) {
    const u = {
      values: i ? n.values : {
        ...o.values,
        ...n.values || {}
      },
      loc: o.loc.clone(n.loc),
      conversionAccuracy: n.conversionAccuracy || o.conversionAccuracy,
      matrix: n.matrix || o.matrix
    };
    return new B(u);
  }
  function Jr(o, n) {
    var i;
    let u = (i = n.milliseconds) != null ? i : 0;
    for (const h of fo.slice(1))
      n[h] && (u += n[h] * o[h].milliseconds);
    return u;
  }
  function Xr(o, n) {
    const i = Jr(o, n) < 0 ? -1 : 1;
    $e.reduceRight((u, h) => {
      if (O(n[h]))
        return u;
      if (u) {
        const f = n[u] * i, m = o[h][u], y = Math.floor(f / m);
        n[h] += y * i, n[u] -= y * m * i;
      }
      return h;
    }, null), $e.reduce((u, h) => {
      if (O(n[h]))
        return u;
      if (u) {
        const f = n[u] % 1;
        n[u] -= f, n[h] += f * o[u][h];
      }
      return h;
    }, null);
  }
  function mo(o) {
    const n = {};
    for (const [i, u] of Object.entries(o))
      u !== 0 && (n[i] = u);
    return n;
  }
  class B {
    /**
     * @private
     */
    constructor(n) {
      const i = n.conversionAccuracy === "longterm" || !1;
      let u = i ? ho : lo;
      n.matrix && (u = n.matrix), this.values = n.values, this.loc = n.loc || W.create(), this.conversionAccuracy = i ? "longterm" : "casual", this.invalid = n.invalid || null, this.matrix = u, this.isLuxonDuration = !0;
    }
    /**
     * Create Duration from a number of milliseconds.
     * @param {number} count of milliseconds
     * @param {Object} opts - options for parsing
     * @param {string} [opts.locale='en-US'] - the locale to use
     * @param {string} opts.numberingSystem - the numbering system to use
     * @param {string} [opts.conversionAccuracy='casual'] - the conversion system to use
     * @return {Duration}
     */
    static fromMillis(n, i) {
      return B.fromObject({
        milliseconds: n
      }, i);
    }
    /**
     * Create a Duration from a JavaScript object with keys like 'years' and 'hours'.
     * If this object is empty then a zero milliseconds duration is returned.
     * @param {Object} obj - the object to create the DateTime from
     * @param {number} obj.years
     * @param {number} obj.quarters
     * @param {number} obj.months
     * @param {number} obj.weeks
     * @param {number} obj.days
     * @param {number} obj.hours
     * @param {number} obj.minutes
     * @param {number} obj.seconds
     * @param {number} obj.milliseconds
     * @param {Object} [opts=[]] - options for creating this Duration
     * @param {string} [opts.locale='en-US'] - the locale to use
     * @param {string} opts.numberingSystem - the numbering system to use
     * @param {string} [opts.conversionAccuracy='casual'] - the preset conversion system to use
     * @param {string} [opts.matrix=Object] - the custom conversion system to use
     * @return {Duration}
     */
    static fromObject(n, i = {}) {
      if (n == null || typeof n != "object")
        throw new l(`Duration.fromObject: argument expected to be an object, got ${n === null ? "null" : typeof n}`);
      return new B({
        values: Vt(n, B.normalizeUnit),
        loc: W.fromObject(i),
        conversionAccuracy: i.conversionAccuracy,
        matrix: i.matrix
      });
    }
    /**
     * Create a Duration from DurationLike.
     *
     * @param {Object | number | Duration} durationLike
     * One of:
     * - object with keys like 'years' and 'hours'.
     * - number representing milliseconds
     * - Duration instance
     * @return {Duration}
     */
    static fromDurationLike(n) {
      if (Ie(n))
        return B.fromMillis(n);
      if (B.isDuration(n))
        return n;
      if (typeof n == "object")
        return B.fromObject(n);
      throw new l(`Unknown duration argument ${n} of type ${typeof n}`);
    }
    /**
     * Create a Duration from an ISO 8601 duration string.
     * @param {string} text - text to parse
     * @param {Object} opts - options for parsing
     * @param {string} [opts.locale='en-US'] - the locale to use
     * @param {string} opts.numberingSystem - the numbering system to use
     * @param {string} [opts.conversionAccuracy='casual'] - the preset conversion system to use
     * @param {string} [opts.matrix=Object] - the preset conversion system to use
     * @see https://en.wikipedia.org/wiki/ISO_8601#Durations
     * @example Duration.fromISO('P3Y6M1W4DT12H30M5S').toObject() //=> { years: 3, months: 6, weeks: 1, days: 4, hours: 12, minutes: 30, seconds: 5 }
     * @example Duration.fromISO('PT23H').toObject() //=> { hours: 23 }
     * @example Duration.fromISO('P5Y3M').toObject() //=> { years: 5, months: 3 }
     * @return {Duration}
     */
    static fromISO(n, i) {
      const [u] = ro(n);
      return u ? B.fromObject(u, i) : B.invalid("unparsable", `the input "${n}" can't be parsed as ISO 8601`);
    }
    /**
     * Create a Duration from an ISO 8601 time string.
     * @param {string} text - text to parse
     * @param {Object} opts - options for parsing
     * @param {string} [opts.locale='en-US'] - the locale to use
     * @param {string} opts.numberingSystem - the numbering system to use
     * @param {string} [opts.conversionAccuracy='casual'] - the preset conversion system to use
     * @param {string} [opts.matrix=Object] - the conversion system to use
     * @see https://en.wikipedia.org/wiki/ISO_8601#Times
     * @example Duration.fromISOTime('11:22:33.444').toObject() //=> { hours: 11, minutes: 22, seconds: 33, milliseconds: 444 }
     * @example Duration.fromISOTime('11:00').toObject() //=> { hours: 11, minutes: 0, seconds: 0 }
     * @example Duration.fromISOTime('T11:00').toObject() //=> { hours: 11, minutes: 0, seconds: 0 }
     * @example Duration.fromISOTime('1100').toObject() //=> { hours: 11, minutes: 0, seconds: 0 }
     * @example Duration.fromISOTime('T1100').toObject() //=> { hours: 11, minutes: 0, seconds: 0 }
     * @return {Duration}
     */
    static fromISOTime(n, i) {
      const [u] = io(n);
      return u ? B.fromObject(u, i) : B.invalid("unparsable", `the input "${n}" can't be parsed as ISO 8601`);
    }
    /**
     * Create an invalid Duration.
     * @param {string} reason - simple string of why this datetime is invalid. Should not contain parameters or anything else data-dependent
     * @param {string} [explanation=null] - longer explanation, may include parameters and other useful debugging information
     * @return {Duration}
     */
    static invalid(n, i = null) {
      if (!n)
        throw new l("need to specify a reason the Duration is invalid");
      const u = n instanceof de ? n : new de(n, i);
      if (H.throwOnInvalid)
        throw new r(u);
      return new B({
        invalid: u
      });
    }
    /**
     * @private
     */
    static normalizeUnit(n) {
      const i = {
        year: "years",
        years: "years",
        quarter: "quarters",
        quarters: "quarters",
        month: "months",
        months: "months",
        week: "weeks",
        weeks: "weeks",
        day: "days",
        days: "days",
        hour: "hours",
        hours: "hours",
        minute: "minutes",
        minutes: "minutes",
        second: "seconds",
        seconds: "seconds",
        millisecond: "milliseconds",
        milliseconds: "milliseconds"
      }[n && n.toLowerCase()];
      if (!i) throw new c(n);
      return i;
    }
    /**
     * Check if an object is a Duration. Works across context boundaries
     * @param {object} o
     * @return {boolean}
     */
    static isDuration(n) {
      return n && n.isLuxonDuration || !1;
    }
    /**
     * Get  the locale of a Duration, such 'en-GB'
     * @type {string}
     */
    get locale() {
      return this.isValid ? this.loc.locale : null;
    }
    /**
     * Get the numbering system of a Duration, such 'beng'. The numbering system is used when formatting the Duration
     *
     * @type {string}
     */
    get numberingSystem() {
      return this.isValid ? this.loc.numberingSystem : null;
    }
    /**
     * Returns a string representation of this Duration formatted according to the specified format string. You may use these tokens:
     * * `S` for milliseconds
     * * `s` for seconds
     * * `m` for minutes
     * * `h` for hours
     * * `d` for days
     * * `w` for weeks
     * * `M` for months
     * * `y` for years
     * Notes:
     * * Add padding by repeating the token, e.g. "yy" pads the years to two digits, "hhhh" pads the hours out to four digits
     * * Tokens can be escaped by wrapping with single quotes.
     * * The duration will be converted to the set of units in the format string using {@link Duration#shiftTo} and the Durations's conversion accuracy setting.
     * @param {string} fmt - the format string
     * @param {Object} opts - options
     * @param {boolean} [opts.floor=true] - floor numerical values
     * @example Duration.fromObject({ years: 1, days: 6, seconds: 2 }).toFormat("y d s") //=> "1 6 2"
     * @example Duration.fromObject({ years: 1, days: 6, seconds: 2 }).toFormat("yy dd sss") //=> "01 06 002"
     * @example Duration.fromObject({ years: 1, days: 6, seconds: 2 }).toFormat("M S") //=> "12 518402000"
     * @return {string}
     */
    toFormat(n, i = {}) {
      const u = {
        ...i,
        floor: i.round !== !1 && i.floor !== !1
      };
      return this.isValid ? ne.create(this.loc, u).formatDurationFromString(this, n) : Kr;
    }
    /**
     * Returns a string representation of a Duration with all units included.
     * To modify its behavior, use `listStyle` and any Intl.NumberFormat option, though `unitDisplay` is especially relevant.
     * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/NumberFormat#options
     * @param {Object} opts - Formatting options. Accepts the same keys as the options parameter of the native `Intl.NumberFormat` constructor, as well as `listStyle`.
     * @param {string} [opts.listStyle='narrow'] - How to format the merged list. Corresponds to the `style` property of the options parameter of the native `Intl.ListFormat` constructor.
     * @example
     * ```js
     * var dur = Duration.fromObject({ days: 1, hours: 5, minutes: 6 })
     * dur.toHuman() //=> '1 day, 5 hours, 6 minutes'
     * dur.toHuman({ listStyle: "long" }) //=> '1 day, 5 hours, and 6 minutes'
     * dur.toHuman({ unitDisplay: "short" }) //=> '1 day, 5 hr, 6 min'
     * ```
     */
    toHuman(n = {}) {
      if (!this.isValid) return Kr;
      const i = $e.map((u) => {
        const h = this.values[u];
        return O(h) ? null : this.loc.numberFormatter({
          style: "unit",
          unitDisplay: "long",
          ...n,
          unit: u.slice(0, -1)
        }).format(h);
      }).filter((u) => u);
      return this.loc.listFormatter({
        type: "conjunction",
        style: n.listStyle || "narrow",
        ...n
      }).format(i);
    }
    /**
     * Returns a JavaScript object with this Duration's values.
     * @example Duration.fromObject({ years: 1, days: 6, seconds: 2 }).toObject() //=> { years: 1, days: 6, seconds: 2 }
     * @return {Object}
     */
    toObject() {
      return this.isValid ? {
        ...this.values
      } : {};
    }
    /**
     * Returns an ISO 8601-compliant string representation of this Duration.
     * @see https://en.wikipedia.org/wiki/ISO_8601#Durations
     * @example Duration.fromObject({ years: 3, seconds: 45 }).toISO() //=> 'P3YT45S'
     * @example Duration.fromObject({ months: 4, seconds: 45 }).toISO() //=> 'P4MT45S'
     * @example Duration.fromObject({ months: 5 }).toISO() //=> 'P5M'
     * @example Duration.fromObject({ minutes: 5 }).toISO() //=> 'PT5M'
     * @example Duration.fromObject({ milliseconds: 6 }).toISO() //=> 'PT0.006S'
     * @return {string}
     */
    toISO() {
      if (!this.isValid) return null;
      let n = "P";
      return this.years !== 0 && (n += this.years + "Y"), (this.months !== 0 || this.quarters !== 0) && (n += this.months + this.quarters * 3 + "M"), this.weeks !== 0 && (n += this.weeks + "W"), this.days !== 0 && (n += this.days + "D"), (this.hours !== 0 || this.minutes !== 0 || this.seconds !== 0 || this.milliseconds !== 0) && (n += "T"), this.hours !== 0 && (n += this.hours + "H"), this.minutes !== 0 && (n += this.minutes + "M"), (this.seconds !== 0 || this.milliseconds !== 0) && (n += yn(this.seconds + this.milliseconds / 1e3, 3) + "S"), n === "P" && (n += "T0S"), n;
    }
    /**
     * Returns an ISO 8601-compliant string representation of this Duration, formatted as a time of day.
     * Note that this will return null if the duration is invalid, negative, or equal to or greater than 24 hours.
     * @see https://en.wikipedia.org/wiki/ISO_8601#Times
     * @param {Object} opts - options
     * @param {boolean} [opts.suppressMilliseconds=false] - exclude milliseconds from the format if they're 0
     * @param {boolean} [opts.suppressSeconds=false] - exclude seconds from the format if they're 0
     * @param {boolean} [opts.includePrefix=false] - include the `T` prefix
     * @param {string} [opts.format='extended'] - choose between the basic and extended format
     * @example Duration.fromObject({ hours: 11 }).toISOTime() //=> '11:00:00.000'
     * @example Duration.fromObject({ hours: 11 }).toISOTime({ suppressMilliseconds: true }) //=> '11:00:00'
     * @example Duration.fromObject({ hours: 11 }).toISOTime({ suppressSeconds: true }) //=> '11:00'
     * @example Duration.fromObject({ hours: 11 }).toISOTime({ includePrefix: true }) //=> 'T11:00:00.000'
     * @example Duration.fromObject({ hours: 11 }).toISOTime({ format: 'basic' }) //=> '110000.000'
     * @return {string}
     */
    toISOTime(n = {}) {
      if (!this.isValid) return null;
      const i = this.toMillis();
      return i < 0 || i >= 864e5 ? null : (n = {
        suppressMilliseconds: !1,
        suppressSeconds: !1,
        includePrefix: !1,
        format: "extended",
        ...n,
        includeOffset: !1
      }, D.fromMillis(i, {
        zone: "UTC"
      }).toISOTime(n));
    }
    /**
     * Returns an ISO 8601 representation of this Duration appropriate for use in JSON.
     * @return {string}
     */
    toJSON() {
      return this.toISO();
    }
    /**
     * Returns an ISO 8601 representation of this Duration appropriate for use in debugging.
     * @return {string}
     */
    toString() {
      return this.toISO();
    }
    /**
     * Returns a string representation of this Duration appropriate for the REPL.
     * @return {string}
     */
    [Symbol.for("nodejs.util.inspect.custom")]() {
      return this.isValid ? `Duration { values: ${JSON.stringify(this.values)} }` : `Duration { Invalid, reason: ${this.invalidReason} }`;
    }
    /**
     * Returns an milliseconds value of this Duration.
     * @return {number}
     */
    toMillis() {
      return this.isValid ? Jr(this.matrix, this.values) : NaN;
    }
    /**
     * Returns an milliseconds value of this Duration. Alias of {@link toMillis}
     * @return {number}
     */
    valueOf() {
      return this.toMillis();
    }
    /**
     * Make this Duration longer by the specified amount. Return a newly-constructed Duration.
     * @param {Duration|Object|number} duration - The amount to add. Either a Luxon Duration, a number of milliseconds, the object argument to Duration.fromObject()
     * @return {Duration}
     */
    plus(n) {
      if (!this.isValid) return this;
      const i = B.fromDurationLike(n), u = {};
      for (const h of $e)
        (ze(i.values, h) || ze(this.values, h)) && (u[h] = i.get(h) + this.get(h));
      return Me(this, {
        values: u
      }, !0);
    }
    /**
     * Make this Duration shorter by the specified amount. Return a newly-constructed Duration.
     * @param {Duration|Object|number} duration - The amount to subtract. Either a Luxon Duration, a number of milliseconds, the object argument to Duration.fromObject()
     * @return {Duration}
     */
    minus(n) {
      if (!this.isValid) return this;
      const i = B.fromDurationLike(n);
      return this.plus(i.negate());
    }
    /**
     * Scale this Duration by the specified amount. Return a newly-constructed Duration.
     * @param {function} fn - The function to apply to each unit. Arity is 1 or 2: the value of the unit and, optionally, the unit name. Must return a number.
     * @example Duration.fromObject({ hours: 1, minutes: 30 }).mapUnits(x => x * 2) //=> { hours: 2, minutes: 60 }
     * @example Duration.fromObject({ hours: 1, minutes: 30 }).mapUnits((x, u) => u === "hours" ? x * 2 : x) //=> { hours: 2, minutes: 30 }
     * @return {Duration}
     */
    mapUnits(n) {
      if (!this.isValid) return this;
      const i = {};
      for (const u of Object.keys(this.values))
        i[u] = Rr(n(this.values[u], u));
      return Me(this, {
        values: i
      }, !0);
    }
    /**
     * Get the value of unit.
     * @param {string} unit - a unit such as 'minute' or 'day'
     * @example Duration.fromObject({years: 2, days: 3}).get('years') //=> 2
     * @example Duration.fromObject({years: 2, days: 3}).get('months') //=> 0
     * @example Duration.fromObject({years: 2, days: 3}).get('days') //=> 3
     * @return {number}
     */
    get(n) {
      return this[B.normalizeUnit(n)];
    }
    /**
     * "Set" the values of specified units. Return a newly-constructed Duration.
     * @param {Object} values - a mapping of units to numbers
     * @example dur.set({ years: 2017 })
     * @example dur.set({ hours: 8, minutes: 30 })
     * @return {Duration}
     */
    set(n) {
      if (!this.isValid) return this;
      const i = {
        ...this.values,
        ...Vt(n, B.normalizeUnit)
      };
      return Me(this, {
        values: i
      });
    }
    /**
     * "Set" the locale and/or numberingSystem.  Returns a newly-constructed Duration.
     * @example dur.reconfigure({ locale: 'en-GB' })
     * @return {Duration}
     */
    reconfigure({
      locale: n,
      numberingSystem: i,
      conversionAccuracy: u,
      matrix: h
    } = {}) {
      const m = {
        loc: this.loc.clone({
          locale: n,
          numberingSystem: i
        }),
        matrix: h,
        conversionAccuracy: u
      };
      return Me(this, m);
    }
    /**
     * Return the length of the duration in the specified unit.
     * @param {string} unit - a unit such as 'minutes' or 'days'
     * @example Duration.fromObject({years: 1}).as('days') //=> 365
     * @example Duration.fromObject({years: 1}).as('months') //=> 12
     * @example Duration.fromObject({hours: 60}).as('days') //=> 2.5
     * @return {number}
     */
    as(n) {
      return this.isValid ? this.shiftTo(n).get(n) : NaN;
    }
    /**
     * Reduce this Duration to its canonical representation in its current units.
     * Assuming the overall value of the Duration is positive, this means:
     * - excessive values for lower-order units are converted to higher-order units (if possible, see first and second example)
     * - negative lower-order units are converted to higher order units (there must be such a higher order unit, otherwise
     *   the overall value would be negative, see third example)
     * - fractional values for higher-order units are converted to lower-order units (if possible, see fourth example)
     *
     * If the overall value is negative, the result of this method is equivalent to `this.negate().normalize().negate()`.
     * @example Duration.fromObject({ years: 2, days: 5000 }).normalize().toObject() //=> { years: 15, days: 255 }
     * @example Duration.fromObject({ days: 5000 }).normalize().toObject() //=> { days: 5000 }
     * @example Duration.fromObject({ hours: 12, minutes: -45 }).normalize().toObject() //=> { hours: 11, minutes: 15 }
     * @example Duration.fromObject({ years: 2.5, days: 0, hours: 0 }).normalize().toObject() //=> { years: 2, days: 182, hours: 12 }
     * @return {Duration}
     */
    normalize() {
      if (!this.isValid) return this;
      const n = this.toObject();
      return Xr(this.matrix, n), Me(this, {
        values: n
      }, !0);
    }
    /**
     * Rescale units to its largest representation
     * @example Duration.fromObject({ milliseconds: 90000 }).rescale().toObject() //=> { minutes: 1, seconds: 30 }
     * @return {Duration}
     */
    rescale() {
      if (!this.isValid) return this;
      const n = mo(this.normalize().shiftToAll().toObject());
      return Me(this, {
        values: n
      }, !0);
    }
    /**
     * Convert this Duration into its representation in a different set of units.
     * @example Duration.fromObject({ hours: 1, seconds: 30 }).shiftTo('minutes', 'milliseconds').toObject() //=> { minutes: 60, milliseconds: 30000 }
     * @return {Duration}
     */
    shiftTo(...n) {
      if (!this.isValid) return this;
      if (n.length === 0)
        return this;
      n = n.map((m) => B.normalizeUnit(m));
      const i = {}, u = {}, h = this.toObject();
      let f;
      for (const m of $e)
        if (n.indexOf(m) >= 0) {
          f = m;
          let y = 0;
          for (const S in u)
            y += this.matrix[S][m] * u[S], u[S] = 0;
          Ie(h[m]) && (y += h[m]);
          const b = Math.trunc(y);
          i[m] = b, u[m] = (y * 1e3 - b * 1e3) / 1e3;
        } else Ie(h[m]) && (u[m] = h[m]);
      for (const m in u)
        u[m] !== 0 && (i[f] += m === f ? u[m] : u[m] / this.matrix[f][m]);
      return Xr(this.matrix, i), Me(this, {
        values: i
      }, !0);
    }
    /**
     * Shift this Duration to all available units.
     * Same as shiftTo("years", "months", "weeks", "days", "hours", "minutes", "seconds", "milliseconds")
     * @return {Duration}
     */
    shiftToAll() {
      return this.isValid ? this.shiftTo("years", "months", "weeks", "days", "hours", "minutes", "seconds", "milliseconds") : this;
    }
    /**
     * Return the negative of this Duration.
     * @example Duration.fromObject({ hours: 1, seconds: 30 }).negate().toObject() //=> { hours: -1, seconds: -30 }
     * @return {Duration}
     */
    negate() {
      if (!this.isValid) return this;
      const n = {};
      for (const i of Object.keys(this.values))
        n[i] = this.values[i] === 0 ? 0 : -this.values[i];
      return Me(this, {
        values: n
      }, !0);
    }
    /**
     * Get the years.
     * @type {number}
     */
    get years() {
      return this.isValid ? this.values.years || 0 : NaN;
    }
    /**
     * Get the quarters.
     * @type {number}
     */
    get quarters() {
      return this.isValid ? this.values.quarters || 0 : NaN;
    }
    /**
     * Get the months.
     * @type {number}
     */
    get months() {
      return this.isValid ? this.values.months || 0 : NaN;
    }
    /**
     * Get the weeks
     * @type {number}
     */
    get weeks() {
      return this.isValid ? this.values.weeks || 0 : NaN;
    }
    /**
     * Get the days.
     * @type {number}
     */
    get days() {
      return this.isValid ? this.values.days || 0 : NaN;
    }
    /**
     * Get the hours.
     * @type {number}
     */
    get hours() {
      return this.isValid ? this.values.hours || 0 : NaN;
    }
    /**
     * Get the minutes.
     * @type {number}
     */
    get minutes() {
      return this.isValid ? this.values.minutes || 0 : NaN;
    }
    /**
     * Get the seconds.
     * @return {number}
     */
    get seconds() {
      return this.isValid ? this.values.seconds || 0 : NaN;
    }
    /**
     * Get the milliseconds.
     * @return {number}
     */
    get milliseconds() {
      return this.isValid ? this.values.milliseconds || 0 : NaN;
    }
    /**
     * Returns whether the Duration is invalid. Invalid durations are returned by diff operations
     * on invalid DateTimes or Intervals.
     * @return {boolean}
     */
    get isValid() {
      return this.invalid === null;
    }
    /**
     * Returns an error code if this Duration became invalid, or null if the Duration is valid
     * @return {string}
     */
    get invalidReason() {
      return this.invalid ? this.invalid.reason : null;
    }
    /**
     * Returns an explanation of why this Duration became invalid, or null if the Duration is valid
     * @type {string}
     */
    get invalidExplanation() {
      return this.invalid ? this.invalid.explanation : null;
    }
    /**
     * Equality check
     * Two Durations are equal iff they have the same units and the same values for each unit.
     * @param {Duration} other
     * @return {boolean}
     */
    equals(n) {
      if (!this.isValid || !n.isValid || !this.loc.equals(n.loc))
        return !1;
      function i(u, h) {
        return u === void 0 || u === 0 ? h === void 0 || h === 0 : u === h;
      }
      for (const u of $e)
        if (!i(this.values[u], n.values[u]))
          return !1;
      return !0;
    }
  }
  const tt = "Invalid Interval";
  function po(o, n) {
    return !o || !o.isValid ? z.invalid("missing or invalid start") : !n || !n.isValid ? z.invalid("missing or invalid end") : n < o ? z.invalid("end before start", `The end of an interval must be after its start, but you had start=${o.toISO()} and end=${n.toISO()}`) : null;
  }
  class z {
    /**
     * @private
     */
    constructor(n) {
      this.s = n.start, this.e = n.end, this.invalid = n.invalid || null, this.isLuxonInterval = !0;
    }
    /**
     * Create an invalid Interval.
     * @param {string} reason - simple string of why this Interval is invalid. Should not contain parameters or anything else data-dependent
     * @param {string} [explanation=null] - longer explanation, may include parameters and other useful debugging information
     * @return {Interval}
     */
    static invalid(n, i = null) {
      if (!n)
        throw new l("need to specify a reason the Interval is invalid");
      const u = n instanceof de ? n : new de(n, i);
      if (H.throwOnInvalid)
        throw new t(u);
      return new z({
        invalid: u
      });
    }
    /**
     * Create an Interval from a start DateTime and an end DateTime. Inclusive of the start but not the end.
     * @param {DateTime|Date|Object} start
     * @param {DateTime|Date|Object} end
     * @return {Interval}
     */
    static fromDateTimes(n, i) {
      const u = St(n), h = St(i), f = po(u, h);
      return f ?? new z({
        start: u,
        end: h
      });
    }
    /**
     * Create an Interval from a start DateTime and a Duration to extend to.
     * @param {DateTime|Date|Object} start
     * @param {Duration|Object|number} duration - the length of the Interval.
     * @return {Interval}
     */
    static after(n, i) {
      const u = B.fromDurationLike(i), h = St(n);
      return z.fromDateTimes(h, h.plus(u));
    }
    /**
     * Create an Interval from an end DateTime and a Duration to extend backwards to.
     * @param {DateTime|Date|Object} end
     * @param {Duration|Object|number} duration - the length of the Interval.
     * @return {Interval}
     */
    static before(n, i) {
      const u = B.fromDurationLike(i), h = St(n);
      return z.fromDateTimes(h.minus(u), h);
    }
    /**
     * Create an Interval from an ISO 8601 string.
     * Accepts `<start>/<end>`, `<start>/<duration>`, and `<duration>/<end>` formats.
     * @param {string} text - the ISO string to parse
     * @param {Object} [opts] - options to pass {@link DateTime#fromISO} and optionally {@link Duration#fromISO}
     * @see https://en.wikipedia.org/wiki/ISO_8601#Time_intervals
     * @return {Interval}
     */
    static fromISO(n, i) {
      const [u, h] = (n || "").split("/", 2);
      if (u && h) {
        let f, m;
        try {
          f = D.fromISO(u, i), m = f.isValid;
        } catch {
          m = !1;
        }
        let y, b;
        try {
          y = D.fromISO(h, i), b = y.isValid;
        } catch {
          b = !1;
        }
        if (m && b)
          return z.fromDateTimes(f, y);
        if (m) {
          const S = B.fromISO(h, i);
          if (S.isValid)
            return z.after(f, S);
        } else if (b) {
          const S = B.fromISO(u, i);
          if (S.isValid)
            return z.before(y, S);
        }
      }
      return z.invalid("unparsable", `the input "${n}" can't be parsed as ISO 8601`);
    }
    /**
     * Check if an object is an Interval. Works across context boundaries
     * @param {object} o
     * @return {boolean}
     */
    static isInterval(n) {
      return n && n.isLuxonInterval || !1;
    }
    /**
     * Returns the start of the Interval
     * @type {DateTime}
     */
    get start() {
      return this.isValid ? this.s : null;
    }
    /**
     * Returns the end of the Interval
     * @type {DateTime}
     */
    get end() {
      return this.isValid ? this.e : null;
    }
    /**
     * Returns the last DateTime included in the interval (since end is not part of the interval)
     * @type {DateTime}
     */
    get lastDateTime() {
      return this.isValid && this.e ? this.e.minus(1) : null;
    }
    /**
     * Returns whether this Interval's end is at least its start, meaning that the Interval isn't 'backwards'.
     * @type {boolean}
     */
    get isValid() {
      return this.invalidReason === null;
    }
    /**
     * Returns an error code if this Interval is invalid, or null if the Interval is valid
     * @type {string}
     */
    get invalidReason() {
      return this.invalid ? this.invalid.reason : null;
    }
    /**
     * Returns an explanation of why this Interval became invalid, or null if the Interval is valid
     * @type {string}
     */
    get invalidExplanation() {
      return this.invalid ? this.invalid.explanation : null;
    }
    /**
     * Returns the length of the Interval in the specified unit.
     * @param {string} unit - the unit (such as 'hours' or 'days') to return the length in.
     * @return {number}
     */
    length(n = "milliseconds") {
      return this.isValid ? this.toDuration(n).get(n) : NaN;
    }
    /**
     * Returns the count of minutes, hours, days, months, or years included in the Interval, even in part.
     * Unlike {@link Interval#length} this counts sections of the calendar, not periods of time, e.g. specifying 'day'
     * asks 'what dates are included in this interval?', not 'how many days long is this interval?'
     * @param {string} [unit='milliseconds'] - the unit of time to count.
     * @param {Object} opts - options
     * @param {boolean} [opts.useLocaleWeeks=false] - If true, use weeks based on the locale, i.e. use the locale-dependent start of the week; this operation will always use the locale of the start DateTime
     * @return {number}
     */
    count(n = "milliseconds", i) {
      if (!this.isValid) return NaN;
      const u = this.start.startOf(n, i);
      let h;
      return i != null && i.useLocaleWeeks ? h = this.end.reconfigure({
        locale: u.locale
      }) : h = this.end, h = h.startOf(n, i), Math.floor(h.diff(u, n).get(n)) + (h.valueOf() !== this.end.valueOf());
    }
    /**
     * Returns whether this Interval's start and end are both in the same unit of time
     * @param {string} unit - the unit of time to check sameness on
     * @return {boolean}
     */
    hasSame(n) {
      return this.isValid ? this.isEmpty() || this.e.minus(1).hasSame(this.s, n) : !1;
    }
    /**
     * Return whether this Interval has the same start and end DateTimes.
     * @return {boolean}
     */
    isEmpty() {
      return this.s.valueOf() === this.e.valueOf();
    }
    /**
     * Return whether this Interval's start is after the specified DateTime.
     * @param {DateTime} dateTime
     * @return {boolean}
     */
    isAfter(n) {
      return this.isValid ? this.s > n : !1;
    }
    /**
     * Return whether this Interval's end is before the specified DateTime.
     * @param {DateTime} dateTime
     * @return {boolean}
     */
    isBefore(n) {
      return this.isValid ? this.e <= n : !1;
    }
    /**
     * Return whether this Interval contains the specified DateTime.
     * @param {DateTime} dateTime
     * @return {boolean}
     */
    contains(n) {
      return this.isValid ? this.s <= n && this.e > n : !1;
    }
    /**
     * "Sets" the start and/or end dates. Returns a newly-constructed Interval.
     * @param {Object} values - the values to set
     * @param {DateTime} values.start - the starting DateTime
     * @param {DateTime} values.end - the ending DateTime
     * @return {Interval}
     */
    set({
      start: n,
      end: i
    } = {}) {
      return this.isValid ? z.fromDateTimes(n || this.s, i || this.e) : this;
    }
    /**
     * Split this Interval at each of the specified DateTimes
     * @param {...DateTime} dateTimes - the unit of time to count.
     * @return {Array}
     */
    splitAt(...n) {
      if (!this.isValid) return [];
      const i = n.map(St).filter((m) => this.contains(m)).sort((m, y) => m.toMillis() - y.toMillis()), u = [];
      let {
        s: h
      } = this, f = 0;
      for (; h < this.e; ) {
        const m = i[f] || this.e, y = +m > +this.e ? this.e : m;
        u.push(z.fromDateTimes(h, y)), h = y, f += 1;
      }
      return u;
    }
    /**
     * Split this Interval into smaller Intervals, each of the specified length.
     * Left over time is grouped into a smaller interval
     * @param {Duration|Object|number} duration - The length of each resulting interval.
     * @return {Array}
     */
    splitBy(n) {
      const i = B.fromDurationLike(n);
      if (!this.isValid || !i.isValid || i.as("milliseconds") === 0)
        return [];
      let {
        s: u
      } = this, h = 1, f;
      const m = [];
      for (; u < this.e; ) {
        const y = this.start.plus(i.mapUnits((b) => b * h));
        f = +y > +this.e ? this.e : y, m.push(z.fromDateTimes(u, f)), u = f, h += 1;
      }
      return m;
    }
    /**
     * Split this Interval into the specified number of smaller intervals.
     * @param {number} numberOfParts - The number of Intervals to divide the Interval into.
     * @return {Array}
     */
    divideEqually(n) {
      return this.isValid ? this.splitBy(this.length() / n).slice(0, n) : [];
    }
    /**
     * Return whether this Interval overlaps with the specified Interval
     * @param {Interval} other
     * @return {boolean}
     */
    overlaps(n) {
      return this.e > n.s && this.s < n.e;
    }
    /**
     * Return whether this Interval's end is adjacent to the specified Interval's start.
     * @param {Interval} other
     * @return {boolean}
     */
    abutsStart(n) {
      return this.isValid ? +this.e == +n.s : !1;
    }
    /**
     * Return whether this Interval's start is adjacent to the specified Interval's end.
     * @param {Interval} other
     * @return {boolean}
     */
    abutsEnd(n) {
      return this.isValid ? +n.e == +this.s : !1;
    }
    /**
     * Returns true if this Interval fully contains the specified Interval, specifically if the intersect (of this Interval and the other Interval) is equal to the other Interval; false otherwise.
     * @param {Interval} other
     * @return {boolean}
     */
    engulfs(n) {
      return this.isValid ? this.s <= n.s && this.e >= n.e : !1;
    }
    /**
     * Return whether this Interval has the same start and end as the specified Interval.
     * @param {Interval} other
     * @return {boolean}
     */
    equals(n) {
      return !this.isValid || !n.isValid ? !1 : this.s.equals(n.s) && this.e.equals(n.e);
    }
    /**
     * Return an Interval representing the intersection of this Interval and the specified Interval.
     * Specifically, the resulting Interval has the maximum start time and the minimum end time of the two Intervals.
     * Returns null if the intersection is empty, meaning, the intervals don't intersect.
     * @param {Interval} other
     * @return {Interval}
     */
    intersection(n) {
      if (!this.isValid) return this;
      const i = this.s > n.s ? this.s : n.s, u = this.e < n.e ? this.e : n.e;
      return i >= u ? null : z.fromDateTimes(i, u);
    }
    /**
     * Return an Interval representing the union of this Interval and the specified Interval.
     * Specifically, the resulting Interval has the minimum start time and the maximum end time of the two Intervals.
     * @param {Interval} other
     * @return {Interval}
     */
    union(n) {
      if (!this.isValid) return this;
      const i = this.s < n.s ? this.s : n.s, u = this.e > n.e ? this.e : n.e;
      return z.fromDateTimes(i, u);
    }
    /**
     * Merge an array of Intervals into an equivalent minimal set of Intervals.
     * Combines overlapping and adjacent Intervals.
     * The resulting array will contain the Intervals in ascending order, that is, starting with the earliest Interval
     * and ending with the latest.
     *
     * @param {Array} intervals
     * @return {Array}
     */
    static merge(n) {
      const [i, u] = n.sort((h, f) => h.s - f.s).reduce(([h, f], m) => f ? f.overlaps(m) || f.abutsStart(m) ? [h, f.union(m)] : [h.concat([f]), m] : [h, m], [[], null]);
      return u && i.push(u), i;
    }
    /**
     * Return an array of Intervals representing the spans of time that only appear in one of the specified Intervals.
     * @param {Array} intervals
     * @return {Array}
     */
    static xor(n) {
      let i = null, u = 0;
      const h = [], f = n.map((b) => [{
        time: b.s,
        type: "s"
      }, {
        time: b.e,
        type: "e"
      }]), m = Array.prototype.concat(...f), y = m.sort((b, S) => b.time - S.time);
      for (const b of y)
        u += b.type === "s" ? 1 : -1, u === 1 ? i = b.time : (i && +i != +b.time && h.push(z.fromDateTimes(i, b.time)), i = null);
      return z.merge(h);
    }
    /**
     * Return an Interval representing the span of time in this Interval that doesn't overlap with any of the specified Intervals.
     * @param {...Interval} intervals
     * @return {Array}
     */
    difference(...n) {
      return z.xor([this].concat(n)).map((i) => this.intersection(i)).filter((i) => i && !i.isEmpty());
    }
    /**
     * Returns a string representation of this Interval appropriate for debugging.
     * @return {string}
     */
    toString() {
      return this.isValid ? `[${this.s.toISO()} – ${this.e.toISO()})` : tt;
    }
    /**
     * Returns a string representation of this Interval appropriate for the REPL.
     * @return {string}
     */
    [Symbol.for("nodejs.util.inspect.custom")]() {
      return this.isValid ? `Interval { start: ${this.s.toISO()}, end: ${this.e.toISO()} }` : `Interval { Invalid, reason: ${this.invalidReason} }`;
    }
    /**
     * Returns a localized string representing this Interval. Accepts the same options as the
     * Intl.DateTimeFormat constructor and any presets defined by Luxon, such as
     * {@link DateTime.DATE_FULL} or {@link DateTime.TIME_SIMPLE}. The exact behavior of this method
     * is browser-specific, but in general it will return an appropriate representation of the
     * Interval in the assigned locale. Defaults to the system's locale if no locale has been
     * specified.
     * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DateTimeFormat
     * @param {Object} [formatOpts=DateTime.DATE_SHORT] - Either a DateTime preset or
     * Intl.DateTimeFormat constructor options.
     * @param {Object} opts - Options to override the configuration of the start DateTime.
     * @example Interval.fromISO('2022-11-07T09:00Z/2022-11-08T09:00Z').toLocaleString(); //=> 11/7/2022 – 11/8/2022
     * @example Interval.fromISO('2022-11-07T09:00Z/2022-11-08T09:00Z').toLocaleString(DateTime.DATE_FULL); //=> November 7 – 8, 2022
     * @example Interval.fromISO('2022-11-07T09:00Z/2022-11-08T09:00Z').toLocaleString(DateTime.DATE_FULL, { locale: 'fr-FR' }); //=> 7–8 novembre 2022
     * @example Interval.fromISO('2022-11-07T17:00Z/2022-11-07T19:00Z').toLocaleString(DateTime.TIME_SIMPLE); //=> 6:00 – 8:00 PM
     * @example Interval.fromISO('2022-11-07T17:00Z/2022-11-07T19:00Z').toLocaleString({ weekday: 'short', month: 'short', day: '2-digit', hour: '2-digit', minute: '2-digit' }); //=> Mon, Nov 07, 6:00 – 8:00 p
     * @return {string}
     */
    toLocaleString(n = C, i = {}) {
      return this.isValid ? ne.create(this.s.loc.clone(i), n).formatInterval(this) : tt;
    }
    /**
     * Returns an ISO 8601-compliant string representation of this Interval.
     * @see https://en.wikipedia.org/wiki/ISO_8601#Time_intervals
     * @param {Object} opts - The same options as {@link DateTime#toISO}
     * @return {string}
     */
    toISO(n) {
      return this.isValid ? `${this.s.toISO(n)}/${this.e.toISO(n)}` : tt;
    }
    /**
     * Returns an ISO 8601-compliant string representation of date of this Interval.
     * The time components are ignored.
     * @see https://en.wikipedia.org/wiki/ISO_8601#Time_intervals
     * @return {string}
     */
    toISODate() {
      return this.isValid ? `${this.s.toISODate()}/${this.e.toISODate()}` : tt;
    }
    /**
     * Returns an ISO 8601-compliant string representation of time of this Interval.
     * The date components are ignored.
     * @see https://en.wikipedia.org/wiki/ISO_8601#Time_intervals
     * @param {Object} opts - The same options as {@link DateTime#toISO}
     * @return {string}
     */
    toISOTime(n) {
      return this.isValid ? `${this.s.toISOTime(n)}/${this.e.toISOTime(n)}` : tt;
    }
    /**
     * Returns a string representation of this Interval formatted according to the specified format
     * string. **You may not want this.** See {@link Interval#toLocaleString} for a more flexible
     * formatting tool.
     * @param {string} dateFormat - The format string. This string formats the start and end time.
     * See {@link DateTime#toFormat} for details.
     * @param {Object} opts - Options.
     * @param {string} [opts.separator =  ' – '] - A separator to place between the start and end
     * representations.
     * @return {string}
     */
    toFormat(n, {
      separator: i = " – "
    } = {}) {
      return this.isValid ? `${this.s.toFormat(n)}${i}${this.e.toFormat(n)}` : tt;
    }
    /**
     * Return a Duration representing the time spanned by this interval.
     * @param {string|string[]} [unit=['milliseconds']] - the unit or units (such as 'hours' or 'days') to include in the duration.
     * @param {Object} opts - options that affect the creation of the Duration
     * @param {string} [opts.conversionAccuracy='casual'] - the conversion system to use
     * @example Interval.fromDateTimes(dt1, dt2).toDuration().toObject() //=> { milliseconds: 88489257 }
     * @example Interval.fromDateTimes(dt1, dt2).toDuration('days').toObject() //=> { days: 1.0241812152777778 }
     * @example Interval.fromDateTimes(dt1, dt2).toDuration(['hours', 'minutes']).toObject() //=> { hours: 24, minutes: 34.82095 }
     * @example Interval.fromDateTimes(dt1, dt2).toDuration(['hours', 'minutes', 'seconds']).toObject() //=> { hours: 24, minutes: 34, seconds: 49.257 }
     * @example Interval.fromDateTimes(dt1, dt2).toDuration('seconds').toObject() //=> { seconds: 88489.257 }
     * @return {Duration}
     */
    toDuration(n, i) {
      return this.isValid ? this.e.diff(this.s, n, i) : B.invalid(this.invalidReason);
    }
    /**
     * Run mapFn on the interval start and end, returning a new Interval from the resulting DateTimes
     * @param {function} mapFn
     * @return {Interval}
     * @example Interval.fromDateTimes(dt1, dt2).mapEndpoints(endpoint => endpoint.toUTC())
     * @example Interval.fromDateTimes(dt1, dt2).mapEndpoints(endpoint => endpoint.plus({ hours: 2 }))
     */
    mapEndpoints(n) {
      return z.fromDateTimes(n(this.s), n(this.e));
    }
  }
  class bt {
    /**
     * Return whether the specified zone contains a DST.
     * @param {string|Zone} [zone='local'] - Zone to check. Defaults to the environment's local zone.
     * @return {boolean}
     */
    static hasDST(n = H.defaultZone) {
      const i = D.now().setZone(n).set({
        month: 12
      });
      return !n.isUniversal && i.offset !== i.set({
        month: 6
      }).offset;
    }
    /**
     * Return whether the specified zone is a valid IANA specifier.
     * @param {string} zone - Zone to check
     * @return {boolean}
     */
    static isValidIANAZone(n) {
      return me.isValidZone(n);
    }
    /**
     * Converts the input into a {@link Zone} instance.
     *
     * * If `input` is already a Zone instance, it is returned unchanged.
     * * If `input` is a string containing a valid time zone name, a Zone instance
     *   with that name is returned.
     * * If `input` is a string that doesn't refer to a known time zone, a Zone
     *   instance with {@link Zone#isValid} == false is returned.
     * * If `input is a number, a Zone instance with the specified fixed offset
     *   in minutes is returned.
     * * If `input` is `null` or `undefined`, the default zone is returned.
     * @param {string|Zone|number} [input] - the value to be converted
     * @return {Zone}
     */
    static normalizeZone(n) {
      return Ee(n, H.defaultZone);
    }
    /**
     * Get the weekday on which the week starts according to the given locale.
     * @param {Object} opts - options
     * @param {string} [opts.locale] - the locale code
     * @param {string} [opts.locObj=null] - an existing locale object to use
     * @returns {number} the start of the week, 1 for Monday through 7 for Sunday
     */
    static getStartOfWeek({
      locale: n = null,
      locObj: i = null
    } = {}) {
      return (i || W.create(n)).getStartOfWeek();
    }
    /**
     * Get the minimum number of days necessary in a week before it is considered part of the next year according
     * to the given locale.
     * @param {Object} opts - options
     * @param {string} [opts.locale] - the locale code
     * @param {string} [opts.locObj=null] - an existing locale object to use
     * @returns {number}
     */
    static getMinimumDaysInFirstWeek({
      locale: n = null,
      locObj: i = null
    } = {}) {
      return (i || W.create(n)).getMinDaysInFirstWeek();
    }
    /**
     * Get the weekdays, which are considered the weekend according to the given locale
     * @param {Object} opts - options
     * @param {string} [opts.locale] - the locale code
     * @param {string} [opts.locObj=null] - an existing locale object to use
     * @returns {number[]} an array of weekdays, 1 for Monday through 7 for Sunday
     */
    static getWeekendWeekdays({
      locale: n = null,
      locObj: i = null
    } = {}) {
      return (i || W.create(n)).getWeekendDays().slice();
    }
    /**
     * Return an array of standalone month names.
     * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DateTimeFormat
     * @param {string} [length='long'] - the length of the month representation, such as "numeric", "2-digit", "narrow", "short", "long"
     * @param {Object} opts - options
     * @param {string} [opts.locale] - the locale code
     * @param {string} [opts.numberingSystem=null] - the numbering system
     * @param {string} [opts.locObj=null] - an existing locale object to use
     * @param {string} [opts.outputCalendar='gregory'] - the calendar
     * @example Info.months()[0] //=> 'January'
     * @example Info.months('short')[0] //=> 'Jan'
     * @example Info.months('numeric')[0] //=> '1'
     * @example Info.months('short', { locale: 'fr-CA' } )[0] //=> 'janv.'
     * @example Info.months('numeric', { locale: 'ar' })[0] //=> '١'
     * @example Info.months('long', { outputCalendar: 'islamic' })[0] //=> 'Rabiʻ I'
     * @return {Array}
     */
    static months(n = "long", {
      locale: i = null,
      numberingSystem: u = null,
      locObj: h = null,
      outputCalendar: f = "gregory"
    } = {}) {
      return (h || W.create(i, u, f)).months(n);
    }
    /**
     * Return an array of format month names.
     * Format months differ from standalone months in that they're meant to appear next to the day of the month. In some languages, that
     * changes the string.
     * See {@link Info#months}
     * @param {string} [length='long'] - the length of the month representation, such as "numeric", "2-digit", "narrow", "short", "long"
     * @param {Object} opts - options
     * @param {string} [opts.locale] - the locale code
     * @param {string} [opts.numberingSystem=null] - the numbering system
     * @param {string} [opts.locObj=null] - an existing locale object to use
     * @param {string} [opts.outputCalendar='gregory'] - the calendar
     * @return {Array}
     */
    static monthsFormat(n = "long", {
      locale: i = null,
      numberingSystem: u = null,
      locObj: h = null,
      outputCalendar: f = "gregory"
    } = {}) {
      return (h || W.create(i, u, f)).months(n, !0);
    }
    /**
     * Return an array of standalone week names.
     * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DateTimeFormat
     * @param {string} [length='long'] - the length of the weekday representation, such as "narrow", "short", "long".
     * @param {Object} opts - options
     * @param {string} [opts.locale] - the locale code
     * @param {string} [opts.numberingSystem=null] - the numbering system
     * @param {string} [opts.locObj=null] - an existing locale object to use
     * @example Info.weekdays()[0] //=> 'Monday'
     * @example Info.weekdays('short')[0] //=> 'Mon'
     * @example Info.weekdays('short', { locale: 'fr-CA' })[0] //=> 'lun.'
     * @example Info.weekdays('short', { locale: 'ar' })[0] //=> 'الاثنين'
     * @return {Array}
     */
    static weekdays(n = "long", {
      locale: i = null,
      numberingSystem: u = null,
      locObj: h = null
    } = {}) {
      return (h || W.create(i, u, null)).weekdays(n);
    }
    /**
     * Return an array of format week names.
     * Format weekdays differ from standalone weekdays in that they're meant to appear next to more date information. In some languages, that
     * changes the string.
     * See {@link Info#weekdays}
     * @param {string} [length='long'] - the length of the month representation, such as "narrow", "short", "long".
     * @param {Object} opts - options
     * @param {string} [opts.locale=null] - the locale code
     * @param {string} [opts.numberingSystem=null] - the numbering system
     * @param {string} [opts.locObj=null] - an existing locale object to use
     * @return {Array}
     */
    static weekdaysFormat(n = "long", {
      locale: i = null,
      numberingSystem: u = null,
      locObj: h = null
    } = {}) {
      return (h || W.create(i, u, null)).weekdays(n, !0);
    }
    /**
     * Return an array of meridiems.
     * @param {Object} opts - options
     * @param {string} [opts.locale] - the locale code
     * @example Info.meridiems() //=> [ 'AM', 'PM' ]
     * @example Info.meridiems({ locale: 'my' }) //=> [ 'နံနက်', 'ညနေ' ]
     * @return {Array}
     */
    static meridiems({
      locale: n = null
    } = {}) {
      return W.create(n).meridiems();
    }
    /**
     * Return an array of eras, such as ['BC', 'AD']. The locale can be specified, but the calendar system is always Gregorian.
     * @param {string} [length='short'] - the length of the era representation, such as "short" or "long".
     * @param {Object} opts - options
     * @param {string} [opts.locale] - the locale code
     * @example Info.eras() //=> [ 'BC', 'AD' ]
     * @example Info.eras('long') //=> [ 'Before Christ', 'Anno Domini' ]
     * @example Info.eras('long', { locale: 'fr' }) //=> [ 'avant Jésus-Christ', 'après Jésus-Christ' ]
     * @return {Array}
     */
    static eras(n = "short", {
      locale: i = null
    } = {}) {
      return W.create(i, null, "gregory").eras(n);
    }
    /**
     * Return the set of available features in this environment.
     * Some features of Luxon are not available in all environments. For example, on older browsers, relative time formatting support is not available. Use this function to figure out if that's the case.
     * Keys:
     * * `relative`: whether this environment supports relative time formatting
     * * `localeWeek`: whether this environment supports different weekdays for the start of the week based on the locale
     * @example Info.features() //=> { relative: false, localeWeek: true }
     * @return {Object}
     */
    static features() {
      return {
        relative: Or(),
        localeWeek: Dr()
      };
    }
  }
  function es(o, n) {
    const i = (h) => h.toUTC(0, {
      keepLocalTime: !0
    }).startOf("day").valueOf(), u = i(n) - i(o);
    return Math.floor(B.fromMillis(u).as("days"));
  }
  function go(o, n, i) {
    const u = [["years", (b, S) => S.year - b.year], ["quarters", (b, S) => S.quarter - b.quarter + (S.year - b.year) * 4], ["months", (b, S) => S.month - b.month + (S.year - b.year) * 12], ["weeks", (b, S) => {
      const M = es(b, S);
      return (M - M % 7) / 7;
    }], ["days", es]], h = {}, f = o;
    let m, y;
    for (const [b, S] of u)
      i.indexOf(b) >= 0 && (m = b, h[b] = S(o, n), y = f.plus(h), y > n ? (h[b]--, o = f.plus(h), o > n && (y = o, h[b]--, o = f.plus(h))) : o = y);
    return [o, h, y, m];
  }
  function yo(o, n, i, u) {
    let [h, f, m, y] = go(o, n, i);
    const b = n - h, S = i.filter((V) => ["hours", "minutes", "seconds", "milliseconds"].indexOf(V) >= 0);
    S.length === 0 && (m < n && (m = h.plus({
      [y]: 1
    })), m !== h && (f[y] = (f[y] || 0) + b / (m - h)));
    const M = B.fromObject(f, u);
    return S.length > 0 ? B.fromMillis(b, u).shiftTo(...S).plus(M) : M;
  }
  const wo = "missing Intl.DateTimeFormat.formatToParts support";
  function U(o, n = (i) => i) {
    return {
      regex: o,
      deser: ([i]) => n(aa(i))
    };
  }
  const ts = "[  ]", ns = new RegExp(ts, "g");
  function bo(o) {
    return o.replace(/\./g, "\\.?").replace(ns, ts);
  }
  function rs(o) {
    return o.replace(/\./g, "").replace(ns, " ").toLowerCase();
  }
  function fe(o, n) {
    return o === null ? null : {
      regex: RegExp(o.map(bo).join("|")),
      deser: ([i]) => o.findIndex((u) => rs(i) === rs(u)) + n
    };
  }
  function ss(o, n) {
    return {
      regex: o,
      deser: ([, i, u]) => Pt(i, u),
      groups: n
    };
  }
  function Ut(o) {
    return {
      regex: o,
      deser: ([n]) => n
    };
  }
  function vo(o) {
    return o.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&");
  }
  function Co(o, n) {
    const i = he(n), u = he(n, "{2}"), h = he(n, "{3}"), f = he(n, "{4}"), m = he(n, "{6}"), y = he(n, "{1,2}"), b = he(n, "{1,3}"), S = he(n, "{1,6}"), M = he(n, "{1,9}"), V = he(n, "{2,4}"), K = he(n, "{4,6}"), A = (pe) => ({
      regex: RegExp(vo(pe.val)),
      deser: ([st]) => st,
      literal: !0
    }), rt = ((pe) => {
      if (o.literal)
        return A(pe);
      switch (pe.val) {
        // era
        case "G":
          return fe(n.eras("short"), 0);
        case "GG":
          return fe(n.eras("long"), 0);
        // years
        case "y":
          return U(S);
        case "yy":
          return U(V, wn);
        case "yyyy":
          return U(f);
        case "yyyyy":
          return U(K);
        case "yyyyyy":
          return U(m);
        // months
        case "M":
          return U(y);
        case "MM":
          return U(u);
        case "MMM":
          return fe(n.months("short", !0), 1);
        case "MMMM":
          return fe(n.months("long", !0), 1);
        case "L":
          return U(y);
        case "LL":
          return U(u);
        case "LLL":
          return fe(n.months("short", !1), 1);
        case "LLLL":
          return fe(n.months("long", !1), 1);
        // dates
        case "d":
          return U(y);
        case "dd":
          return U(u);
        // ordinals
        case "o":
          return U(b);
        case "ooo":
          return U(h);
        // time
        case "HH":
          return U(u);
        case "H":
          return U(y);
        case "hh":
          return U(u);
        case "h":
          return U(y);
        case "mm":
          return U(u);
        case "m":
          return U(y);
        case "q":
          return U(y);
        case "qq":
          return U(u);
        case "s":
          return U(y);
        case "ss":
          return U(u);
        case "S":
          return U(b);
        case "SSS":
          return U(h);
        case "u":
          return Ut(M);
        case "uu":
          return Ut(y);
        case "uuu":
          return U(i);
        // meridiem
        case "a":
          return fe(n.meridiems(), 0);
        // weekYear (k)
        case "kkkk":
          return U(f);
        case "kk":
          return U(V, wn);
        // weekNumber (W)
        case "W":
          return U(y);
        case "WW":
          return U(u);
        // weekdays
        case "E":
        case "c":
          return U(i);
        case "EEE":
          return fe(n.weekdays("short", !1), 1);
        case "EEEE":
          return fe(n.weekdays("long", !1), 1);
        case "ccc":
          return fe(n.weekdays("short", !0), 1);
        case "cccc":
          return fe(n.weekdays("long", !0), 1);
        // offset/zone
        case "Z":
        case "ZZ":
          return ss(new RegExp(`([+-]${y.source})(?::(${u.source}))?`), 2);
        case "ZZZ":
          return ss(new RegExp(`([+-]${y.source})(${u.source})?`), 2);
        // we don't support ZZZZ (PST) or ZZZZZ (Pacific Standard Time) in parsing
        // because we don't have any way to figure out what they are
        case "z":
          return Ut(/[a-z_+-/]{1,256}?/i);
        // this special-case "token" represents a place where a macro-token expanded into a white-space literal
        // in this case we accept any non-newline white-space
        case " ":
          return Ut(/[^\S\n\r]/);
        default:
          return A(pe);
      }
    })(o) || {
      invalidReason: wo
    };
    return rt.token = o, rt;
  }
  const So = {
    year: {
      "2-digit": "yy",
      numeric: "yyyyy"
    },
    month: {
      numeric: "M",
      "2-digit": "MM",
      short: "MMM",
      long: "MMMM"
    },
    day: {
      numeric: "d",
      "2-digit": "dd"
    },
    weekday: {
      short: "EEE",
      long: "EEEE"
    },
    dayperiod: "a",
    dayPeriod: "a",
    hour12: {
      numeric: "h",
      "2-digit": "hh"
    },
    hour24: {
      numeric: "H",
      "2-digit": "HH"
    },
    minute: {
      numeric: "m",
      "2-digit": "mm"
    },
    second: {
      numeric: "s",
      "2-digit": "ss"
    },
    timeZoneName: {
      long: "ZZZZZ",
      short: "ZZZ"
    }
  };
  function To(o, n, i) {
    const {
      type: u,
      value: h
    } = o;
    if (u === "literal") {
      const b = /^\s+$/.test(h);
      return {
        literal: !b,
        val: b ? " " : h
      };
    }
    const f = n[u];
    let m = u;
    u === "hour" && (n.hour12 != null ? m = n.hour12 ? "hour12" : "hour24" : n.hourCycle != null ? n.hourCycle === "h11" || n.hourCycle === "h12" ? m = "hour12" : m = "hour24" : m = i.hour12 ? "hour12" : "hour24");
    let y = So[m];
    if (typeof y == "object" && (y = y[f]), y)
      return {
        literal: !1,
        val: y
      };
  }
  function _o(o) {
    return [`^${o.map((i) => i.regex).reduce((i, u) => `${i}(${u.source})`, "")}$`, o];
  }
  function Eo(o, n, i) {
    const u = o.match(n);
    if (u) {
      const h = {};
      let f = 1;
      for (const m in i)
        if (ze(i, m)) {
          const y = i[m], b = y.groups ? y.groups + 1 : 1;
          !y.literal && y.token && (h[y.token.val[0]] = y.deser(u.slice(f, f + b))), f += b;
        }
      return [u, h];
    } else
      return [u, {}];
  }
  function Io(o) {
    const n = (f) => {
      switch (f) {
        case "S":
          return "millisecond";
        case "s":
          return "second";
        case "m":
          return "minute";
        case "h":
        case "H":
          return "hour";
        case "d":
          return "day";
        case "o":
          return "ordinal";
        case "L":
        case "M":
          return "month";
        case "y":
          return "year";
        case "E":
        case "c":
          return "weekday";
        case "W":
          return "weekNumber";
        case "k":
          return "weekYear";
        case "q":
          return "quarter";
        default:
          return null;
      }
    };
    let i = null, u;
    return O(o.z) || (i = me.create(o.z)), O(o.Z) || (i || (i = new te(o.Z)), u = o.Z), O(o.q) || (o.M = (o.q - 1) * 3 + 1), O(o.h) || (o.h < 12 && o.a === 1 ? o.h += 12 : o.h === 12 && o.a === 0 && (o.h = 0)), o.G === 0 && o.y && (o.y = -o.y), O(o.u) || (o.S = gn(o.u)), [Object.keys(o).reduce((f, m) => {
      const y = n(m);
      return y && (f[y] = o[m]), f;
    }, {}), i, u];
  }
  let Sn = null;
  function ko() {
    return Sn || (Sn = D.fromMillis(1555555555555)), Sn;
  }
  function Mo(o, n) {
    if (o.literal)
      return o;
    const i = ne.macroTokenToFormatOpts(o.val), u = us(i, n);
    return u == null || u.includes(void 0) ? o : u;
  }
  function is(o, n) {
    return Array.prototype.concat(...o.map((i) => Mo(i, n)));
  }
  class as {
    constructor(n, i) {
      if (this.locale = n, this.format = i, this.tokens = is(ne.parseFormat(i), n), this.units = this.tokens.map((u) => Co(u, n)), this.disqualifyingUnit = this.units.find((u) => u.invalidReason), !this.disqualifyingUnit) {
        const [u, h] = _o(this.units);
        this.regex = RegExp(u, "i"), this.handlers = h;
      }
    }
    explainFromTokens(n) {
      if (this.isValid) {
        const [i, u] = Eo(n, this.regex, this.handlers), [h, f, m] = u ? Io(u) : [null, null, void 0];
        if (ze(u, "a") && ze(u, "H"))
          throw new a("Can't include meridiem when specifying 24-hour format");
        return {
          input: n,
          tokens: this.tokens,
          regex: this.regex,
          rawMatches: i,
          matches: u,
          result: h,
          zone: f,
          specificOffset: m
        };
      } else
        return {
          input: n,
          tokens: this.tokens,
          invalidReason: this.invalidReason
        };
    }
    get isValid() {
      return !this.disqualifyingUnit;
    }
    get invalidReason() {
      return this.disqualifyingUnit ? this.disqualifyingUnit.invalidReason : null;
    }
  }
  function os(o, n, i) {
    return new as(o, i).explainFromTokens(n);
  }
  function Oo(o, n, i) {
    const {
      result: u,
      zone: h,
      specificOffset: f,
      invalidReason: m
    } = os(o, n, i);
    return [u, h, f, m];
  }
  function us(o, n) {
    if (!o)
      return null;
    const u = ne.create(n, o).dtFormatter(ko()), h = u.formatToParts(), f = u.resolvedOptions();
    return h.map((m) => To(m, o, f));
  }
  const Tn = "Invalid DateTime", Do = 864e13;
  function vt(o) {
    return new de("unsupported zone", `the zone "${o.name}" is not supported`);
  }
  function _n(o) {
    return o.weekData === null && (o.weekData = Rt(o.c)), o.weekData;
  }
  function En(o) {
    return o.localWeekData === null && (o.localWeekData = Rt(o.c, o.loc.getMinDaysInFirstWeek(), o.loc.getStartOfWeek())), o.localWeekData;
  }
  function xe(o, n) {
    const i = {
      ts: o.ts,
      zone: o.zone,
      c: o.c,
      o: o.o,
      loc: o.loc,
      invalid: o.invalid
    };
    return new D({
      ...i,
      ...n,
      old: i
    });
  }
  function cs(o, n, i) {
    let u = o - n * 60 * 1e3;
    const h = i.offset(u);
    if (n === h)
      return [u, n];
    u -= (h - n) * 60 * 1e3;
    const f = i.offset(u);
    return h === f ? [u, h] : [o - Math.min(h, f) * 60 * 1e3, Math.max(h, f)];
  }
  function Wt(o, n) {
    o += n * 60 * 1e3;
    const i = new Date(o);
    return {
      year: i.getUTCFullYear(),
      month: i.getUTCMonth() + 1,
      day: i.getUTCDate(),
      hour: i.getUTCHours(),
      minute: i.getUTCMinutes(),
      second: i.getUTCSeconds(),
      millisecond: i.getUTCMilliseconds()
    };
  }
  function jt(o, n, i) {
    return cs(Lt(o), n, i);
  }
  function ls(o, n) {
    const i = o.o, u = o.c.year + Math.trunc(n.years), h = o.c.month + Math.trunc(n.months) + Math.trunc(n.quarters) * 3, f = {
      ...o.c,
      year: u,
      month: h,
      day: Math.min(o.c.day, xt(u, h)) + Math.trunc(n.days) + Math.trunc(n.weeks) * 7
    }, m = B.fromObject({
      years: n.years - Math.trunc(n.years),
      quarters: n.quarters - Math.trunc(n.quarters),
      months: n.months - Math.trunc(n.months),
      weeks: n.weeks - Math.trunc(n.weeks),
      days: n.days - Math.trunc(n.days),
      hours: n.hours,
      minutes: n.minutes,
      seconds: n.seconds,
      milliseconds: n.milliseconds
    }).as("milliseconds"), y = Lt(f);
    let [b, S] = cs(y, i, o.zone);
    return m !== 0 && (b += m, S = o.zone.offset(b)), {
      ts: b,
      o: S
    };
  }
  function nt(o, n, i, u, h, f) {
    const {
      setZone: m,
      zone: y
    } = i;
    if (o && Object.keys(o).length !== 0 || n) {
      const b = n || y, S = D.fromObject(o, {
        ...i,
        zone: b,
        specificOffset: f
      });
      return m ? S : S.setZone(y);
    } else
      return D.invalid(new de("unparsable", `the input "${h}" can't be parsed as ${u}`));
  }
  function qt(o, n, i = !0) {
    return o.isValid ? ne.create(W.create("en-US"), {
      allowZ: i,
      forceSimple: !0
    }).formatDateTimeFromString(o, n) : null;
  }
  function In(o, n) {
    const i = o.c.year > 9999 || o.c.year < 0;
    let u = "";
    return i && o.c.year >= 0 && (u += "+"), u += Q(o.c.year, i ? 6 : 4), n ? (u += "-", u += Q(o.c.month), u += "-", u += Q(o.c.day)) : (u += Q(o.c.month), u += Q(o.c.day)), u;
  }
  function hs(o, n, i, u, h, f) {
    let m = Q(o.c.hour);
    return n ? (m += ":", m += Q(o.c.minute), (o.c.millisecond !== 0 || o.c.second !== 0 || !i) && (m += ":")) : m += Q(o.c.minute), (o.c.millisecond !== 0 || o.c.second !== 0 || !i) && (m += Q(o.c.second), (o.c.millisecond !== 0 || !u) && (m += ".", m += Q(o.c.millisecond, 3))), h && (o.isOffsetFixed && o.offset === 0 && !f ? m += "Z" : o.o < 0 ? (m += "-", m += Q(Math.trunc(-o.o / 60)), m += ":", m += Q(Math.trunc(-o.o % 60))) : (m += "+", m += Q(Math.trunc(o.o / 60)), m += ":", m += Q(Math.trunc(o.o % 60)))), f && (m += "[" + o.zone.ianaName + "]"), m;
  }
  const ds = {
    month: 1,
    day: 1,
    hour: 0,
    minute: 0,
    second: 0,
    millisecond: 0
  }, Ao = {
    weekNumber: 1,
    weekday: 1,
    hour: 0,
    minute: 0,
    second: 0,
    millisecond: 0
  }, No = {
    ordinal: 1,
    hour: 0,
    minute: 0,
    second: 0,
    millisecond: 0
  }, fs = ["year", "month", "day", "hour", "minute", "second", "millisecond"], Fo = ["weekYear", "weekNumber", "weekday", "hour", "minute", "second", "millisecond"], Ro = ["year", "ordinal", "hour", "minute", "second", "millisecond"];
  function $o(o) {
    const n = {
      year: "year",
      years: "year",
      month: "month",
      months: "month",
      day: "day",
      days: "day",
      hour: "hour",
      hours: "hour",
      minute: "minute",
      minutes: "minute",
      quarter: "quarter",
      quarters: "quarter",
      second: "second",
      seconds: "second",
      millisecond: "millisecond",
      milliseconds: "millisecond",
      weekday: "weekday",
      weekdays: "weekday",
      weeknumber: "weekNumber",
      weeksnumber: "weekNumber",
      weeknumbers: "weekNumber",
      weekyear: "weekYear",
      weekyears: "weekYear",
      ordinal: "ordinal"
    }[o.toLowerCase()];
    if (!n) throw new c(o);
    return n;
  }
  function ms(o) {
    switch (o.toLowerCase()) {
      case "localweekday":
      case "localweekdays":
        return "localWeekday";
      case "localweeknumber":
      case "localweeknumbers":
        return "localWeekNumber";
      case "localweekyear":
      case "localweekyears":
        return "localWeekYear";
      default:
        return $o(o);
    }
  }
  function xo(o) {
    if (Ct === void 0 && (Ct = H.now()), o.type !== "iana")
      return o.offset(Ct);
    const n = o.name;
    let i = kn.get(n);
    return i === void 0 && (i = o.offset(Ct), kn.set(n, i)), i;
  }
  function ps(o, n) {
    const i = Ee(n.zone, H.defaultZone);
    if (!i.isValid)
      return D.invalid(vt(i));
    const u = W.fromObject(n);
    let h, f;
    if (O(o.year))
      h = H.now();
    else {
      for (const b of fs)
        O(o[b]) && (o[b] = ds[b]);
      const m = kr(o) || Mr(o);
      if (m)
        return D.invalid(m);
      const y = xo(i);
      [h, f] = jt(o, y, i);
    }
    return new D({
      ts: h,
      zone: i,
      loc: u,
      o: f
    });
  }
  function gs(o, n, i) {
    const u = O(i.round) ? !0 : i.round, h = (m, y) => (m = yn(m, u || i.calendary ? 0 : 2, !0), n.loc.clone(i).relFormatter(i).format(m, y)), f = (m) => i.calendary ? n.hasSame(o, m) ? 0 : n.startOf(m).diff(o.startOf(m), m).get(m) : n.diff(o, m).get(m);
    if (i.unit)
      return h(f(i.unit), i.unit);
    for (const m of i.units) {
      const y = f(m);
      if (Math.abs(y) >= 1)
        return h(y, m);
    }
    return h(o > n ? -0 : 0, i.units[i.units.length - 1]);
  }
  function ys(o) {
    let n = {}, i;
    return o.length > 0 && typeof o[o.length - 1] == "object" ? (n = o[o.length - 1], i = Array.from(o).slice(0, o.length - 1)) : i = Array.from(o), [n, i];
  }
  let Ct;
  const kn = /* @__PURE__ */ new Map();
  class D {
    /**
     * @access private
     */
    constructor(n) {
      const i = n.zone || H.defaultZone;
      let u = n.invalid || (Number.isNaN(n.ts) ? new de("invalid input") : null) || (i.isValid ? null : vt(i));
      this.ts = O(n.ts) ? H.now() : n.ts;
      let h = null, f = null;
      if (!u)
        if (n.old && n.old.ts === this.ts && n.old.zone.equals(i))
          [h, f] = [n.old.c, n.old.o];
        else {
          const y = Ie(n.o) && !n.old ? n.o : i.offset(this.ts);
          h = Wt(this.ts, y), u = Number.isNaN(h.year) ? new de("invalid input") : null, h = u ? null : h, f = u ? null : y;
        }
      this._zone = i, this.loc = n.loc || W.create(), this.invalid = u, this.weekData = null, this.localWeekData = null, this.c = h, this.o = f, this.isLuxonDateTime = !0;
    }
    // CONSTRUCT
    /**
     * Create a DateTime for the current instant, in the system's time zone.
     *
     * Use Settings to override these default values if needed.
     * @example DateTime.now().toISO() //~> now in the ISO format
     * @return {DateTime}
     */
    static now() {
      return new D({});
    }
    /**
     * Create a local DateTime
     * @param {number} [year] - The calendar year. If omitted (as in, call `local()` with no arguments), the current time will be used
     * @param {number} [month=1] - The month, 1-indexed
     * @param {number} [day=1] - The day of the month, 1-indexed
     * @param {number} [hour=0] - The hour of the day, in 24-hour time
     * @param {number} [minute=0] - The minute of the hour, meaning a number between 0 and 59
     * @param {number} [second=0] - The second of the minute, meaning a number between 0 and 59
     * @param {number} [millisecond=0] - The millisecond of the second, meaning a number between 0 and 999
     * @example DateTime.local()                                  //~> now
     * @example DateTime.local({ zone: "America/New_York" })      //~> now, in US east coast time
     * @example DateTime.local(2017)                              //~> 2017-01-01T00:00:00
     * @example DateTime.local(2017, 3)                           //~> 2017-03-01T00:00:00
     * @example DateTime.local(2017, 3, 12, { locale: "fr" })     //~> 2017-03-12T00:00:00, with a French locale
     * @example DateTime.local(2017, 3, 12, 5)                    //~> 2017-03-12T05:00:00
     * @example DateTime.local(2017, 3, 12, 5, { zone: "utc" })   //~> 2017-03-12T05:00:00, in UTC
     * @example DateTime.local(2017, 3, 12, 5, 45)                //~> 2017-03-12T05:45:00
     * @example DateTime.local(2017, 3, 12, 5, 45, 10)            //~> 2017-03-12T05:45:10
     * @example DateTime.local(2017, 3, 12, 5, 45, 10, 765)       //~> 2017-03-12T05:45:10.765
     * @return {DateTime}
     */
    static local() {
      const [n, i] = ys(arguments), [u, h, f, m, y, b, S] = i;
      return ps({
        year: u,
        month: h,
        day: f,
        hour: m,
        minute: y,
        second: b,
        millisecond: S
      }, n);
    }
    /**
     * Create a DateTime in UTC
     * @param {number} [year] - The calendar year. If omitted (as in, call `utc()` with no arguments), the current time will be used
     * @param {number} [month=1] - The month, 1-indexed
     * @param {number} [day=1] - The day of the month
     * @param {number} [hour=0] - The hour of the day, in 24-hour time
     * @param {number} [minute=0] - The minute of the hour, meaning a number between 0 and 59
     * @param {number} [second=0] - The second of the minute, meaning a number between 0 and 59
     * @param {number} [millisecond=0] - The millisecond of the second, meaning a number between 0 and 999
     * @param {Object} options - configuration options for the DateTime
     * @param {string} [options.locale] - a locale to set on the resulting DateTime instance
     * @param {string} [options.outputCalendar] - the output calendar to set on the resulting DateTime instance
     * @param {string} [options.numberingSystem] - the numbering system to set on the resulting DateTime instance
     * @param {string} [options.weekSettings] - the week settings to set on the resulting DateTime instance
     * @example DateTime.utc()                                              //~> now
     * @example DateTime.utc(2017)                                          //~> 2017-01-01T00:00:00Z
     * @example DateTime.utc(2017, 3)                                       //~> 2017-03-01T00:00:00Z
     * @example DateTime.utc(2017, 3, 12)                                   //~> 2017-03-12T00:00:00Z
     * @example DateTime.utc(2017, 3, 12, 5)                                //~> 2017-03-12T05:00:00Z
     * @example DateTime.utc(2017, 3, 12, 5, 45)                            //~> 2017-03-12T05:45:00Z
     * @example DateTime.utc(2017, 3, 12, 5, 45, { locale: "fr" })          //~> 2017-03-12T05:45:00Z with a French locale
     * @example DateTime.utc(2017, 3, 12, 5, 45, 10)                        //~> 2017-03-12T05:45:10Z
     * @example DateTime.utc(2017, 3, 12, 5, 45, 10, 765, { locale: "fr" }) //~> 2017-03-12T05:45:10.765Z with a French locale
     * @return {DateTime}
     */
    static utc() {
      const [n, i] = ys(arguments), [u, h, f, m, y, b, S] = i;
      return n.zone = te.utcInstance, ps({
        year: u,
        month: h,
        day: f,
        hour: m,
        minute: y,
        second: b,
        millisecond: S
      }, n);
    }
    /**
     * Create a DateTime from a JavaScript Date object. Uses the default zone.
     * @param {Date} date - a JavaScript Date object
     * @param {Object} options - configuration options for the DateTime
     * @param {string|Zone} [options.zone='local'] - the zone to place the DateTime into
     * @return {DateTime}
     */
    static fromJSDate(n, i = {}) {
      const u = ha(n) ? n.valueOf() : NaN;
      if (Number.isNaN(u))
        return D.invalid("invalid input");
      const h = Ee(i.zone, H.defaultZone);
      return h.isValid ? new D({
        ts: u,
        zone: h,
        loc: W.fromObject(i)
      }) : D.invalid(vt(h));
    }
    /**
     * Create a DateTime from a number of milliseconds since the epoch (meaning since 1 January 1970 00:00:00 UTC). Uses the default zone.
     * @param {number} milliseconds - a number of milliseconds since 1970 UTC
     * @param {Object} options - configuration options for the DateTime
     * @param {string|Zone} [options.zone='local'] - the zone to place the DateTime into
     * @param {string} [options.locale] - a locale to set on the resulting DateTime instance
     * @param {string} options.outputCalendar - the output calendar to set on the resulting DateTime instance
     * @param {string} options.numberingSystem - the numbering system to set on the resulting DateTime instance
     * @param {string} options.weekSettings - the week settings to set on the resulting DateTime instance
     * @return {DateTime}
     */
    static fromMillis(n, i = {}) {
      if (Ie(n))
        return n < -864e13 || n > Do ? D.invalid("Timestamp out of range") : new D({
          ts: n,
          zone: Ee(i.zone, H.defaultZone),
          loc: W.fromObject(i)
        });
      throw new l(`fromMillis requires a numerical input, but received a ${typeof n} with value ${n}`);
    }
    /**
     * Create a DateTime from a number of seconds since the epoch (meaning since 1 January 1970 00:00:00 UTC). Uses the default zone.
     * @param {number} seconds - a number of seconds since 1970 UTC
     * @param {Object} options - configuration options for the DateTime
     * @param {string|Zone} [options.zone='local'] - the zone to place the DateTime into
     * @param {string} [options.locale] - a locale to set on the resulting DateTime instance
     * @param {string} options.outputCalendar - the output calendar to set on the resulting DateTime instance
     * @param {string} options.numberingSystem - the numbering system to set on the resulting DateTime instance
     * @param {string} options.weekSettings - the week settings to set on the resulting DateTime instance
     * @return {DateTime}
     */
    static fromSeconds(n, i = {}) {
      if (Ie(n))
        return new D({
          ts: n * 1e3,
          zone: Ee(i.zone, H.defaultZone),
          loc: W.fromObject(i)
        });
      throw new l("fromSeconds requires a numerical input");
    }
    /**
     * Create a DateTime from a JavaScript object with keys like 'year' and 'hour' with reasonable defaults.
     * @param {Object} obj - the object to create the DateTime from
     * @param {number} obj.year - a year, such as 1987
     * @param {number} obj.month - a month, 1-12
     * @param {number} obj.day - a day of the month, 1-31, depending on the month
     * @param {number} obj.ordinal - day of the year, 1-365 or 366
     * @param {number} obj.weekYear - an ISO week year
     * @param {number} obj.weekNumber - an ISO week number, between 1 and 52 or 53, depending on the year
     * @param {number} obj.weekday - an ISO weekday, 1-7, where 1 is Monday and 7 is Sunday
     * @param {number} obj.localWeekYear - a week year, according to the locale
     * @param {number} obj.localWeekNumber - a week number, between 1 and 52 or 53, depending on the year, according to the locale
     * @param {number} obj.localWeekday - a weekday, 1-7, where 1 is the first and 7 is the last day of the week, according to the locale
     * @param {number} obj.hour - hour of the day, 0-23
     * @param {number} obj.minute - minute of the hour, 0-59
     * @param {number} obj.second - second of the minute, 0-59
     * @param {number} obj.millisecond - millisecond of the second, 0-999
     * @param {Object} opts - options for creating this DateTime
     * @param {string|Zone} [opts.zone='local'] - interpret the numbers in the context of a particular zone. Can take any value taken as the first argument to setZone()
     * @param {string} [opts.locale='system\'s locale'] - a locale to set on the resulting DateTime instance
     * @param {string} opts.outputCalendar - the output calendar to set on the resulting DateTime instance
     * @param {string} opts.numberingSystem - the numbering system to set on the resulting DateTime instance
     * @param {string} opts.weekSettings - the week settings to set on the resulting DateTime instance
     * @example DateTime.fromObject({ year: 1982, month: 5, day: 25}).toISODate() //=> '1982-05-25'
     * @example DateTime.fromObject({ year: 1982 }).toISODate() //=> '1982-01-01'
     * @example DateTime.fromObject({ hour: 10, minute: 26, second: 6 }) //~> today at 10:26:06
     * @example DateTime.fromObject({ hour: 10, minute: 26, second: 6 }, { zone: 'utc' }),
     * @example DateTime.fromObject({ hour: 10, minute: 26, second: 6 }, { zone: 'local' })
     * @example DateTime.fromObject({ hour: 10, minute: 26, second: 6 }, { zone: 'America/New_York' })
     * @example DateTime.fromObject({ weekYear: 2016, weekNumber: 2, weekday: 3 }).toISODate() //=> '2016-01-13'
     * @example DateTime.fromObject({ localWeekYear: 2022, localWeekNumber: 1, localWeekday: 1 }, { locale: "en-US" }).toISODate() //=> '2021-12-26'
     * @return {DateTime}
     */
    static fromObject(n, i = {}) {
      n = n || {};
      const u = Ee(i.zone, H.defaultZone);
      if (!u.isValid)
        return D.invalid(vt(u));
      const h = W.fromObject(i), f = Vt(n, ms), {
        minDaysInFirstWeek: m,
        startOfWeek: y
      } = Ir(f, h), b = H.now(), S = O(i.specificOffset) ? u.offset(b) : i.specificOffset, M = !O(f.ordinal), V = !O(f.year), K = !O(f.month) || !O(f.day), A = V || K, X = f.weekYear || f.weekNumber;
      if ((A || M) && X)
        throw new a("Can't mix weekYear/weekNumber units with year/month/day or ordinals");
      if (K && M)
        throw new a("Can't mix ordinal dates with month/day");
      const rt = X || f.weekday && !A;
      let pe, st, Tt = Wt(b, S);
      rt ? (pe = Fo, st = Ao, Tt = Rt(Tt, m, y)) : M ? (pe = Ro, st = No, Tt = mn(Tt)) : (pe = fs, st = ds);
      let ws = !1;
      for (const Et of pe) {
        const Wo = f[Et];
        O(Wo) ? ws ? f[Et] = st[Et] : f[Et] = Tt[Et] : ws = !0;
      }
      const Po = rt ? ua(f, m, y) : M ? ca(f) : kr(f), bs = Po || Mr(f);
      if (bs)
        return D.invalid(bs);
      const Vo = rt ? _r(f, m, y) : M ? Er(f) : f, [Bo, Uo] = jt(Vo, S, u), _t = new D({
        ts: Bo,
        zone: u,
        o: Uo,
        loc: h
      });
      return f.weekday && A && n.weekday !== _t.weekday ? D.invalid("mismatched weekday", `you can't specify both a weekday of ${f.weekday} and a date of ${_t.toISO()}`) : _t.isValid ? _t : D.invalid(_t.invalid);
    }
    /**
     * Create a DateTime from an ISO 8601 string
     * @param {string} text - the ISO string
     * @param {Object} opts - options to affect the creation
     * @param {string|Zone} [opts.zone='local'] - use this zone if no offset is specified in the input string itself. Will also convert the time to this zone
     * @param {boolean} [opts.setZone=false] - override the zone with a fixed-offset zone specified in the string itself, if it specifies one
     * @param {string} [opts.locale='system's locale'] - a locale to set on the resulting DateTime instance
     * @param {string} [opts.outputCalendar] - the output calendar to set on the resulting DateTime instance
     * @param {string} [opts.numberingSystem] - the numbering system to set on the resulting DateTime instance
     * @param {string} [opts.weekSettings] - the week settings to set on the resulting DateTime instance
     * @example DateTime.fromISO('2016-05-25T09:08:34.123')
     * @example DateTime.fromISO('2016-05-25T09:08:34.123+06:00')
     * @example DateTime.fromISO('2016-05-25T09:08:34.123+06:00', {setZone: true})
     * @example DateTime.fromISO('2016-05-25T09:08:34.123', {zone: 'utc'})
     * @example DateTime.fromISO('2016-W05-4')
     * @return {DateTime}
     */
    static fromISO(n, i = {}) {
      const [u, h] = eo(n);
      return nt(u, h, i, "ISO 8601", n);
    }
    /**
     * Create a DateTime from an RFC 2822 string
     * @param {string} text - the RFC 2822 string
     * @param {Object} opts - options to affect the creation
     * @param {string|Zone} [opts.zone='local'] - convert the time to this zone. Since the offset is always specified in the string itself, this has no effect on the interpretation of string, merely the zone the resulting DateTime is expressed in.
     * @param {boolean} [opts.setZone=false] - override the zone with a fixed-offset zone specified in the string itself, if it specifies one
     * @param {string} [opts.locale='system's locale'] - a locale to set on the resulting DateTime instance
     * @param {string} opts.outputCalendar - the output calendar to set on the resulting DateTime instance
     * @param {string} opts.numberingSystem - the numbering system to set on the resulting DateTime instance
     * @param {string} opts.weekSettings - the week settings to set on the resulting DateTime instance
     * @example DateTime.fromRFC2822('25 Nov 2016 13:23:12 GMT')
     * @example DateTime.fromRFC2822('Fri, 25 Nov 2016 13:23:12 +0600')
     * @example DateTime.fromRFC2822('25 Nov 2016 13:23 Z')
     * @return {DateTime}
     */
    static fromRFC2822(n, i = {}) {
      const [u, h] = to(n);
      return nt(u, h, i, "RFC 2822", n);
    }
    /**
     * Create a DateTime from an HTTP header date
     * @see https://www.w3.org/Protocols/rfc2616/rfc2616-sec3.html#sec3.3.1
     * @param {string} text - the HTTP header date
     * @param {Object} opts - options to affect the creation
     * @param {string|Zone} [opts.zone='local'] - convert the time to this zone. Since HTTP dates are always in UTC, this has no effect on the interpretation of string, merely the zone the resulting DateTime is expressed in.
     * @param {boolean} [opts.setZone=false] - override the zone with the fixed-offset zone specified in the string. For HTTP dates, this is always UTC, so this option is equivalent to setting the `zone` option to 'utc', but this option is included for consistency with similar methods.
     * @param {string} [opts.locale='system's locale'] - a locale to set on the resulting DateTime instance
     * @param {string} opts.outputCalendar - the output calendar to set on the resulting DateTime instance
     * @param {string} opts.numberingSystem - the numbering system to set on the resulting DateTime instance
     * @param {string} opts.weekSettings - the week settings to set on the resulting DateTime instance
     * @example DateTime.fromHTTP('Sun, 06 Nov 1994 08:49:37 GMT')
     * @example DateTime.fromHTTP('Sunday, 06-Nov-94 08:49:37 GMT')
     * @example DateTime.fromHTTP('Sun Nov  6 08:49:37 1994')
     * @return {DateTime}
     */
    static fromHTTP(n, i = {}) {
      const [u, h] = no(n);
      return nt(u, h, i, "HTTP", i);
    }
    /**
     * Create a DateTime from an input string and format string.
     * Defaults to en-US if no locale has been specified, regardless of the system's locale. For a table of tokens and their interpretations, see [here](https://moment.github.io/luxon/#/parsing?id=table-of-tokens).
     * @param {string} text - the string to parse
     * @param {string} fmt - the format the string is expected to be in (see the link below for the formats)
     * @param {Object} opts - options to affect the creation
     * @param {string|Zone} [opts.zone='local'] - use this zone if no offset is specified in the input string itself. Will also convert the DateTime to this zone
     * @param {boolean} [opts.setZone=false] - override the zone with a zone specified in the string itself, if it specifies one
     * @param {string} [opts.locale='en-US'] - a locale string to use when parsing. Will also set the DateTime to this locale
     * @param {string} opts.numberingSystem - the numbering system to use when parsing. Will also set the resulting DateTime to this numbering system
     * @param {string} opts.weekSettings - the week settings to set on the resulting DateTime instance
     * @param {string} opts.outputCalendar - the output calendar to set on the resulting DateTime instance
     * @return {DateTime}
     */
    static fromFormat(n, i, u = {}) {
      if (O(n) || O(i))
        throw new l("fromFormat requires an input string and a format");
      const {
        locale: h = null,
        numberingSystem: f = null
      } = u, m = W.fromOpts({
        locale: h,
        numberingSystem: f,
        defaultToEN: !0
      }), [y, b, S, M] = Oo(m, n, i);
      return M ? D.invalid(M) : nt(y, b, u, `format ${i}`, n, S);
    }
    /**
     * @deprecated use fromFormat instead
     */
    static fromString(n, i, u = {}) {
      return D.fromFormat(n, i, u);
    }
    /**
     * Create a DateTime from a SQL date, time, or datetime
     * Defaults to en-US if no locale has been specified, regardless of the system's locale
     * @param {string} text - the string to parse
     * @param {Object} opts - options to affect the creation
     * @param {string|Zone} [opts.zone='local'] - use this zone if no offset is specified in the input string itself. Will also convert the DateTime to this zone
     * @param {boolean} [opts.setZone=false] - override the zone with a zone specified in the string itself, if it specifies one
     * @param {string} [opts.locale='en-US'] - a locale string to use when parsing. Will also set the DateTime to this locale
     * @param {string} opts.numberingSystem - the numbering system to use when parsing. Will also set the resulting DateTime to this numbering system
     * @param {string} opts.weekSettings - the week settings to set on the resulting DateTime instance
     * @param {string} opts.outputCalendar - the output calendar to set on the resulting DateTime instance
     * @example DateTime.fromSQL('2017-05-15')
     * @example DateTime.fromSQL('2017-05-15 09:12:34')
     * @example DateTime.fromSQL('2017-05-15 09:12:34.342')
     * @example DateTime.fromSQL('2017-05-15 09:12:34.342+06:00')
     * @example DateTime.fromSQL('2017-05-15 09:12:34.342 America/Los_Angeles')
     * @example DateTime.fromSQL('2017-05-15 09:12:34.342 America/Los_Angeles', { setZone: true })
     * @example DateTime.fromSQL('2017-05-15 09:12:34.342', { zone: 'America/Los_Angeles' })
     * @example DateTime.fromSQL('09:12:34.342')
     * @return {DateTime}
     */
    static fromSQL(n, i = {}) {
      const [u, h] = co(n);
      return nt(u, h, i, "SQL", n);
    }
    /**
     * Create an invalid DateTime.
     * @param {string} reason - simple string of why this DateTime is invalid. Should not contain parameters or anything else data-dependent.
     * @param {string} [explanation=null] - longer explanation, may include parameters and other useful debugging information
     * @return {DateTime}
     */
    static invalid(n, i = null) {
      if (!n)
        throw new l("need to specify a reason the DateTime is invalid");
      const u = n instanceof de ? n : new de(n, i);
      if (H.throwOnInvalid)
        throw new e(u);
      return new D({
        invalid: u
      });
    }
    /**
     * Check if an object is an instance of DateTime. Works across context boundaries
     * @param {object} o
     * @return {boolean}
     */
    static isDateTime(n) {
      return n && n.isLuxonDateTime || !1;
    }
    /**
     * Produce the format string for a set of options
     * @param formatOpts
     * @param localeOpts
     * @returns {string}
     */
    static parseFormatForOpts(n, i = {}) {
      const u = us(n, W.fromObject(i));
      return u ? u.map((h) => h ? h.val : null).join("") : null;
    }
    /**
     * Produce the the fully expanded format token for the locale
     * Does NOT quote characters, so quoted tokens will not round trip correctly
     * @param fmt
     * @param localeOpts
     * @returns {string}
     */
    static expandFormat(n, i = {}) {
      return is(ne.parseFormat(n), W.fromObject(i)).map((h) => h.val).join("");
    }
    static resetCache() {
      Ct = void 0, kn.clear();
    }
    // INFO
    /**
     * Get the value of unit.
     * @param {string} unit - a unit such as 'minute' or 'day'
     * @example DateTime.local(2017, 7, 4).get('month'); //=> 7
     * @example DateTime.local(2017, 7, 4).get('day'); //=> 4
     * @return {number}
     */
    get(n) {
      return this[n];
    }
    /**
     * Returns whether the DateTime is valid. Invalid DateTimes occur when:
     * * The DateTime was created from invalid calendar information, such as the 13th month or February 30
     * * The DateTime was created by an operation on another invalid date
     * @type {boolean}
     */
    get isValid() {
      return this.invalid === null;
    }
    /**
     * Returns an error code if this DateTime is invalid, or null if the DateTime is valid
     * @type {string}
     */
    get invalidReason() {
      return this.invalid ? this.invalid.reason : null;
    }
    /**
     * Returns an explanation of why this DateTime became invalid, or null if the DateTime is valid
     * @type {string}
     */
    get invalidExplanation() {
      return this.invalid ? this.invalid.explanation : null;
    }
    /**
     * Get the locale of a DateTime, such 'en-GB'. The locale is used when formatting the DateTime
     *
     * @type {string}
     */
    get locale() {
      return this.isValid ? this.loc.locale : null;
    }
    /**
     * Get the numbering system of a DateTime, such 'beng'. The numbering system is used when formatting the DateTime
     *
     * @type {string}
     */
    get numberingSystem() {
      return this.isValid ? this.loc.numberingSystem : null;
    }
    /**
     * Get the output calendar of a DateTime, such 'islamic'. The output calendar is used when formatting the DateTime
     *
     * @type {string}
     */
    get outputCalendar() {
      return this.isValid ? this.loc.outputCalendar : null;
    }
    /**
     * Get the time zone associated with this DateTime.
     * @type {Zone}
     */
    get zone() {
      return this._zone;
    }
    /**
     * Get the name of the time zone.
     * @type {string}
     */
    get zoneName() {
      return this.isValid ? this.zone.name : null;
    }
    /**
     * Get the year
     * @example DateTime.local(2017, 5, 25).year //=> 2017
     * @type {number}
     */
    get year() {
      return this.isValid ? this.c.year : NaN;
    }
    /**
     * Get the quarter
     * @example DateTime.local(2017, 5, 25).quarter //=> 2
     * @type {number}
     */
    get quarter() {
      return this.isValid ? Math.ceil(this.c.month / 3) : NaN;
    }
    /**
     * Get the month (1-12).
     * @example DateTime.local(2017, 5, 25).month //=> 5
     * @type {number}
     */
    get month() {
      return this.isValid ? this.c.month : NaN;
    }
    /**
     * Get the day of the month (1-30ish).
     * @example DateTime.local(2017, 5, 25).day //=> 25
     * @type {number}
     */
    get day() {
      return this.isValid ? this.c.day : NaN;
    }
    /**
     * Get the hour of the day (0-23).
     * @example DateTime.local(2017, 5, 25, 9).hour //=> 9
     * @type {number}
     */
    get hour() {
      return this.isValid ? this.c.hour : NaN;
    }
    /**
     * Get the minute of the hour (0-59).
     * @example DateTime.local(2017, 5, 25, 9, 30).minute //=> 30
     * @type {number}
     */
    get minute() {
      return this.isValid ? this.c.minute : NaN;
    }
    /**
     * Get the second of the minute (0-59).
     * @example DateTime.local(2017, 5, 25, 9, 30, 52).second //=> 52
     * @type {number}
     */
    get second() {
      return this.isValid ? this.c.second : NaN;
    }
    /**
     * Get the millisecond of the second (0-999).
     * @example DateTime.local(2017, 5, 25, 9, 30, 52, 654).millisecond //=> 654
     * @type {number}
     */
    get millisecond() {
      return this.isValid ? this.c.millisecond : NaN;
    }
    /**
     * Get the week year
     * @see https://en.wikipedia.org/wiki/ISO_week_date
     * @example DateTime.local(2014, 12, 31).weekYear //=> 2015
     * @type {number}
     */
    get weekYear() {
      return this.isValid ? _n(this).weekYear : NaN;
    }
    /**
     * Get the week number of the week year (1-52ish).
     * @see https://en.wikipedia.org/wiki/ISO_week_date
     * @example DateTime.local(2017, 5, 25).weekNumber //=> 21
     * @type {number}
     */
    get weekNumber() {
      return this.isValid ? _n(this).weekNumber : NaN;
    }
    /**
     * Get the day of the week.
     * 1 is Monday and 7 is Sunday
     * @see https://en.wikipedia.org/wiki/ISO_week_date
     * @example DateTime.local(2014, 11, 31).weekday //=> 4
     * @type {number}
     */
    get weekday() {
      return this.isValid ? _n(this).weekday : NaN;
    }
    /**
     * Returns true if this date is on a weekend according to the locale, false otherwise
     * @returns {boolean}
     */
    get isWeekend() {
      return this.isValid && this.loc.getWeekendDays().includes(this.weekday);
    }
    /**
     * Get the day of the week according to the locale.
     * 1 is the first day of the week and 7 is the last day of the week.
     * If the locale assigns Sunday as the first day of the week, then a date which is a Sunday will return 1,
     * @returns {number}
     */
    get localWeekday() {
      return this.isValid ? En(this).weekday : NaN;
    }
    /**
     * Get the week number of the week year according to the locale. Different locales assign week numbers differently,
     * because the week can start on different days of the week (see localWeekday) and because a different number of days
     * is required for a week to count as the first week of a year.
     * @returns {number}
     */
    get localWeekNumber() {
      return this.isValid ? En(this).weekNumber : NaN;
    }
    /**
     * Get the week year according to the locale. Different locales assign week numbers (and therefor week years)
     * differently, see localWeekNumber.
     * @returns {number}
     */
    get localWeekYear() {
      return this.isValid ? En(this).weekYear : NaN;
    }
    /**
     * Get the ordinal (meaning the day of the year)
     * @example DateTime.local(2017, 5, 25).ordinal //=> 145
     * @type {number|DateTime}
     */
    get ordinal() {
      return this.isValid ? mn(this.c).ordinal : NaN;
    }
    /**
     * Get the human readable short month name, such as 'Oct'.
     * Defaults to the system's locale if no locale has been specified
     * @example DateTime.local(2017, 10, 30).monthShort //=> Oct
     * @type {string}
     */
    get monthShort() {
      return this.isValid ? bt.months("short", {
        locObj: this.loc
      })[this.month - 1] : null;
    }
    /**
     * Get the human readable long month name, such as 'October'.
     * Defaults to the system's locale if no locale has been specified
     * @example DateTime.local(2017, 10, 30).monthLong //=> October
     * @type {string}
     */
    get monthLong() {
      return this.isValid ? bt.months("long", {
        locObj: this.loc
      })[this.month - 1] : null;
    }
    /**
     * Get the human readable short weekday, such as 'Mon'.
     * Defaults to the system's locale if no locale has been specified
     * @example DateTime.local(2017, 10, 30).weekdayShort //=> Mon
     * @type {string}
     */
    get weekdayShort() {
      return this.isValid ? bt.weekdays("short", {
        locObj: this.loc
      })[this.weekday - 1] : null;
    }
    /**
     * Get the human readable long weekday, such as 'Monday'.
     * Defaults to the system's locale if no locale has been specified
     * @example DateTime.local(2017, 10, 30).weekdayLong //=> Monday
     * @type {string}
     */
    get weekdayLong() {
      return this.isValid ? bt.weekdays("long", {
        locObj: this.loc
      })[this.weekday - 1] : null;
    }
    /**
     * Get the UTC offset of this DateTime in minutes
     * @example DateTime.now().offset //=> -240
     * @example DateTime.utc().offset //=> 0
     * @type {number}
     */
    get offset() {
      return this.isValid ? +this.o : NaN;
    }
    /**
     * Get the short human name for the zone's current offset, for example "EST" or "EDT".
     * Defaults to the system's locale if no locale has been specified
     * @type {string}
     */
    get offsetNameShort() {
      return this.isValid ? this.zone.offsetName(this.ts, {
        format: "short",
        locale: this.locale
      }) : null;
    }
    /**
     * Get the long human name for the zone's current offset, for example "Eastern Standard Time" or "Eastern Daylight Time".
     * Defaults to the system's locale if no locale has been specified
     * @type {string}
     */
    get offsetNameLong() {
      return this.isValid ? this.zone.offsetName(this.ts, {
        format: "long",
        locale: this.locale
      }) : null;
    }
    /**
     * Get whether this zone's offset ever changes, as in a DST.
     * @type {boolean}
     */
    get isOffsetFixed() {
      return this.isValid ? this.zone.isUniversal : null;
    }
    /**
     * Get whether the DateTime is in a DST.
     * @type {boolean}
     */
    get isInDST() {
      return this.isOffsetFixed ? !1 : this.offset > this.set({
        month: 1,
        day: 1
      }).offset || this.offset > this.set({
        month: 5
      }).offset;
    }
    /**
     * Get those DateTimes which have the same local time as this DateTime, but a different offset from UTC
     * in this DateTime's zone. During DST changes local time can be ambiguous, for example
     * `2023-10-29T02:30:00` in `Europe/Berlin` can have offset `+01:00` or `+02:00`.
     * This method will return both possible DateTimes if this DateTime's local time is ambiguous.
     * @returns {DateTime[]}
     */
    getPossibleOffsets() {
      if (!this.isValid || this.isOffsetFixed)
        return [this];
      const n = 864e5, i = 6e4, u = Lt(this.c), h = this.zone.offset(u - n), f = this.zone.offset(u + n), m = this.zone.offset(u - h * i), y = this.zone.offset(u - f * i);
      if (m === y)
        return [this];
      const b = u - m * i, S = u - y * i, M = Wt(b, m), V = Wt(S, y);
      return M.hour === V.hour && M.minute === V.minute && M.second === V.second && M.millisecond === V.millisecond ? [xe(this, {
        ts: b
      }), xe(this, {
        ts: S
      })] : [this];
    }
    /**
     * Returns true if this DateTime is in a leap year, false otherwise
     * @example DateTime.local(2016).isInLeapYear //=> true
     * @example DateTime.local(2013).isInLeapYear //=> false
     * @type {boolean}
     */
    get isInLeapYear() {
      return mt(this.year);
    }
    /**
     * Returns the number of days in this DateTime's month
     * @example DateTime.local(2016, 2).daysInMonth //=> 29
     * @example DateTime.local(2016, 3).daysInMonth //=> 31
     * @type {number}
     */
    get daysInMonth() {
      return xt(this.year, this.month);
    }
    /**
     * Returns the number of days in this DateTime's year
     * @example DateTime.local(2016).daysInYear //=> 366
     * @example DateTime.local(2013).daysInYear //=> 365
     * @type {number}
     */
    get daysInYear() {
      return this.isValid ? Ye(this.year) : NaN;
    }
    /**
     * Returns the number of weeks in this DateTime's year
     * @see https://en.wikipedia.org/wiki/ISO_week_date
     * @example DateTime.local(2004).weeksInWeekYear //=> 53
     * @example DateTime.local(2013).weeksInWeekYear //=> 52
     * @type {number}
     */
    get weeksInWeekYear() {
      return this.isValid ? pt(this.weekYear) : NaN;
    }
    /**
     * Returns the number of weeks in this DateTime's local week year
     * @example DateTime.local(2020, 6, {locale: 'en-US'}).weeksInLocalWeekYear //=> 52
     * @example DateTime.local(2020, 6, {locale: 'de-DE'}).weeksInLocalWeekYear //=> 53
     * @type {number}
     */
    get weeksInLocalWeekYear() {
      return this.isValid ? pt(this.localWeekYear, this.loc.getMinDaysInFirstWeek(), this.loc.getStartOfWeek()) : NaN;
    }
    /**
     * Returns the resolved Intl options for this DateTime.
     * This is useful in understanding the behavior of formatting methods
     * @param {Object} opts - the same options as toLocaleString
     * @return {Object}
     */
    resolvedLocaleOptions(n = {}) {
      const {
        locale: i,
        numberingSystem: u,
        calendar: h
      } = ne.create(this.loc.clone(n), n).resolvedOptions(this);
      return {
        locale: i,
        numberingSystem: u,
        outputCalendar: h
      };
    }
    // TRANSFORM
    /**
     * "Set" the DateTime's zone to UTC. Returns a newly-constructed DateTime.
     *
     * Equivalent to {@link DateTime#setZone}('utc')
     * @param {number} [offset=0] - optionally, an offset from UTC in minutes
     * @param {Object} [opts={}] - options to pass to `setZone()`
     * @return {DateTime}
     */
    toUTC(n = 0, i = {}) {
      return this.setZone(te.instance(n), i);
    }
    /**
     * "Set" the DateTime's zone to the host's local zone. Returns a newly-constructed DateTime.
     *
     * Equivalent to `setZone('local')`
     * @return {DateTime}
     */
    toLocal() {
      return this.setZone(H.defaultZone);
    }
    /**
     * "Set" the DateTime's zone to specified zone. Returns a newly-constructed DateTime.
     *
     * By default, the setter keeps the underlying time the same (as in, the same timestamp), but the new instance will report different local times and consider DSTs when making computations, as with {@link DateTime#plus}. You may wish to use {@link DateTime#toLocal} and {@link DateTime#toUTC} which provide simple convenience wrappers for commonly used zones.
     * @param {string|Zone} [zone='local'] - a zone identifier. As a string, that can be any IANA zone supported by the host environment, or a fixed-offset name of the form 'UTC+3', or the strings 'local' or 'utc'. You may also supply an instance of a {@link DateTime#Zone} class.
     * @param {Object} opts - options
     * @param {boolean} [opts.keepLocalTime=false] - If true, adjust the underlying time so that the local time stays the same, but in the target zone. You should rarely need this.
     * @return {DateTime}
     */
    setZone(n, {
      keepLocalTime: i = !1,
      keepCalendarTime: u = !1
    } = {}) {
      if (n = Ee(n, H.defaultZone), n.equals(this.zone))
        return this;
      if (n.isValid) {
        let h = this.ts;
        if (i || u) {
          const f = n.offset(this.ts), m = this.toObject();
          [h] = jt(m, f, n);
        }
        return xe(this, {
          ts: h,
          zone: n
        });
      } else
        return D.invalid(vt(n));
    }
    /**
     * "Set" the locale, numberingSystem, or outputCalendar. Returns a newly-constructed DateTime.
     * @param {Object} properties - the properties to set
     * @example DateTime.local(2017, 5, 25).reconfigure({ locale: 'en-GB' })
     * @return {DateTime}
     */
    reconfigure({
      locale: n,
      numberingSystem: i,
      outputCalendar: u
    } = {}) {
      const h = this.loc.clone({
        locale: n,
        numberingSystem: i,
        outputCalendar: u
      });
      return xe(this, {
        loc: h
      });
    }
    /**
     * "Set" the locale. Returns a newly-constructed DateTime.
     * Just a convenient alias for reconfigure({ locale })
     * @example DateTime.local(2017, 5, 25).setLocale('en-GB')
     * @return {DateTime}
     */
    setLocale(n) {
      return this.reconfigure({
        locale: n
      });
    }
    /**
     * "Set" the values of specified units. Returns a newly-constructed DateTime.
     * You can only set units with this method; for "setting" metadata, see {@link DateTime#reconfigure} and {@link DateTime#setZone}.
     *
     * This method also supports setting locale-based week units, i.e. `localWeekday`, `localWeekNumber` and `localWeekYear`.
     * They cannot be mixed with ISO-week units like `weekday`.
     * @param {Object} values - a mapping of units to numbers
     * @example dt.set({ year: 2017 })
     * @example dt.set({ hour: 8, minute: 30 })
     * @example dt.set({ weekday: 5 })
     * @example dt.set({ year: 2005, ordinal: 234 })
     * @return {DateTime}
     */
    set(n) {
      if (!this.isValid) return this;
      const i = Vt(n, ms), {
        minDaysInFirstWeek: u,
        startOfWeek: h
      } = Ir(i, this.loc), f = !O(i.weekYear) || !O(i.weekNumber) || !O(i.weekday), m = !O(i.ordinal), y = !O(i.year), b = !O(i.month) || !O(i.day), S = y || b, M = i.weekYear || i.weekNumber;
      if ((S || m) && M)
        throw new a("Can't mix weekYear/weekNumber units with year/month/day or ordinals");
      if (b && m)
        throw new a("Can't mix ordinal dates with month/day");
      let V;
      f ? V = _r({
        ...Rt(this.c, u, h),
        ...i
      }, u, h) : O(i.ordinal) ? (V = {
        ...this.toObject(),
        ...i
      }, O(i.day) && (V.day = Math.min(xt(V.year, V.month), V.day))) : V = Er({
        ...mn(this.c),
        ...i
      });
      const [K, A] = jt(V, this.o, this.zone);
      return xe(this, {
        ts: K,
        o: A
      });
    }
    /**
     * Add a period of time to this DateTime and return the resulting DateTime
     *
     * Adding hours, minutes, seconds, or milliseconds increases the timestamp by the right number of milliseconds. Adding days, months, or years shifts the calendar, accounting for DSTs and leap years along the way. Thus, `dt.plus({ hours: 24 })` may result in a different time than `dt.plus({ days: 1 })` if there's a DST shift in between.
     * @param {Duration|Object|number} duration - The amount to add. Either a Luxon Duration, a number of milliseconds, the object argument to Duration.fromObject()
     * @example DateTime.now().plus(123) //~> in 123 milliseconds
     * @example DateTime.now().plus({ minutes: 15 }) //~> in 15 minutes
     * @example DateTime.now().plus({ days: 1 }) //~> this time tomorrow
     * @example DateTime.now().plus({ days: -1 }) //~> this time yesterday
     * @example DateTime.now().plus({ hours: 3, minutes: 13 }) //~> in 3 hr, 13 min
     * @example DateTime.now().plus(Duration.fromObject({ hours: 3, minutes: 13 })) //~> in 3 hr, 13 min
     * @return {DateTime}
     */
    plus(n) {
      if (!this.isValid) return this;
      const i = B.fromDurationLike(n);
      return xe(this, ls(this, i));
    }
    /**
     * Subtract a period of time to this DateTime and return the resulting DateTime
     * See {@link DateTime#plus}
     * @param {Duration|Object|number} duration - The amount to subtract. Either a Luxon Duration, a number of milliseconds, the object argument to Duration.fromObject()
     @return {DateTime}
     */
    minus(n) {
      if (!this.isValid) return this;
      const i = B.fromDurationLike(n).negate();
      return xe(this, ls(this, i));
    }
    /**
     * "Set" this DateTime to the beginning of a unit of time.
     * @param {string} unit - The unit to go to the beginning of. Can be 'year', 'quarter', 'month', 'week', 'day', 'hour', 'minute', 'second', or 'millisecond'.
     * @param {Object} opts - options
     * @param {boolean} [opts.useLocaleWeeks=false] - If true, use weeks based on the locale, i.e. use the locale-dependent start of the week
     * @example DateTime.local(2014, 3, 3).startOf('month').toISODate(); //=> '2014-03-01'
     * @example DateTime.local(2014, 3, 3).startOf('year').toISODate(); //=> '2014-01-01'
     * @example DateTime.local(2014, 3, 3).startOf('week').toISODate(); //=> '2014-03-03', weeks always start on Mondays
     * @example DateTime.local(2014, 3, 3, 5, 30).startOf('day').toISOTime(); //=> '00:00.000-05:00'
     * @example DateTime.local(2014, 3, 3, 5, 30).startOf('hour').toISOTime(); //=> '05:00:00.000-05:00'
     * @return {DateTime}
     */
    startOf(n, {
      useLocaleWeeks: i = !1
    } = {}) {
      if (!this.isValid) return this;
      const u = {}, h = B.normalizeUnit(n);
      switch (h) {
        case "years":
          u.month = 1;
        // falls through
        case "quarters":
        case "months":
          u.day = 1;
        // falls through
        case "weeks":
        case "days":
          u.hour = 0;
        // falls through
        case "hours":
          u.minute = 0;
        // falls through
        case "minutes":
          u.second = 0;
        // falls through
        case "seconds":
          u.millisecond = 0;
          break;
      }
      if (h === "weeks")
        if (i) {
          const f = this.loc.getStartOfWeek(), {
            weekday: m
          } = this;
          m < f && (u.weekNumber = this.weekNumber - 1), u.weekday = f;
        } else
          u.weekday = 1;
      if (h === "quarters") {
        const f = Math.ceil(this.month / 3);
        u.month = (f - 1) * 3 + 1;
      }
      return this.set(u);
    }
    /**
     * "Set" this DateTime to the end (meaning the last millisecond) of a unit of time
     * @param {string} unit - The unit to go to the end of. Can be 'year', 'quarter', 'month', 'week', 'day', 'hour', 'minute', 'second', or 'millisecond'.
     * @param {Object} opts - options
     * @param {boolean} [opts.useLocaleWeeks=false] - If true, use weeks based on the locale, i.e. use the locale-dependent start of the week
     * @example DateTime.local(2014, 3, 3).endOf('month').toISO(); //=> '2014-03-31T23:59:59.999-05:00'
     * @example DateTime.local(2014, 3, 3).endOf('year').toISO(); //=> '2014-12-31T23:59:59.999-05:00'
     * @example DateTime.local(2014, 3, 3).endOf('week').toISO(); // => '2014-03-09T23:59:59.999-05:00', weeks start on Mondays
     * @example DateTime.local(2014, 3, 3, 5, 30).endOf('day').toISO(); //=> '2014-03-03T23:59:59.999-05:00'
     * @example DateTime.local(2014, 3, 3, 5, 30).endOf('hour').toISO(); //=> '2014-03-03T05:59:59.999-05:00'
     * @return {DateTime}
     */
    endOf(n, i) {
      return this.isValid ? this.plus({
        [n]: 1
      }).startOf(n, i).minus(1) : this;
    }
    // OUTPUT
    /**
     * Returns a string representation of this DateTime formatted according to the specified format string.
     * **You may not want this.** See {@link DateTime#toLocaleString} for a more flexible formatting tool. For a table of tokens and their interpretations, see [here](https://moment.github.io/luxon/#/formatting?id=table-of-tokens).
     * Defaults to en-US if no locale has been specified, regardless of the system's locale.
     * @param {string} fmt - the format string
     * @param {Object} opts - opts to override the configuration options on this DateTime
     * @example DateTime.now().toFormat('yyyy LLL dd') //=> '2017 Apr 22'
     * @example DateTime.now().setLocale('fr').toFormat('yyyy LLL dd') //=> '2017 avr. 22'
     * @example DateTime.now().toFormat('yyyy LLL dd', { locale: "fr" }) //=> '2017 avr. 22'
     * @example DateTime.now().toFormat("HH 'hours and' mm 'minutes'") //=> '20 hours and 55 minutes'
     * @return {string}
     */
    toFormat(n, i = {}) {
      return this.isValid ? ne.create(this.loc.redefaultToEN(i)).formatDateTimeFromString(this, n) : Tn;
    }
    /**
     * Returns a localized string representing this date. Accepts the same options as the Intl.DateTimeFormat constructor and any presets defined by Luxon, such as `DateTime.DATE_FULL` or `DateTime.TIME_SIMPLE`.
     * The exact behavior of this method is browser-specific, but in general it will return an appropriate representation
     * of the DateTime in the assigned locale.
     * Defaults to the system's locale if no locale has been specified
     * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DateTimeFormat
     * @param formatOpts {Object} - Intl.DateTimeFormat constructor options and configuration options
     * @param {Object} opts - opts to override the configuration options on this DateTime
     * @example DateTime.now().toLocaleString(); //=> 4/20/2017
     * @example DateTime.now().setLocale('en-gb').toLocaleString(); //=> '20/04/2017'
     * @example DateTime.now().toLocaleString(DateTime.DATE_FULL); //=> 'April 20, 2017'
     * @example DateTime.now().toLocaleString(DateTime.DATE_FULL, { locale: 'fr' }); //=> '28 août 2022'
     * @example DateTime.now().toLocaleString(DateTime.TIME_SIMPLE); //=> '11:32 AM'
     * @example DateTime.now().toLocaleString(DateTime.DATETIME_SHORT); //=> '4/20/2017, 11:32 AM'
     * @example DateTime.now().toLocaleString({ weekday: 'long', month: 'long', day: '2-digit' }); //=> 'Thursday, April 20'
     * @example DateTime.now().toLocaleString({ weekday: 'short', month: 'short', day: '2-digit', hour: '2-digit', minute: '2-digit' }); //=> 'Thu, Apr 20, 11:27 AM'
     * @example DateTime.now().toLocaleString({ hour: '2-digit', minute: '2-digit', hourCycle: 'h23' }); //=> '11:32'
     * @return {string}
     */
    toLocaleString(n = C, i = {}) {
      return this.isValid ? ne.create(this.loc.clone(i), n).formatDateTime(this) : Tn;
    }
    /**
     * Returns an array of format "parts", meaning individual tokens along with metadata. This is allows callers to post-process individual sections of the formatted output.
     * Defaults to the system's locale if no locale has been specified
     * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DateTimeFormat/formatToParts
     * @param opts {Object} - Intl.DateTimeFormat constructor options, same as `toLocaleString`.
     * @example DateTime.now().toLocaleParts(); //=> [
     *                                   //=>   { type: 'day', value: '25' },
     *                                   //=>   { type: 'literal', value: '/' },
     *                                   //=>   { type: 'month', value: '05' },
     *                                   //=>   { type: 'literal', value: '/' },
     *                                   //=>   { type: 'year', value: '1982' }
     *                                   //=> ]
     */
    toLocaleParts(n = {}) {
      return this.isValid ? ne.create(this.loc.clone(n), n).formatDateTimeParts(this) : [];
    }
    /**
     * Returns an ISO 8601-compliant string representation of this DateTime
     * @param {Object} opts - options
     * @param {boolean} [opts.suppressMilliseconds=false] - exclude milliseconds from the format if they're 0
     * @param {boolean} [opts.suppressSeconds=false] - exclude seconds from the format if they're 0
     * @param {boolean} [opts.includeOffset=true] - include the offset, such as 'Z' or '-04:00'
     * @param {boolean} [opts.extendedZone=false] - add the time zone format extension
     * @param {string} [opts.format='extended'] - choose between the basic and extended format
     * @example DateTime.utc(1983, 5, 25).toISO() //=> '1982-05-25T00:00:00.000Z'
     * @example DateTime.now().toISO() //=> '2017-04-22T20:47:05.335-04:00'
     * @example DateTime.now().toISO({ includeOffset: false }) //=> '2017-04-22T20:47:05.335'
     * @example DateTime.now().toISO({ format: 'basic' }) //=> '20170422T204705.335-0400'
     * @return {string|null}
     */
    toISO({
      format: n = "extended",
      suppressSeconds: i = !1,
      suppressMilliseconds: u = !1,
      includeOffset: h = !0,
      extendedZone: f = !1
    } = {}) {
      if (!this.isValid)
        return null;
      const m = n === "extended";
      let y = In(this, m);
      return y += "T", y += hs(this, m, i, u, h, f), y;
    }
    /**
     * Returns an ISO 8601-compliant string representation of this DateTime's date component
     * @param {Object} opts - options
     * @param {string} [opts.format='extended'] - choose between the basic and extended format
     * @example DateTime.utc(1982, 5, 25).toISODate() //=> '1982-05-25'
     * @example DateTime.utc(1982, 5, 25).toISODate({ format: 'basic' }) //=> '19820525'
     * @return {string|null}
     */
    toISODate({
      format: n = "extended"
    } = {}) {
      return this.isValid ? In(this, n === "extended") : null;
    }
    /**
     * Returns an ISO 8601-compliant string representation of this DateTime's week date
     * @example DateTime.utc(1982, 5, 25).toISOWeekDate() //=> '1982-W21-2'
     * @return {string}
     */
    toISOWeekDate() {
      return qt(this, "kkkk-'W'WW-c");
    }
    /**
     * Returns an ISO 8601-compliant string representation of this DateTime's time component
     * @param {Object} opts - options
     * @param {boolean} [opts.suppressMilliseconds=false] - exclude milliseconds from the format if they're 0
     * @param {boolean} [opts.suppressSeconds=false] - exclude seconds from the format if they're 0
     * @param {boolean} [opts.includeOffset=true] - include the offset, such as 'Z' or '-04:00'
     * @param {boolean} [opts.extendedZone=true] - add the time zone format extension
     * @param {boolean} [opts.includePrefix=false] - include the `T` prefix
     * @param {string} [opts.format='extended'] - choose between the basic and extended format
     * @example DateTime.utc().set({ hour: 7, minute: 34 }).toISOTime() //=> '07:34:19.361Z'
     * @example DateTime.utc().set({ hour: 7, minute: 34, seconds: 0, milliseconds: 0 }).toISOTime({ suppressSeconds: true }) //=> '07:34Z'
     * @example DateTime.utc().set({ hour: 7, minute: 34 }).toISOTime({ format: 'basic' }) //=> '073419.361Z'
     * @example DateTime.utc().set({ hour: 7, minute: 34 }).toISOTime({ includePrefix: true }) //=> 'T07:34:19.361Z'
     * @return {string}
     */
    toISOTime({
      suppressMilliseconds: n = !1,
      suppressSeconds: i = !1,
      includeOffset: u = !0,
      includePrefix: h = !1,
      extendedZone: f = !1,
      format: m = "extended"
    } = {}) {
      return this.isValid ? (h ? "T" : "") + hs(this, m === "extended", i, n, u, f) : null;
    }
    /**
     * Returns an RFC 2822-compatible string representation of this DateTime
     * @example DateTime.utc(2014, 7, 13).toRFC2822() //=> 'Sun, 13 Jul 2014 00:00:00 +0000'
     * @example DateTime.local(2014, 7, 13).toRFC2822() //=> 'Sun, 13 Jul 2014 00:00:00 -0400'
     * @return {string}
     */
    toRFC2822() {
      return qt(this, "EEE, dd LLL yyyy HH:mm:ss ZZZ", !1);
    }
    /**
     * Returns a string representation of this DateTime appropriate for use in HTTP headers. The output is always expressed in GMT.
     * Specifically, the string conforms to RFC 1123.
     * @see https://www.w3.org/Protocols/rfc2616/rfc2616-sec3.html#sec3.3.1
     * @example DateTime.utc(2014, 7, 13).toHTTP() //=> 'Sun, 13 Jul 2014 00:00:00 GMT'
     * @example DateTime.utc(2014, 7, 13, 19).toHTTP() //=> 'Sun, 13 Jul 2014 19:00:00 GMT'
     * @return {string}
     */
    toHTTP() {
      return qt(this.toUTC(), "EEE, dd LLL yyyy HH:mm:ss 'GMT'");
    }
    /**
     * Returns a string representation of this DateTime appropriate for use in SQL Date
     * @example DateTime.utc(2014, 7, 13).toSQLDate() //=> '2014-07-13'
     * @return {string|null}
     */
    toSQLDate() {
      return this.isValid ? In(this, !0) : null;
    }
    /**
     * Returns a string representation of this DateTime appropriate for use in SQL Time
     * @param {Object} opts - options
     * @param {boolean} [opts.includeZone=false] - include the zone, such as 'America/New_York'. Overrides includeOffset.
     * @param {boolean} [opts.includeOffset=true] - include the offset, such as 'Z' or '-04:00'
     * @param {boolean} [opts.includeOffsetSpace=true] - include the space between the time and the offset, such as '05:15:16.345 -04:00'
     * @example DateTime.utc().toSQL() //=> '05:15:16.345'
     * @example DateTime.now().toSQL() //=> '05:15:16.345 -04:00'
     * @example DateTime.now().toSQL({ includeOffset: false }) //=> '05:15:16.345'
     * @example DateTime.now().toSQL({ includeZone: false }) //=> '05:15:16.345 America/New_York'
     * @return {string}
     */
    toSQLTime({
      includeOffset: n = !0,
      includeZone: i = !1,
      includeOffsetSpace: u = !0
    } = {}) {
      let h = "HH:mm:ss.SSS";
      return (i || n) && (u && (h += " "), i ? h += "z" : n && (h += "ZZ")), qt(this, h, !0);
    }
    /**
     * Returns a string representation of this DateTime appropriate for use in SQL DateTime
     * @param {Object} opts - options
     * @param {boolean} [opts.includeZone=false] - include the zone, such as 'America/New_York'. Overrides includeOffset.
     * @param {boolean} [opts.includeOffset=true] - include the offset, such as 'Z' or '-04:00'
     * @param {boolean} [opts.includeOffsetSpace=true] - include the space between the time and the offset, such as '05:15:16.345 -04:00'
     * @example DateTime.utc(2014, 7, 13).toSQL() //=> '2014-07-13 00:00:00.000 Z'
     * @example DateTime.local(2014, 7, 13).toSQL() //=> '2014-07-13 00:00:00.000 -04:00'
     * @example DateTime.local(2014, 7, 13).toSQL({ includeOffset: false }) //=> '2014-07-13 00:00:00.000'
     * @example DateTime.local(2014, 7, 13).toSQL({ includeZone: true }) //=> '2014-07-13 00:00:00.000 America/New_York'
     * @return {string}
     */
    toSQL(n = {}) {
      return this.isValid ? `${this.toSQLDate()} ${this.toSQLTime(n)}` : null;
    }
    /**
     * Returns a string representation of this DateTime appropriate for debugging
     * @return {string}
     */
    toString() {
      return this.isValid ? this.toISO() : Tn;
    }
    /**
     * Returns a string representation of this DateTime appropriate for the REPL.
     * @return {string}
     */
    [Symbol.for("nodejs.util.inspect.custom")]() {
      return this.isValid ? `DateTime { ts: ${this.toISO()}, zone: ${this.zone.name}, locale: ${this.locale} }` : `DateTime { Invalid, reason: ${this.invalidReason} }`;
    }
    /**
     * Returns the epoch milliseconds of this DateTime. Alias of {@link DateTime#toMillis}
     * @return {number}
     */
    valueOf() {
      return this.toMillis();
    }
    /**
     * Returns the epoch milliseconds of this DateTime.
     * @return {number}
     */
    toMillis() {
      return this.isValid ? this.ts : NaN;
    }
    /**
     * Returns the epoch seconds (including milliseconds in the fractional part) of this DateTime.
     * @return {number}
     */
    toSeconds() {
      return this.isValid ? this.ts / 1e3 : NaN;
    }
    /**
     * Returns the epoch seconds (as a whole number) of this DateTime.
     * @return {number}
     */
    toUnixInteger() {
      return this.isValid ? Math.floor(this.ts / 1e3) : NaN;
    }
    /**
     * Returns an ISO 8601 representation of this DateTime appropriate for use in JSON.
     * @return {string}
     */
    toJSON() {
      return this.toISO();
    }
    /**
     * Returns a BSON serializable equivalent to this DateTime.
     * @return {Date}
     */
    toBSON() {
      return this.toJSDate();
    }
    /**
     * Returns a JavaScript object with this DateTime's year, month, day, and so on.
     * @param opts - options for generating the object
     * @param {boolean} [opts.includeConfig=false] - include configuration attributes in the output
     * @example DateTime.now().toObject() //=> { year: 2017, month: 4, day: 22, hour: 20, minute: 49, second: 42, millisecond: 268 }
     * @return {Object}
     */
    toObject(n = {}) {
      if (!this.isValid) return {};
      const i = {
        ...this.c
      };
      return n.includeConfig && (i.outputCalendar = this.outputCalendar, i.numberingSystem = this.loc.numberingSystem, i.locale = this.loc.locale), i;
    }
    /**
     * Returns a JavaScript Date equivalent to this DateTime.
     * @return {Date}
     */
    toJSDate() {
      return new Date(this.isValid ? this.ts : NaN);
    }
    // COMPARE
    /**
     * Return the difference between two DateTimes as a Duration.
     * @param {DateTime} otherDateTime - the DateTime to compare this one to
     * @param {string|string[]} [unit=['milliseconds']] - the unit or array of units (such as 'hours' or 'days') to include in the duration.
     * @param {Object} opts - options that affect the creation of the Duration
     * @param {string} [opts.conversionAccuracy='casual'] - the conversion system to use
     * @example
     * var i1 = DateTime.fromISO('1982-05-25T09:45'),
     *     i2 = DateTime.fromISO('1983-10-14T10:30');
     * i2.diff(i1).toObject() //=> { milliseconds: 43807500000 }
     * i2.diff(i1, 'hours').toObject() //=> { hours: 12168.75 }
     * i2.diff(i1, ['months', 'days']).toObject() //=> { months: 16, days: 19.03125 }
     * i2.diff(i1, ['months', 'days', 'hours']).toObject() //=> { months: 16, days: 19, hours: 0.75 }
     * @return {Duration}
     */
    diff(n, i = "milliseconds", u = {}) {
      if (!this.isValid || !n.isValid)
        return B.invalid("created by diffing an invalid DateTime");
      const h = {
        locale: this.locale,
        numberingSystem: this.numberingSystem,
        ...u
      }, f = da(i).map(B.normalizeUnit), m = n.valueOf() > this.valueOf(), y = m ? this : n, b = m ? n : this, S = yo(y, b, f, h);
      return m ? S.negate() : S;
    }
    /**
     * Return the difference between this DateTime and right now.
     * See {@link DateTime#diff}
     * @param {string|string[]} [unit=['milliseconds']] - the unit or units units (such as 'hours' or 'days') to include in the duration
     * @param {Object} opts - options that affect the creation of the Duration
     * @param {string} [opts.conversionAccuracy='casual'] - the conversion system to use
     * @return {Duration}
     */
    diffNow(n = "milliseconds", i = {}) {
      return this.diff(D.now(), n, i);
    }
    /**
     * Return an Interval spanning between this DateTime and another DateTime
     * @param {DateTime} otherDateTime - the other end point of the Interval
     * @return {Interval|DateTime}
     */
    until(n) {
      return this.isValid ? z.fromDateTimes(this, n) : this;
    }
    /**
     * Return whether this DateTime is in the same unit of time as another DateTime.
     * Higher-order units must also be identical for this function to return `true`.
     * Note that time zones are **ignored** in this comparison, which compares the **local** calendar time. Use {@link DateTime#setZone} to convert one of the dates if needed.
     * @param {DateTime} otherDateTime - the other DateTime
     * @param {string} unit - the unit of time to check sameness on
     * @param {Object} opts - options
     * @param {boolean} [opts.useLocaleWeeks=false] - If true, use weeks based on the locale, i.e. use the locale-dependent start of the week; only the locale of this DateTime is used
     * @example DateTime.now().hasSame(otherDT, 'day'); //~> true if otherDT is in the same current calendar day
     * @return {boolean}
     */
    hasSame(n, i, u) {
      if (!this.isValid) return !1;
      const h = n.valueOf(), f = this.setZone(n.zone, {
        keepLocalTime: !0
      });
      return f.startOf(i, u) <= h && h <= f.endOf(i, u);
    }
    /**
     * Equality check
     * Two DateTimes are equal if and only if they represent the same millisecond, have the same zone and location, and are both valid.
     * To compare just the millisecond values, use `+dt1 === +dt2`.
     * @param {DateTime} other - the other DateTime
     * @return {boolean}
     */
    equals(n) {
      return this.isValid && n.isValid && this.valueOf() === n.valueOf() && this.zone.equals(n.zone) && this.loc.equals(n.loc);
    }
    /**
     * Returns a string representation of a this time relative to now, such as "in two days". Can only internationalize if your
     * platform supports Intl.RelativeTimeFormat. Rounds down by default.
     * @param {Object} options - options that affect the output
     * @param {DateTime} [options.base=DateTime.now()] - the DateTime to use as the basis to which this time is compared. Defaults to now.
     * @param {string} [options.style="long"] - the style of units, must be "long", "short", or "narrow"
     * @param {string|string[]} options.unit - use a specific unit or array of units; if omitted, or an array, the method will pick the best unit. Use an array or one of "years", "quarters", "months", "weeks", "days", "hours", "minutes", or "seconds"
     * @param {boolean} [options.round=true] - whether to round the numbers in the output.
     * @param {number} [options.padding=0] - padding in milliseconds. This allows you to round up the result if it fits inside the threshold. Don't use in combination with {round: false} because the decimal output will include the padding.
     * @param {string} options.locale - override the locale of this DateTime
     * @param {string} options.numberingSystem - override the numberingSystem of this DateTime. The Intl system may choose not to honor this
     * @example DateTime.now().plus({ days: 1 }).toRelative() //=> "in 1 day"
     * @example DateTime.now().setLocale("es").toRelative({ days: 1 }) //=> "dentro de 1 día"
     * @example DateTime.now().plus({ days: 1 }).toRelative({ locale: "fr" }) //=> "dans 23 heures"
     * @example DateTime.now().minus({ days: 2 }).toRelative() //=> "2 days ago"
     * @example DateTime.now().minus({ days: 2 }).toRelative({ unit: "hours" }) //=> "48 hours ago"
     * @example DateTime.now().minus({ hours: 36 }).toRelative({ round: false }) //=> "1.5 days ago"
     */
    toRelative(n = {}) {
      if (!this.isValid) return null;
      const i = n.base || D.fromObject({}, {
        zone: this.zone
      }), u = n.padding ? this < i ? -n.padding : n.padding : 0;
      let h = ["years", "months", "days", "hours", "minutes", "seconds"], f = n.unit;
      return Array.isArray(n.unit) && (h = n.unit, f = void 0), gs(i, this.plus(u), {
        ...n,
        numeric: "always",
        units: h,
        unit: f
      });
    }
    /**
     * Returns a string representation of this date relative to today, such as "yesterday" or "next month".
     * Only internationalizes on platforms that supports Intl.RelativeTimeFormat.
     * @param {Object} options - options that affect the output
     * @param {DateTime} [options.base=DateTime.now()] - the DateTime to use as the basis to which this time is compared. Defaults to now.
     * @param {string} options.locale - override the locale of this DateTime
     * @param {string} options.unit - use a specific unit; if omitted, the method will pick the unit. Use one of "years", "quarters", "months", "weeks", or "days"
     * @param {string} options.numberingSystem - override the numberingSystem of this DateTime. The Intl system may choose not to honor this
     * @example DateTime.now().plus({ days: 1 }).toRelativeCalendar() //=> "tomorrow"
     * @example DateTime.now().setLocale("es").plus({ days: 1 }).toRelative() //=> ""mañana"
     * @example DateTime.now().plus({ days: 1 }).toRelativeCalendar({ locale: "fr" }) //=> "demain"
     * @example DateTime.now().minus({ days: 2 }).toRelativeCalendar() //=> "2 days ago"
     */
    toRelativeCalendar(n = {}) {
      return this.isValid ? gs(n.base || D.fromObject({}, {
        zone: this.zone
      }), this, {
        ...n,
        numeric: "auto",
        units: ["years", "months", "days"],
        calendary: !0
      }) : null;
    }
    /**
     * Return the min of several date times
     * @param {...DateTime} dateTimes - the DateTimes from which to choose the minimum
     * @return {DateTime} the min DateTime, or undefined if called with no argument
     */
    static min(...n) {
      if (!n.every(D.isDateTime))
        throw new l("min requires all arguments be DateTimes");
      return Ar(n, (i) => i.valueOf(), Math.min);
    }
    /**
     * Return the max of several date times
     * @param {...DateTime} dateTimes - the DateTimes from which to choose the maximum
     * @return {DateTime} the max DateTime, or undefined if called with no argument
     */
    static max(...n) {
      if (!n.every(D.isDateTime))
        throw new l("max requires all arguments be DateTimes");
      return Ar(n, (i) => i.valueOf(), Math.max);
    }
    // MISC
    /**
     * Explain how a string would be parsed by fromFormat()
     * @param {string} text - the string to parse
     * @param {string} fmt - the format the string is expected to be in (see description)
     * @param {Object} options - options taken by fromFormat()
     * @return {Object}
     */
    static fromFormatExplain(n, i, u = {}) {
      const {
        locale: h = null,
        numberingSystem: f = null
      } = u, m = W.fromOpts({
        locale: h,
        numberingSystem: f,
        defaultToEN: !0
      });
      return os(m, n, i);
    }
    /**
     * @deprecated use fromFormatExplain instead
     */
    static fromStringExplain(n, i, u = {}) {
      return D.fromFormatExplain(n, i, u);
    }
    /**
     * Build a parser for `fmt` using the given locale. This parser can be passed
     * to {@link DateTime.fromFormatParser} to a parse a date in this format. This
     * can be used to optimize cases where many dates need to be parsed in a
     * specific format.
     *
     * @param {String} fmt - the format the string is expected to be in (see
     * description)
     * @param {Object} options - options used to set locale and numberingSystem
     * for parser
     * @returns {TokenParser} - opaque object to be used
     */
    static buildFormatParser(n, i = {}) {
      const {
        locale: u = null,
        numberingSystem: h = null
      } = i, f = W.fromOpts({
        locale: u,
        numberingSystem: h,
        defaultToEN: !0
      });
      return new as(f, n);
    }
    /**
     * Create a DateTime from an input string and format parser.
     *
     * The format parser must have been created with the same locale as this call.
     *
     * @param {String} text - the string to parse
     * @param {TokenParser} formatParser - parser from {@link DateTime.buildFormatParser}
     * @param {Object} opts - options taken by fromFormat()
     * @returns {DateTime}
     */
    static fromFormatParser(n, i, u = {}) {
      if (O(n) || O(i))
        throw new l("fromFormatParser requires an input string and a format parser");
      const {
        locale: h = null,
        numberingSystem: f = null
      } = u, m = W.fromOpts({
        locale: h,
        numberingSystem: f,
        defaultToEN: !0
      });
      if (!m.equals(i.locale))
        throw new l(`fromFormatParser called with a locale of ${m}, but the format parser was created for ${i.locale}`);
      const {
        result: y,
        zone: b,
        specificOffset: S,
        invalidReason: M
      } = i.explainFromTokens(n);
      return M ? D.invalid(M) : nt(y, b, u, `format ${i.format}`, n, S);
    }
    // FORMAT PRESETS
    /**
     * {@link DateTime#toLocaleString} format like 10/14/1983
     * @type {Object}
     */
    static get DATE_SHORT() {
      return C;
    }
    /**
     * {@link DateTime#toLocaleString} format like 'Oct 14, 1983'
     * @type {Object}
     */
    static get DATE_MED() {
      return _;
    }
    /**
     * {@link DateTime#toLocaleString} format like 'Fri, Oct 14, 1983'
     * @type {Object}
     */
    static get DATE_MED_WITH_WEEKDAY() {
      return N;
    }
    /**
     * {@link DateTime#toLocaleString} format like 'October 14, 1983'
     * @type {Object}
     */
    static get DATE_FULL() {
      return E;
    }
    /**
     * {@link DateTime#toLocaleString} format like 'Tuesday, October 14, 1983'
     * @type {Object}
     */
    static get DATE_HUGE() {
      return k;
    }
    /**
     * {@link DateTime#toLocaleString} format like '09:30 AM'. Only 12-hour if the locale is.
     * @type {Object}
     */
    static get TIME_SIMPLE() {
      return L;
    }
    /**
     * {@link DateTime#toLocaleString} format like '09:30:23 AM'. Only 12-hour if the locale is.
     * @type {Object}
     */
    static get TIME_WITH_SECONDS() {
      return x;
    }
    /**
     * {@link DateTime#toLocaleString} format like '09:30:23 AM EDT'. Only 12-hour if the locale is.
     * @type {Object}
     */
    static get TIME_WITH_SHORT_OFFSET() {
      return J;
    }
    /**
     * {@link DateTime#toLocaleString} format like '09:30:23 AM Eastern Daylight Time'. Only 12-hour if the locale is.
     * @type {Object}
     */
    static get TIME_WITH_LONG_OFFSET() {
      return ee;
    }
    /**
     * {@link DateTime#toLocaleString} format like '09:30', always 24-hour.
     * @type {Object}
     */
    static get TIME_24_SIMPLE() {
      return F;
    }
    /**
     * {@link DateTime#toLocaleString} format like '09:30:23', always 24-hour.
     * @type {Object}
     */
    static get TIME_24_WITH_SECONDS() {
      return T;
    }
    /**
     * {@link DateTime#toLocaleString} format like '09:30:23 EDT', always 24-hour.
     * @type {Object}
     */
    static get TIME_24_WITH_SHORT_OFFSET() {
      return $;
    }
    /**
     * {@link DateTime#toLocaleString} format like '09:30:23 Eastern Daylight Time', always 24-hour.
     * @type {Object}
     */
    static get TIME_24_WITH_LONG_OFFSET() {
      return R;
    }
    /**
     * {@link DateTime#toLocaleString} format like '10/14/1983, 9:30 AM'. Only 12-hour if the locale is.
     * @type {Object}
     */
    static get DATETIME_SHORT() {
      return j;
    }
    /**
     * {@link DateTime#toLocaleString} format like '10/14/1983, 9:30:33 AM'. Only 12-hour if the locale is.
     * @type {Object}
     */
    static get DATETIME_SHORT_WITH_SECONDS() {
      return Y;
    }
    /**
     * {@link DateTime#toLocaleString} format like 'Oct 14, 1983, 9:30 AM'. Only 12-hour if the locale is.
     * @type {Object}
     */
    static get DATETIME_MED() {
      return P;
    }
    /**
     * {@link DateTime#toLocaleString} format like 'Oct 14, 1983, 9:30:33 AM'. Only 12-hour if the locale is.
     * @type {Object}
     */
    static get DATETIME_MED_WITH_SECONDS() {
      return q;
    }
    /**
     * {@link DateTime#toLocaleString} format like 'Fri, 14 Oct 1983, 9:30 AM'. Only 12-hour if the locale is.
     * @type {Object}
     */
    static get DATETIME_MED_WITH_WEEKDAY() {
      return Z;
    }
    /**
     * {@link DateTime#toLocaleString} format like 'October 14, 1983, 9:30 AM EDT'. Only 12-hour if the locale is.
     * @type {Object}
     */
    static get DATETIME_FULL() {
      return re;
    }
    /**
     * {@link DateTime#toLocaleString} format like 'October 14, 1983, 9:30:33 AM EDT'. Only 12-hour if the locale is.
     * @type {Object}
     */
    static get DATETIME_FULL_WITH_SECONDS() {
      return ve;
    }
    /**
     * {@link DateTime#toLocaleString} format like 'Friday, October 14, 1983, 9:30 AM Eastern Daylight Time'. Only 12-hour if the locale is.
     * @type {Object}
     */
    static get DATETIME_HUGE() {
      return _e;
    }
    /**
     * {@link DateTime#toLocaleString} format like 'Friday, October 14, 1983, 9:30:33 AM Eastern Daylight Time'. Only 12-hour if the locale is.
     * @type {Object}
     */
    static get DATETIME_HUGE_WITH_SECONDS() {
      return ar;
    }
  }
  function St(o) {
    if (D.isDateTime(o))
      return o;
    if (o && o.valueOf && Ie(o.valueOf()))
      return D.fromJSDate(o);
    if (o && typeof o == "object")
      return D.fromObject(o);
    throw new l(`Unknown datetime argument: ${o}, of type ${typeof o}`);
  }
  const Lo = "3.6.1";
  return ie.DateTime = D, ie.Duration = B, ie.FixedOffsetZone = te, ie.IANAZone = me, ie.Info = bt, ie.Interval = z, ie.InvalidZone = lr, ie.Settings = H, ie.SystemZone = dt, ie.VERSION = Lo, ie.Zone = He, ie;
}
var $n = {}, zs;
function Xc() {
  return zs || (zs = 1, function(s) {
    Object.defineProperty(s, "__esModule", { value: !0 }), s.RE_RANGE = s.RE_WILDCARDS = s.PRESETS = s.TIME_UNITS_LEN = s.TIME_UNITS = s.TIME_UNITS_MAP = s.ALIASES = s.PARSE_DEFAULTS = s.CONSTRAINTS = void 0, s.CONSTRAINTS = Object.freeze({
      second: [0, 59],
      minute: [0, 59],
      hour: [0, 23],
      dayOfMonth: [1, 31],
      month: [1, 12],
      dayOfWeek: [0, 7]
    }), s.PARSE_DEFAULTS = Object.freeze({
      second: "0",
      minute: "*",
      hour: "*",
      dayOfMonth: "*",
      month: "*",
      dayOfWeek: "*"
    }), s.ALIASES = Object.freeze({
      jan: 1,
      feb: 2,
      mar: 3,
      apr: 4,
      may: 5,
      jun: 6,
      jul: 7,
      aug: 8,
      sep: 9,
      oct: 10,
      nov: 11,
      dec: 12,
      sun: 0,
      mon: 1,
      tue: 2,
      wed: 3,
      thu: 4,
      fri: 5,
      sat: 6
    }), s.TIME_UNITS_MAP = Object.freeze({
      SECOND: "second",
      MINUTE: "minute",
      HOUR: "hour",
      DAY_OF_MONTH: "dayOfMonth",
      MONTH: "month",
      DAY_OF_WEEK: "dayOfWeek"
    }), s.TIME_UNITS = Object.freeze(Object.values(s.TIME_UNITS_MAP)), s.TIME_UNITS_LEN = s.TIME_UNITS.length, s.PRESETS = Object.freeze({
      "@yearly": "0 0 0 1 1 *",
      "@monthly": "0 0 0 1 * *",
      "@weekly": "0 0 0 * * 0",
      "@daily": "0 0 0 * * *",
      "@hourly": "0 0 * * * *",
      "@minutely": "0 * * * * *",
      "@secondly": "* * * * * *",
      "@weekdays": "0 0 0 * * 1-5",
      "@weekends": "0 0 0 * * 0,6"
    }), s.RE_WILDCARDS = /\*/g, s.RE_RANGE = /^(\d+)(?:-(\d+))?(?:\/(\d+))?$/g;
  }($n)), $n;
}
var Ve = {}, Ys;
function Ai() {
  if (Ys) return Ve;
  Ys = 1, Object.defineProperty(Ve, "__esModule", { value: !0 }), Ve.ExclusiveParametersError = Ve.CronError = void 0;
  class s extends Error {
  }
  Ve.CronError = s;
  class e extends s {
    constructor(r, a) {
      super(`You can't specify both ${r} and ${a}`);
    }
  }
  return Ve.ExclusiveParametersError = e, Ve;
}
var Zs;
function Zn() {
  if (Zs) return kt;
  Zs = 1, Object.defineProperty(kt, "__esModule", { value: !0 }), kt.CronTime = void 0;
  const s = /* @__PURE__ */ Jc(), e = Xc(), t = Ai();
  class r {
    constructor(c, l, p) {
      if (this.realDate = !1, this.second = {}, this.minute = {}, this.hour = {}, this.dayOfMonth = {}, this.month = {}, this.dayOfWeek = {}, l != null && p != null)
        throw new t.ExclusiveParametersError("timeZone", "utcOffset");
      if (l) {
        if (!s.DateTime.fromObject({}, { zone: l }).isValid)
          throw new t.CronError("Invalid timezone.");
        this.timeZone = l;
      }
      if (p != null && (this.utcOffset = p), l == null && p == null) {
        const d = Intl.DateTimeFormat().resolvedOptions().timeZone;
        this.timeZone = d;
      }
      c instanceof Date || c instanceof s.DateTime ? (this.source = c instanceof Date ? s.DateTime.fromJSDate(c) : c, this.realDate = !0) : (this.source = c, this._parse(this.source));
    }
    static validateCronExpression(c) {
      try {
        return new r(c), {
          valid: !0
        };
      } catch (l) {
        return {
          valid: !1,
          error: l
        };
      }
    }
    _getWeekDay(c) {
      return c.weekday === 7 ? 0 : c.weekday;
    }
    sendAt(c) {
      let l = this.realDate && this.source instanceof s.DateTime ? this.source : s.DateTime.utc();
      if (this.timeZone && (l = l.setZone(this.timeZone)), this.utcOffset !== void 0) {
        const p = this.utcOffset < 0 ? "-" : "+", d = Math.trunc(this.utcOffset / 60), g = String(Math.abs(d)).padStart(2, "0"), v = Math.abs(this.utcOffset - d * 60), C = String(v).padStart(2, "0"), _ = `UTC${p}${g}:${C}`;
        if (l = l.setZone(_), !l.isValid)
          throw new t.CronError("ERROR: You specified an invalid UTC offset.");
      }
      if (this.realDate) {
        if (s.DateTime.local() > l)
          throw new t.CronError("WARNING: Date in past. Will never be fired.");
        return l;
      }
      if (c === void 0 || isNaN(c) || c < 0)
        return this.getNextDateFrom(l);
      {
        const p = [];
        for (; c > 0; c--)
          l = this.getNextDateFrom(l), p.push(l);
        return p;
      }
    }
    getTimeout() {
      return this.sendAt().toMillis() - s.DateTime.local().toMillis();
    }
    toString() {
      return this.toJSON().join(" ");
    }
    toJSON() {
      return e.TIME_UNITS.map((c) => this._wcOrAll(c));
    }
    getNextDateFrom(c, l) {
      var p, d;
      c instanceof Date && (c = s.DateTime.fromJSDate(c)), l ? c = c.setZone(l) : l = (p = c.zone.zoneName) !== null && p !== void 0 ? p : c.zone.fixed;
      let g = s.DateTime.fromFormat(`${c.year}-${c.month}-${c.day} ${c.hour}:${c.minute}:${c.second}`, "yyyy-M-d H:m:s", {
        zone: "UTC"
      });
      const v = g.toMillis();
      if (this.realDate || g.millisecond > 0 && (g = g.set({ millisecond: 0, second: g.second + 1 })), !g.isValid)
        throw new t.CronError("ERROR: You specified an invalid date.");
      const C = s.DateTime.now().plus({ years: 8 });
      for (; ; ) {
        if (g > C)
          throw new t.CronError(`Something went wrong. No execution date was found in the next 8 years.
							Please provide the following string if you would like to help debug:
							Time Zone: ${(d = l == null ? void 0 : l.toString()) !== null && d !== void 0 ? d : '""'} - Cron String: ${this.source.toString()} - UTC offset: ${g.offset} - current Date: ${s.DateTime.local().toString()}`);
        if (!(g.month in this.month) && Object.keys(this.month).length !== 12) {
          g = g.plus({ month: 1 }), g = g.set({ day: 1, hour: 0, minute: 0, second: 0 });
          continue;
        }
        if (!(g.day in this.dayOfMonth) && Object.keys(this.dayOfMonth).length !== 31 && !(this._getWeekDay(g) in this.dayOfWeek && Object.keys(this.dayOfWeek).length !== 7) || !(this._getWeekDay(g) in this.dayOfWeek) && Object.keys(this.dayOfWeek).length !== 7 && !(g.day in this.dayOfMonth && Object.keys(this.dayOfMonth).length !== 31)) {
          g = g.plus({ days: 1 }), g = g.set({ hour: 0, minute: 0, second: 0 });
          continue;
        }
        if (!(g.hour in this.hour) && Object.keys(this.hour).length !== 24) {
          g = g.plus({ hour: 1 }), g = g.set({ minute: 0, second: 0 });
          continue;
        }
        if (!(g.minute in this.minute) && Object.keys(this.minute).length !== 60) {
          g = g.plus({ minute: 1 }), g = g.set({ second: 0 });
          continue;
        }
        if (g.toMillis() === v || !(g.second in this.second) && Object.keys(this.second).length !== 60) {
          g = g.plus({ second: 1 });
          continue;
        }
        break;
      }
      const _ = g.hour, N = g.minute;
      g = s.DateTime.fromFormat(`${g.year}-${g.month}-${g.day} ${g.hour}:${g.minute}:${g.second}`, "yyyy-M-d H:m:s", {
        zone: l
      });
      const E = s.DateTime.fromFormat(`${g.year}-1-1 0:0:0`, "yyyy-M-d H:m:s", { zone: l });
      if ((_ !== g.hour || N !== g.minute) && E.offset !== g.offset) {
        for (; g.minus({ minute: 1 }).offset !== E.offset; )
          g = g.minus({ minute: 1 });
        return g;
      }
      const k = g.minus({ hour: 1 }), L = g.minus({ hour: 2 });
      (k.hour === g.hour || L.hour === k.hour) && k > c && (g = k);
      const x = g.minus({ minute: 30 });
      return (x.minute === g.minute || k.minute === x.minute) && x > c && (g = x), g;
    }
    _wcOrAll(c) {
      if (this._hasAll(c))
        return "*";
      const l = [];
      for (const p in this[c])
        l.push(p);
      return l.join(",");
    }
    _hasAll(c) {
      const l = e.CONSTRAINTS[c], p = l[0], d = c === e.TIME_UNITS_MAP.DAY_OF_WEEK ? l[1] - 1 : l[1];
      for (let g = p, v = d; g < v; g++)
        if (!(g in this[c]))
          return !1;
      return !0;
    }
    _parse(c) {
      var l;
      c = c.toLowerCase(), Object.keys(e.PRESETS).includes(c) && (c = e.PRESETS[c]), c = c.replace(/[a-z]{1,3}/gi, (g) => {
        if (Object.keys(e.ALIASES).includes(g))
          return e.ALIASES[g].toString();
        throw new t.CronError(`Unknown alias: ${g}`);
      });
      const p = c.trim().split(/\s+/);
      if (p.length < e.TIME_UNITS_LEN - 1)
        throw new t.CronError("Too few fields");
      if (p.length > e.TIME_UNITS_LEN)
        throw new t.CronError("Too many fields");
      const d = p.length;
      for (const g of e.TIME_UNITS) {
        const v = e.TIME_UNITS.indexOf(g), C = (l = p[v - (e.TIME_UNITS_LEN - d)]) !== null && l !== void 0 ? l : e.PARSE_DEFAULTS[g];
        this._parseField(C, g);
      }
    }
    _parseField(c, l) {
      const p = this[l];
      let d;
      const g = e.CONSTRAINTS[l], v = g[0], C = g[1];
      c.split(",").forEach((E) => {
        const k = E.indexOf("*");
        if (k !== -1 && k !== 0)
          throw new t.CronError(`Field (${E}) has an invalid wildcard expression`);
      }), c = c.replace(e.RE_WILDCARDS, `${v}-${C}`);
      const N = c.split(",");
      for (const E of N) {
        const k = [...E.matchAll(e.RE_RANGE)][0];
        if ((k == null ? void 0 : k[1]) !== void 0) {
          const [, L, x, J] = k;
          let ee = parseInt(L, 10), F = x !== void 0 ? parseInt(x, 10) : void 0;
          const T = J !== void 0, $ = parseInt(J ?? "1", 10);
          if ($ === 0)
            throw new t.CronError(`Field (${l}) has a step of zero`);
          if (F !== void 0 && ee > F)
            throw new t.CronError(`Field (${l}) has an invalid range`);
          if (ee < v || F !== void 0 && F > C || F === void 0 && ee > C)
            throw new t.CronError(`Field value (${c}) is out of range`);
          ee = Math.min(Math.max(v, ~~Math.abs(ee)), C), F !== void 0 ? F = Math.min(C, ~~Math.abs(F)) : F = T ? C : ee, d = ee;
          do
            p[d] = !0, d += $;
          while (d <= F);
          l === "dayOfWeek" && (!p[0] && p[7] && (p[0] = p[7]), delete p[7]);
        } else
          throw new t.CronError(`Field (${l}) cannot be parsed`);
      }
    }
  }
  return kt.CronTime = r, kt;
}
var Be = {}, Ks;
function el() {
  if (Ks) return Be;
  Ks = 1;
  var s = Be && Be.__awaiter || function(c, l, p, d) {
    function g(v) {
      return v instanceof p ? v : new p(function(C) {
        C(v);
      });
    }
    return new (p || (p = Promise))(function(v, C) {
      function _(k) {
        try {
          E(d.next(k));
        } catch (L) {
          C(L);
        }
      }
      function N(k) {
        try {
          E(d.throw(k));
        } catch (L) {
          C(L);
        }
      }
      function E(k) {
        k.done ? v(k.value) : g(k.value).then(_, N);
      }
      E((d = d.apply(c, l || [])).next());
    });
  };
  Object.defineProperty(Be, "__esModule", { value: !0 }), Be.CronJob = void 0;
  const e = Mt, t = Ai(), r = Zn();
  class a {
    get isActive() {
      return this._isActive;
    }
    get isCallbackRunning() {
      return this._isCallbackRunning;
    }
    constructor(l, p, d, g, v, C, _, N, E, k, L, x, J) {
      if (this.unrefTimeout = !1, this.lastExecution = null, this.runOnce = !1, this.waitForCompletion = !1, this.threshold = 250, this._isActive = !1, this._isCallbackRunning = !1, this._callbacks = [], this.context = C ?? this, this.waitForCompletion = !!k, this.errorHandler = L, v != null && N != null)
        throw new t.ExclusiveParametersError("timeZone", "utcOffset");
      v != null ? this.cronTime = new r.CronTime(l, v, null) : N != null ? this.cronTime = new r.CronTime(l, null, N) : this.cronTime = new r.CronTime(l, v, N), E != null && (this.unrefTimeout = E), d != null && (this.onComplete = this._fnWrap(d)), J != null && (this.threshold = Math.abs(J)), x != null && (this.name = x), this.cronTime.realDate && (this.runOnce = !0), this.addCallback(this._fnWrap(p)), _ && (this.lastExecution = /* @__PURE__ */ new Date(), this.fireOnTick()), g && this.start();
    }
    static from(l) {
      if (l.timeZone != null && l.utcOffset != null)
        throw new t.ExclusiveParametersError("timeZone", "utcOffset");
      return l.timeZone != null ? new a(l.cronTime, l.onTick, l.onComplete, l.start, l.timeZone, l.context, l.runOnInit, l.utcOffset, l.unrefTimeout, l.waitForCompletion, l.errorHandler, l.name, l.threshold) : l.utcOffset != null ? new a(l.cronTime, l.onTick, l.onComplete, l.start, null, l.context, l.runOnInit, l.utcOffset, l.unrefTimeout, l.waitForCompletion, l.errorHandler, l.name, l.threshold) : new a(l.cronTime, l.onTick, l.onComplete, l.start, l.timeZone, l.context, l.runOnInit, l.utcOffset, l.unrefTimeout, l.waitForCompletion, l.errorHandler, l.name, l.threshold);
    }
    _fnWrap(l) {
      var p, d;
      switch (typeof l) {
        case "function":
          return l;
        case "string": {
          const [g, ...v] = l.split(" ");
          return e.spawn.bind(void 0, g ?? l, v, {});
        }
        case "object":
          return e.spawn.bind(void 0, l.command, (p = l.args) !== null && p !== void 0 ? p : [], (d = l.options) !== null && d !== void 0 ? d : {});
      }
    }
    addCallback(l) {
      typeof l == "function" && this._callbacks.push(l);
    }
    setTime(l) {
      if (!(l instanceof r.CronTime))
        throw new t.CronError("time must be an instance of CronTime.");
      const p = this._isActive;
      this.stop(), this.cronTime = l, l.realDate && (this.runOnce = !0), p && this.start();
    }
    nextDate() {
      return this.cronTime.sendAt();
    }
    fireOnTick() {
      return s(this, void 0, void 0, function* () {
        if (!(this.waitForCompletion && this._isCallbackRunning)) {
          this._isCallbackRunning = !0;
          try {
            for (const l of this._callbacks) {
              const p = l.call(this.context, this.onComplete);
              this.waitForCompletion && (yield p);
            }
          } catch (l) {
            this.errorHandler != null ? this.errorHandler(l) : console.error("[Cron] error in callback", l);
          } finally {
            this._isCallbackRunning = !1;
          }
        }
      });
    }
    nextDates(l) {
      return this.cronTime.sendAt(l ?? 0);
    }
    start() {
      if (this._isActive)
        return;
      this._isActive = !0;
      const l = 2147483647;
      let p = this.cronTime.getTimeout(), d = 0, g;
      const v = (_) => {
        g = Date.now(), this._timeout = setTimeout(C, _), this.unrefTimeout && typeof this._timeout.unref == "function" && this._timeout.unref();
      }, C = () => {
        const _ = g + p - Date.now();
        if (_ > 0) {
          let N = this.cronTime.getTimeout();
          N > _ && (N = _), d += N;
        }
        d ? (d > l ? (d -= l, p = l) : (p = d, d = 0), v(p)) : (this.lastExecution = /* @__PURE__ */ new Date(), this._isActive = !1, this.runOnce || this.start(), this.fireOnTick());
      };
      if (p >= 0)
        p > l && (d = p - l, p = l), v(p);
      else {
        const _ = Math.abs(p), N = `[Cron] Missed execution deadline by ${_}ms for job${this.name ? ` "${this.name}"` : ""} with cron expression '${String(this.cronTime.source)}'`;
        _ <= this.threshold ? (console.warn(`${N}. Executing immediately.`), this.lastExecution = /* @__PURE__ */ new Date(), this.fireOnTick()) : console.warn(`${N}. Skipping execution as it exceeds threshold (${this.threshold}ms).`), p = this.cronTime.getTimeout(), v(p);
      }
    }
    lastDate() {
      return this.lastExecution;
    }
    _executeOnComplete() {
      return s(this, void 0, void 0, function* () {
        if (typeof this.onComplete == "function")
          try {
            yield this.onComplete.call(this.context);
          } catch (l) {
            console.error("[Cron] error in onComplete callback:", l);
          }
      });
    }
    _waitForJobCompletion() {
      return s(this, void 0, void 0, function* () {
        for (; this._isCallbackRunning; )
          yield new Promise((l) => setTimeout(l, 100));
      });
    }
    stop() {
      if (this._timeout && clearTimeout(this._timeout), this._isActive = !1, !this.waitForCompletion) {
        this._executeOnComplete();
        return;
      }
      return Promise.resolve().then(() => s(this, void 0, void 0, function* () {
        yield this._waitForJobCompletion(), yield this._executeOnComplete();
      }));
    }
  }
  return Be.CronJob = a, Be;
}
var Qs;
function tl() {
  return Qs || (Qs = 1, function(s) {
    Object.defineProperty(s, "__esModule", { value: !0 }), s.validateCronExpression = s.timeout = s.sendAt = s.CronTime = s.CronJob = void 0;
    const e = Zn();
    var t = el();
    Object.defineProperty(s, "CronJob", { enumerable: !0, get: function() {
      return t.CronJob;
    } });
    var r = Zn();
    Object.defineProperty(s, "CronTime", { enumerable: !0, get: function() {
      return r.CronTime;
    } });
    const a = (l) => new e.CronTime(l).sendAt();
    s.sendAt = a;
    const c = (l) => new e.CronTime(l).getTimeout();
    s.timeout = c, s.validateCronExpression = e.CronTime.validateCronExpression;
  }(Rn)), Rn;
}
var nl = tl();
const Ni = {}, Te = new Ae();
Te.use(vc({
  initial: () => ({
    isActive: !1
  })
}));
Te.command("start", async (s) => {
  await s.reply(
    `Welcome to Daily Pin Bot!

Commands:
/setup [link] [optional message] - Setup daily pin with a link and optional message
/activate - Activate daily pins
/deactivate - Deactivate daily pins
/status - Check current setup status
/help - Show available commands`
  );
});
Te.command("help", async (s) => {
  await s.reply(
    `Available commands:
/setup [link] [optional message] - Setup daily pin with a link and optional message
/activate - Activate daily pins
/deactivate - Deactivate daily pins
/status - Check current setup status`
  );
});
Te.command("setup", async (s) => {
  var a;
  const e = (a = s.message) == null ? void 0 : a.text.split(" ");
  if (!e || e.length < 2) {
    await s.reply("Please provide a link to pin");
    return;
  }
  const t = e[1], r = e.slice(2).join(" ") || "Daily reminder";
  s.session.chatId = s.chat.id.toString(), s.session.linkToPin = t, s.session.messageText = r, await s.reply(`Daily pin has been set up with link: ${t}
Message: ${r}`);
});
Te.command("activate", async (s) => {
  if (!s.session.chatId || !s.session.linkToPin) {
    await s.reply("Please set up the bot first using /setup [link] [optional message]");
    return;
  }
  s.session.isActive = !0, await s.reply("Daily pins activated! The bot will pin a message every weekday at 8:30 AM.");
});
Te.command("deactivate", async (s) => {
  s.session.isActive = !1, await s.reply("Daily pins deactivated.");
});
Te.command("status", async (s) => {
  const e = s.session.isActive ? "Active" : "Inactive", t = s.session.linkToPin || "Not set", r = s.session.messageText || "Not set", a = s.session.chatId || "Not set";
  await s.reply(
    `Status: ${e}
Link: ${t}
Message: ${r}
Chat ID: ${a}`
  );
});
Te.on("message", (s) => {
  s.session.isActive && s.session.chatId && s.session.linkToPin && (Ni[s.session.chatId] = {
    isActive: s.session.isActive,
    linkToPin: s.session.linkToPin,
    messageText: s.session.messageText,
    chatId: s.session.chatId
  });
});
async function rl(s, e, t, r) {
  try {
    const a = `${r}
${t}`, c = await s.api.sendMessage(e, a);
    await s.api.pinChatMessage(e, c.message_id), console.log(`Sent and pinned daily message in chat ${e}`);
  } catch (a) {
    console.error(`Error sending/pinning message in chat ${e}:`, a);
  }
}
function sl(s) {
  const e = new nl.CronJob("0 30 8 * * 1-5", () => {
    console.log("Running daily pin job at 8:30 AM"), Object.values(Ni).forEach((t) => {
      t.isActive && t.chatId && t.linkToPin && rl(
        s,
        t.chatId,
        t.linkToPin,
        t.messageText || "Daily reminder"
      );
    });
  }, null, !0, "UTC");
  return e.start(), console.log("Daily pin job scheduled for 8:30 AM Monday-Friday"), e;
}
const il = () => {
};
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const Fi = function(s) {
  const e = [];
  let t = 0;
  for (let r = 0; r < s.length; r++) {
    let a = s.charCodeAt(r);
    a < 128 ? e[t++] = a : a < 2048 ? (e[t++] = a >> 6 | 192, e[t++] = a & 63 | 128) : (a & 64512) === 55296 && r + 1 < s.length && (s.charCodeAt(r + 1) & 64512) === 56320 ? (a = 65536 + ((a & 1023) << 10) + (s.charCodeAt(++r) & 1023), e[t++] = a >> 18 | 240, e[t++] = a >> 12 & 63 | 128, e[t++] = a >> 6 & 63 | 128, e[t++] = a & 63 | 128) : (e[t++] = a >> 12 | 224, e[t++] = a >> 6 & 63 | 128, e[t++] = a & 63 | 128);
  }
  return e;
}, al = function(s) {
  const e = [];
  let t = 0, r = 0;
  for (; t < s.length; ) {
    const a = s[t++];
    if (a < 128)
      e[r++] = String.fromCharCode(a);
    else if (a > 191 && a < 224) {
      const c = s[t++];
      e[r++] = String.fromCharCode((a & 31) << 6 | c & 63);
    } else if (a > 239 && a < 365) {
      const c = s[t++], l = s[t++], p = s[t++], d = ((a & 7) << 18 | (c & 63) << 12 | (l & 63) << 6 | p & 63) - 65536;
      e[r++] = String.fromCharCode(55296 + (d >> 10)), e[r++] = String.fromCharCode(56320 + (d & 1023));
    } else {
      const c = s[t++], l = s[t++];
      e[r++] = String.fromCharCode((a & 15) << 12 | (c & 63) << 6 | l & 63);
    }
  }
  return e.join("");
}, Ri = {
  /**
   * Maps bytes to characters.
   */
  byteToCharMap_: null,
  /**
   * Maps characters to bytes.
   */
  charToByteMap_: null,
  /**
   * Maps bytes to websafe characters.
   * @private
   */
  byteToCharMapWebSafe_: null,
  /**
   * Maps websafe characters to bytes.
   * @private
   */
  charToByteMapWebSafe_: null,
  /**
   * Our default alphabet, shared between
   * ENCODED_VALS and ENCODED_VALS_WEBSAFE
   */
  ENCODED_VALS_BASE: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",
  /**
   * Our default alphabet. Value 64 (=) is special; it means "nothing."
   */
  get ENCODED_VALS() {
    return this.ENCODED_VALS_BASE + "+/=";
  },
  /**
   * Our websafe alphabet.
   */
  get ENCODED_VALS_WEBSAFE() {
    return this.ENCODED_VALS_BASE + "-_.";
  },
  /**
   * Whether this browser supports the atob and btoa functions. This extension
   * started at Mozilla but is now implemented by many browsers. We use the
   * ASSUME_* variables to avoid pulling in the full useragent detection library
   * but still allowing the standard per-browser compilations.
   *
   */
  HAS_NATIVE_SUPPORT: typeof atob == "function",
  /**
   * Base64-encode an array of bytes.
   *
   * @param input An array of bytes (numbers with
   *     value in [0, 255]) to encode.
   * @param webSafe Boolean indicating we should use the
   *     alternative alphabet.
   * @return The base64 encoded string.
   */
  encodeByteArray(s, e) {
    if (!Array.isArray(s))
      throw Error("encodeByteArray takes an array as a parameter");
    this.init_();
    const t = e ? this.byteToCharMapWebSafe_ : this.byteToCharMap_, r = [];
    for (let a = 0; a < s.length; a += 3) {
      const c = s[a], l = a + 1 < s.length, p = l ? s[a + 1] : 0, d = a + 2 < s.length, g = d ? s[a + 2] : 0, v = c >> 2, C = (c & 3) << 4 | p >> 4;
      let _ = (p & 15) << 2 | g >> 6, N = g & 63;
      d || (N = 64, l || (_ = 64)), r.push(t[v], t[C], t[_], t[N]);
    }
    return r.join("");
  },
  /**
   * Base64-encode a string.
   *
   * @param input A string to encode.
   * @param webSafe If true, we should use the
   *     alternative alphabet.
   * @return The base64 encoded string.
   */
  encodeString(s, e) {
    return this.HAS_NATIVE_SUPPORT && !e ? btoa(s) : this.encodeByteArray(Fi(s), e);
  },
  /**
   * Base64-decode a string.
   *
   * @param input to decode.
   * @param webSafe True if we should use the
   *     alternative alphabet.
   * @return string representing the decoded value.
   */
  decodeString(s, e) {
    return this.HAS_NATIVE_SUPPORT && !e ? atob(s) : al(this.decodeStringToByteArray(s, e));
  },
  /**
   * Base64-decode a string.
   *
   * In base-64 decoding, groups of four characters are converted into three
   * bytes.  If the encoder did not apply padding, the input length may not
   * be a multiple of 4.
   *
   * In this case, the last group will have fewer than 4 characters, and
   * padding will be inferred.  If the group has one or two characters, it decodes
   * to one byte.  If the group has three characters, it decodes to two bytes.
   *
   * @param input Input to decode.
   * @param webSafe True if we should use the web-safe alphabet.
   * @return bytes representing the decoded value.
   */
  decodeStringToByteArray(s, e) {
    this.init_();
    const t = e ? this.charToByteMapWebSafe_ : this.charToByteMap_, r = [];
    for (let a = 0; a < s.length; ) {
      const c = t[s.charAt(a++)], p = a < s.length ? t[s.charAt(a)] : 0;
      ++a;
      const g = a < s.length ? t[s.charAt(a)] : 64;
      ++a;
      const C = a < s.length ? t[s.charAt(a)] : 64;
      if (++a, c == null || p == null || g == null || C == null)
        throw new ol();
      const _ = c << 2 | p >> 4;
      if (r.push(_), g !== 64) {
        const N = p << 4 & 240 | g >> 2;
        if (r.push(N), C !== 64) {
          const E = g << 6 & 192 | C;
          r.push(E);
        }
      }
    }
    return r;
  },
  /**
   * Lazy static initialization function. Called before
   * accessing any of the static map variables.
   * @private
   */
  init_() {
    if (!this.byteToCharMap_) {
      this.byteToCharMap_ = {}, this.charToByteMap_ = {}, this.byteToCharMapWebSafe_ = {}, this.charToByteMapWebSafe_ = {};
      for (let s = 0; s < this.ENCODED_VALS.length; s++)
        this.byteToCharMap_[s] = this.ENCODED_VALS.charAt(s), this.charToByteMap_[this.byteToCharMap_[s]] = s, this.byteToCharMapWebSafe_[s] = this.ENCODED_VALS_WEBSAFE.charAt(s), this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[s]] = s, s >= this.ENCODED_VALS_BASE.length && (this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(s)] = s, this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(s)] = s);
    }
  }
};
class ol extends Error {
  constructor() {
    super(...arguments), this.name = "DecodeBase64StringError";
  }
}
const ul = function(s) {
  const e = Fi(s);
  return Ri.encodeByteArray(e, !0);
}, $i = function(s) {
  return ul(s).replace(/\./g, "");
}, cl = function(s) {
  try {
    return Ri.decodeString(s, !0);
  } catch (e) {
    console.error("base64Decode failed: ", e);
  }
  return null;
};
/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function ll() {
  if (typeof self < "u")
    return self;
  if (typeof window < "u")
    return window;
  if (typeof global < "u")
    return global;
  throw new Error("Unable to locate global object.");
}
/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const hl = () => ll().__FIREBASE_DEFAULTS__, dl = () => {
  if (typeof process > "u" || typeof process.env > "u")
    return;
  const s = process.env.__FIREBASE_DEFAULTS__;
  if (s)
    return JSON.parse(s);
}, fl = () => {
  if (typeof document > "u")
    return;
  let s;
  try {
    s = document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/);
  } catch {
    return;
  }
  const e = s && cl(s[1]);
  return e && JSON.parse(e);
}, ml = () => {
  try {
    return il() || hl() || dl() || fl();
  } catch (s) {
    console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${s}`);
    return;
  }
}, pl = () => {
  var s;
  return (s = ml()) === null || s === void 0 ? void 0 : s.config;
};
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class gl {
  constructor() {
    this.reject = () => {
    }, this.resolve = () => {
    }, this.promise = new Promise((e, t) => {
      this.resolve = e, this.reject = t;
    });
  }
  /**
   * Our API internals are not promisified and cannot because our callback APIs have subtle expectations around
   * invoking promises inline, which Promises are forbidden to do. This method accepts an optional node-style callback
   * and returns a node-style callback which will resolve or reject the Deferred's promise.
   */
  wrapCallback(e) {
    return (t, r) => {
      t ? this.reject(t) : this.resolve(r), typeof e == "function" && (this.promise.catch(() => {
      }), e.length === 1 ? e(t) : e(t, r));
    };
  }
}
function yl() {
  try {
    return typeof indexedDB == "object";
  } catch {
    return !1;
  }
}
function wl() {
  return new Promise((s, e) => {
    try {
      let t = !0;
      const r = "validate-browser-context-for-indexeddb-analytics-module", a = self.indexedDB.open(r);
      a.onsuccess = () => {
        a.result.close(), t || self.indexedDB.deleteDatabase(r), s(!0);
      }, a.onupgradeneeded = () => {
        t = !1;
      }, a.onerror = () => {
        var c;
        e(((c = a.error) === null || c === void 0 ? void 0 : c.message) || "");
      };
    } catch (t) {
      e(t);
    }
  });
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const bl = "FirebaseError";
class Nt extends Error {
  constructor(e, t, r) {
    super(t), this.code = e, this.customData = r, this.name = bl, Object.setPrototypeOf(this, Nt.prototype), Error.captureStackTrace && Error.captureStackTrace(this, xi.prototype.create);
  }
}
class xi {
  constructor(e, t, r) {
    this.service = e, this.serviceName = t, this.errors = r;
  }
  create(e, ...t) {
    const r = t[0] || {}, a = `${this.service}/${e}`, c = this.errors[e], l = c ? vl(c, r) : "Error", p = `${this.serviceName}: ${l} (${a}).`;
    return new Nt(a, p, r);
  }
}
function vl(s, e) {
  return s.replace(Cl, (t, r) => {
    const a = e[r];
    return a != null ? String(a) : `<${r}?>`;
  });
}
const Cl = /\{\$([^}]+)}/g;
function Kn(s, e) {
  if (s === e)
    return !0;
  const t = Object.keys(s), r = Object.keys(e);
  for (const a of t) {
    if (!r.includes(a))
      return !1;
    const c = s[a], l = e[a];
    if (Js(c) && Js(l)) {
      if (!Kn(c, l))
        return !1;
    } else if (c !== l)
      return !1;
  }
  for (const a of r)
    if (!t.includes(a))
      return !1;
  return !0;
}
function Js(s) {
  return s !== null && typeof s == "object";
}
class Jt {
  /**
   *
   * @param name The public service name, e.g. app, auth, firestore, database
   * @param instanceFactory Service factory responsible for creating the public interface
   * @param type whether the service provided by the component is public or private
   */
  constructor(e, t, r) {
    this.name = e, this.instanceFactory = t, this.type = r, this.multipleInstances = !1, this.serviceProps = {}, this.instantiationMode = "LAZY", this.onInstanceCreated = null;
  }
  setInstantiationMode(e) {
    return this.instantiationMode = e, this;
  }
  setMultipleInstances(e) {
    return this.multipleInstances = e, this;
  }
  setServiceProps(e) {
    return this.serviceProps = e, this;
  }
  setInstanceCreatedCallback(e) {
    return this.onInstanceCreated = e, this;
  }
}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const Ue = "[DEFAULT]";
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class Sl {
  constructor(e, t) {
    this.name = e, this.container = t, this.component = null, this.instances = /* @__PURE__ */ new Map(), this.instancesDeferred = /* @__PURE__ */ new Map(), this.instancesOptions = /* @__PURE__ */ new Map(), this.onInitCallbacks = /* @__PURE__ */ new Map();
  }
  /**
   * @param identifier A provider can provide multiple instances of a service
   * if this.component.multipleInstances is true.
   */
  get(e) {
    const t = this.normalizeInstanceIdentifier(e);
    if (!this.instancesDeferred.has(t)) {
      const r = new gl();
      if (this.instancesDeferred.set(t, r), this.isInitialized(t) || this.shouldAutoInitialize())
        try {
          const a = this.getOrInitializeService({
            instanceIdentifier: t
          });
          a && r.resolve(a);
        } catch {
        }
    }
    return this.instancesDeferred.get(t).promise;
  }
  getImmediate(e) {
    var t;
    const r = this.normalizeInstanceIdentifier(e == null ? void 0 : e.identifier), a = (t = e == null ? void 0 : e.optional) !== null && t !== void 0 ? t : !1;
    if (this.isInitialized(r) || this.shouldAutoInitialize())
      try {
        return this.getOrInitializeService({
          instanceIdentifier: r
        });
      } catch (c) {
        if (a)
          return null;
        throw c;
      }
    else {
      if (a)
        return null;
      throw Error(`Service ${this.name} is not available`);
    }
  }
  getComponent() {
    return this.component;
  }
  setComponent(e) {
    if (e.name !== this.name)
      throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);
    if (this.component)
      throw Error(`Component for ${this.name} has already been provided`);
    if (this.component = e, !!this.shouldAutoInitialize()) {
      if (_l(e))
        try {
          this.getOrInitializeService({ instanceIdentifier: Ue });
        } catch {
        }
      for (const [t, r] of this.instancesDeferred.entries()) {
        const a = this.normalizeInstanceIdentifier(t);
        try {
          const c = this.getOrInitializeService({
            instanceIdentifier: a
          });
          r.resolve(c);
        } catch {
        }
      }
    }
  }
  clearInstance(e = Ue) {
    this.instancesDeferred.delete(e), this.instancesOptions.delete(e), this.instances.delete(e);
  }
  // app.delete() will call this method on every provider to delete the services
  // TODO: should we mark the provider as deleted?
  async delete() {
    const e = Array.from(this.instances.values());
    await Promise.all([
      ...e.filter((t) => "INTERNAL" in t).map((t) => t.INTERNAL.delete()),
      ...e.filter((t) => "_delete" in t).map((t) => t._delete())
    ]);
  }
  isComponentSet() {
    return this.component != null;
  }
  isInitialized(e = Ue) {
    return this.instances.has(e);
  }
  getOptions(e = Ue) {
    return this.instancesOptions.get(e) || {};
  }
  initialize(e = {}) {
    const { options: t = {} } = e, r = this.normalizeInstanceIdentifier(e.instanceIdentifier);
    if (this.isInitialized(r))
      throw Error(`${this.name}(${r}) has already been initialized`);
    if (!this.isComponentSet())
      throw Error(`Component ${this.name} has not been registered yet`);
    const a = this.getOrInitializeService({
      instanceIdentifier: r,
      options: t
    });
    for (const [c, l] of this.instancesDeferred.entries()) {
      const p = this.normalizeInstanceIdentifier(c);
      r === p && l.resolve(a);
    }
    return a;
  }
  /**
   *
   * @param callback - a function that will be invoked  after the provider has been initialized by calling provider.initialize().
   * The function is invoked SYNCHRONOUSLY, so it should not execute any longrunning tasks in order to not block the program.
   *
   * @param identifier An optional instance identifier
   * @returns a function to unregister the callback
   */
  onInit(e, t) {
    var r;
    const a = this.normalizeInstanceIdentifier(t), c = (r = this.onInitCallbacks.get(a)) !== null && r !== void 0 ? r : /* @__PURE__ */ new Set();
    c.add(e), this.onInitCallbacks.set(a, c);
    const l = this.instances.get(a);
    return l && e(l, a), () => {
      c.delete(e);
    };
  }
  /**
   * Invoke onInit callbacks synchronously
   * @param instance the service instance`
   */
  invokeOnInitCallbacks(e, t) {
    const r = this.onInitCallbacks.get(t);
    if (r)
      for (const a of r)
        try {
          a(e, t);
        } catch {
        }
  }
  getOrInitializeService({ instanceIdentifier: e, options: t = {} }) {
    let r = this.instances.get(e);
    if (!r && this.component && (r = this.component.instanceFactory(this.container, {
      instanceIdentifier: Tl(e),
      options: t
    }), this.instances.set(e, r), this.instancesOptions.set(e, t), this.invokeOnInitCallbacks(r, e), this.component.onInstanceCreated))
      try {
        this.component.onInstanceCreated(this.container, e, r);
      } catch {
      }
    return r || null;
  }
  normalizeInstanceIdentifier(e = Ue) {
    return this.component ? this.component.multipleInstances ? e : Ue : e;
  }
  shouldAutoInitialize() {
    return !!this.component && this.component.instantiationMode !== "EXPLICIT";
  }
}
function Tl(s) {
  return s === Ue ? void 0 : s;
}
function _l(s) {
  return s.instantiationMode === "EAGER";
}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class El {
  constructor(e) {
    this.name = e, this.providers = /* @__PURE__ */ new Map();
  }
  /**
   *
   * @param component Component being added
   * @param overwrite When a component with the same name has already been registered,
   * if overwrite is true: overwrite the existing component with the new component and create a new
   * provider with the new component. It can be useful in tests where you want to use different mocks
   * for different tests.
   * if overwrite is false: throw an exception
   */
  addComponent(e) {
    const t = this.getProvider(e.name);
    if (t.isComponentSet())
      throw new Error(`Component ${e.name} has already been registered with ${this.name}`);
    t.setComponent(e);
  }
  addOrOverwriteComponent(e) {
    this.getProvider(e.name).isComponentSet() && this.providers.delete(e.name), this.addComponent(e);
  }
  /**
   * getProvider provides a type safe interface where it can only be called with a field name
   * present in NameServiceMapping interface.
   *
   * Firebase SDKs providing services should extend NameServiceMapping interface to register
   * themselves.
   */
  getProvider(e) {
    if (this.providers.has(e))
      return this.providers.get(e);
    const t = new Sl(e, this);
    return this.providers.set(e, t), t;
  }
  getProviders() {
    return Array.from(this.providers.values());
  }
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var G;
(function(s) {
  s[s.DEBUG = 0] = "DEBUG", s[s.VERBOSE = 1] = "VERBOSE", s[s.INFO = 2] = "INFO", s[s.WARN = 3] = "WARN", s[s.ERROR = 4] = "ERROR", s[s.SILENT = 5] = "SILENT";
})(G || (G = {}));
const Il = {
  debug: G.DEBUG,
  verbose: G.VERBOSE,
  info: G.INFO,
  warn: G.WARN,
  error: G.ERROR,
  silent: G.SILENT
}, kl = G.INFO, Ml = {
  [G.DEBUG]: "log",
  [G.VERBOSE]: "log",
  [G.INFO]: "info",
  [G.WARN]: "warn",
  [G.ERROR]: "error"
}, Ol = (s, e, ...t) => {
  if (e < s.logLevel)
    return;
  const r = (/* @__PURE__ */ new Date()).toISOString(), a = Ml[e];
  if (a)
    console[a](`[${r}]  ${s.name}:`, ...t);
  else
    throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`);
};
class Dl {
  /**
   * Gives you an instance of a Logger to capture messages according to
   * Firebase's logging scheme.
   *
   * @param name The name that the logs will be associated with
   */
  constructor(e) {
    this.name = e, this._logLevel = kl, this._logHandler = Ol, this._userLogHandler = null;
  }
  get logLevel() {
    return this._logLevel;
  }
  set logLevel(e) {
    if (!(e in G))
      throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);
    this._logLevel = e;
  }
  // Workaround for setter/getter having to be the same type.
  setLogLevel(e) {
    this._logLevel = typeof e == "string" ? Il[e] : e;
  }
  get logHandler() {
    return this._logHandler;
  }
  set logHandler(e) {
    if (typeof e != "function")
      throw new TypeError("Value assigned to `logHandler` must be a function");
    this._logHandler = e;
  }
  get userLogHandler() {
    return this._userLogHandler;
  }
  set userLogHandler(e) {
    this._userLogHandler = e;
  }
  /**
   * The functions below are all based on the `console` interface
   */
  debug(...e) {
    this._userLogHandler && this._userLogHandler(this, G.DEBUG, ...e), this._logHandler(this, G.DEBUG, ...e);
  }
  log(...e) {
    this._userLogHandler && this._userLogHandler(this, G.VERBOSE, ...e), this._logHandler(this, G.VERBOSE, ...e);
  }
  info(...e) {
    this._userLogHandler && this._userLogHandler(this, G.INFO, ...e), this._logHandler(this, G.INFO, ...e);
  }
  warn(...e) {
    this._userLogHandler && this._userLogHandler(this, G.WARN, ...e), this._logHandler(this, G.WARN, ...e);
  }
  error(...e) {
    this._userLogHandler && this._userLogHandler(this, G.ERROR, ...e), this._logHandler(this, G.ERROR, ...e);
  }
}
const Al = (s, e) => e.some((t) => s instanceof t);
let Xs, ei;
function Nl() {
  return Xs || (Xs = [
    IDBDatabase,
    IDBObjectStore,
    IDBIndex,
    IDBCursor,
    IDBTransaction
  ]);
}
function Fl() {
  return ei || (ei = [
    IDBCursor.prototype.advance,
    IDBCursor.prototype.continue,
    IDBCursor.prototype.continuePrimaryKey
  ]);
}
const Li = /* @__PURE__ */ new WeakMap(), Qn = /* @__PURE__ */ new WeakMap(), Pi = /* @__PURE__ */ new WeakMap(), xn = /* @__PURE__ */ new WeakMap(), ir = /* @__PURE__ */ new WeakMap();
function Rl(s) {
  const e = new Promise((t, r) => {
    const a = () => {
      s.removeEventListener("success", c), s.removeEventListener("error", l);
    }, c = () => {
      t(Fe(s.result)), a();
    }, l = () => {
      r(s.error), a();
    };
    s.addEventListener("success", c), s.addEventListener("error", l);
  });
  return e.then((t) => {
    t instanceof IDBCursor && Li.set(t, s);
  }).catch(() => {
  }), ir.set(e, s), e;
}
function $l(s) {
  if (Qn.has(s))
    return;
  const e = new Promise((t, r) => {
    const a = () => {
      s.removeEventListener("complete", c), s.removeEventListener("error", l), s.removeEventListener("abort", l);
    }, c = () => {
      t(), a();
    }, l = () => {
      r(s.error || new DOMException("AbortError", "AbortError")), a();
    };
    s.addEventListener("complete", c), s.addEventListener("error", l), s.addEventListener("abort", l);
  });
  Qn.set(s, e);
}
let Jn = {
  get(s, e, t) {
    if (s instanceof IDBTransaction) {
      if (e === "done")
        return Qn.get(s);
      if (e === "objectStoreNames")
        return s.objectStoreNames || Pi.get(s);
      if (e === "store")
        return t.objectStoreNames[1] ? void 0 : t.objectStore(t.objectStoreNames[0]);
    }
    return Fe(s[e]);
  },
  set(s, e, t) {
    return s[e] = t, !0;
  },
  has(s, e) {
    return s instanceof IDBTransaction && (e === "done" || e === "store") ? !0 : e in s;
  }
};
function xl(s) {
  Jn = s(Jn);
}
function Ll(s) {
  return s === IDBDatabase.prototype.transaction && !("objectStoreNames" in IDBTransaction.prototype) ? function(e, ...t) {
    const r = s.call(Ln(this), e, ...t);
    return Pi.set(r, e.sort ? e.sort() : [e]), Fe(r);
  } : Fl().includes(s) ? function(...e) {
    return s.apply(Ln(this), e), Fe(Li.get(this));
  } : function(...e) {
    return Fe(s.apply(Ln(this), e));
  };
}
function Pl(s) {
  return typeof s == "function" ? Ll(s) : (s instanceof IDBTransaction && $l(s), Al(s, Nl()) ? new Proxy(s, Jn) : s);
}
function Fe(s) {
  if (s instanceof IDBRequest)
    return Rl(s);
  if (xn.has(s))
    return xn.get(s);
  const e = Pl(s);
  return e !== s && (xn.set(s, e), ir.set(e, s)), e;
}
const Ln = (s) => ir.get(s);
function Vl(s, e, { blocked: t, upgrade: r, blocking: a, terminated: c } = {}) {
  const l = indexedDB.open(s, e), p = Fe(l);
  return r && l.addEventListener("upgradeneeded", (d) => {
    r(Fe(l.result), d.oldVersion, d.newVersion, Fe(l.transaction), d);
  }), t && l.addEventListener("blocked", (d) => t(
    // Casting due to https://github.com/microsoft/TypeScript-DOM-lib-generator/pull/1405
    d.oldVersion,
    d.newVersion,
    d
  )), p.then((d) => {
    c && d.addEventListener("close", () => c()), a && d.addEventListener("versionchange", (g) => a(g.oldVersion, g.newVersion, g));
  }).catch(() => {
  }), p;
}
const Bl = ["get", "getKey", "getAll", "getAllKeys", "count"], Ul = ["put", "add", "delete", "clear"], Pn = /* @__PURE__ */ new Map();
function ti(s, e) {
  if (!(s instanceof IDBDatabase && !(e in s) && typeof e == "string"))
    return;
  if (Pn.get(e))
    return Pn.get(e);
  const t = e.replace(/FromIndex$/, ""), r = e !== t, a = Ul.includes(t);
  if (
    // Bail if the target doesn't exist on the target. Eg, getAll isn't in Edge.
    !(t in (r ? IDBIndex : IDBObjectStore).prototype) || !(a || Bl.includes(t))
  )
    return;
  const c = async function(l, ...p) {
    const d = this.transaction(l, a ? "readwrite" : "readonly");
    let g = d.store;
    return r && (g = g.index(p.shift())), (await Promise.all([
      g[t](...p),
      a && d.done
    ]))[0];
  };
  return Pn.set(e, c), c;
}
xl((s) => ({
  ...s,
  get: (e, t, r) => ti(e, t) || s.get(e, t, r),
  has: (e, t) => !!ti(e, t) || s.has(e, t)
}));
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class Wl {
  constructor(e) {
    this.container = e;
  }
  // In initial implementation, this will be called by installations on
  // auth token refresh, and installations will send this string.
  getPlatformInfoString() {
    return this.container.getProviders().map((t) => {
      if (jl(t)) {
        const r = t.getImmediate();
        return `${r.library}/${r.version}`;
      } else
        return null;
    }).filter((t) => t).join(" ");
  }
}
function jl(s) {
  const e = s.getComponent();
  return (e == null ? void 0 : e.type) === "VERSION";
}
const Xn = "@firebase/app", ni = "0.11.4";
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const Se = new Dl("@firebase/app"), ql = "@firebase/app-compat", Gl = "@firebase/analytics-compat", Hl = "@firebase/analytics", zl = "@firebase/app-check-compat", Yl = "@firebase/app-check", Zl = "@firebase/auth", Kl = "@firebase/auth-compat", Ql = "@firebase/database", Jl = "@firebase/data-connect", Xl = "@firebase/database-compat", eh = "@firebase/functions", th = "@firebase/functions-compat", nh = "@firebase/installations", rh = "@firebase/installations-compat", sh = "@firebase/messaging", ih = "@firebase/messaging-compat", ah = "@firebase/performance", oh = "@firebase/performance-compat", uh = "@firebase/remote-config", ch = "@firebase/remote-config-compat", lh = "@firebase/storage", hh = "@firebase/storage-compat", dh = "@firebase/firestore", fh = "@firebase/vertexai", mh = "@firebase/firestore-compat", ph = "firebase";
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const gh = "[DEFAULT]", yh = {
  [Xn]: "fire-core",
  [ql]: "fire-core-compat",
  [Hl]: "fire-analytics",
  [Gl]: "fire-analytics-compat",
  [Yl]: "fire-app-check",
  [zl]: "fire-app-check-compat",
  [Zl]: "fire-auth",
  [Kl]: "fire-auth-compat",
  [Ql]: "fire-rtdb",
  [Jl]: "fire-data-connect",
  [Xl]: "fire-rtdb-compat",
  [eh]: "fire-fn",
  [th]: "fire-fn-compat",
  [nh]: "fire-iid",
  [rh]: "fire-iid-compat",
  [sh]: "fire-fcm",
  [ih]: "fire-fcm-compat",
  [ah]: "fire-perf",
  [oh]: "fire-perf-compat",
  [uh]: "fire-rc",
  [ch]: "fire-rc-compat",
  [lh]: "fire-gcs",
  [hh]: "fire-gcs-compat",
  [dh]: "fire-fst",
  [mh]: "fire-fst-compat",
  [fh]: "fire-vertex",
  "fire-js": "fire-js",
  // Platform identifier for JS SDK.
  [ph]: "fire-js-all"
};
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const er = /* @__PURE__ */ new Map(), wh = /* @__PURE__ */ new Map(), tr = /* @__PURE__ */ new Map();
function ri(s, e) {
  try {
    s.container.addComponent(e);
  } catch (t) {
    Se.debug(`Component ${e.name} failed to register with FirebaseApp ${s.name}`, t);
  }
}
function nr(s) {
  const e = s.name;
  if (tr.has(e))
    return Se.debug(`There were multiple attempts to register component ${e}.`), !1;
  tr.set(e, s);
  for (const t of er.values())
    ri(t, s);
  for (const t of wh.values())
    ri(t, s);
  return !0;
}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const bh = {
  "no-app": "No Firebase App '{$appName}' has been created - call initializeApp() first",
  "bad-app-name": "Illegal App name: '{$appName}'",
  "duplicate-app": "Firebase App named '{$appName}' already exists with different options or config",
  "app-deleted": "Firebase App named '{$appName}' already deleted",
  "server-app-deleted": "Firebase Server App has been deleted",
  "no-options": "Need to provide options, when not being deployed to hosting via source.",
  "invalid-app-argument": "firebase.{$appName}() takes either no argument or a Firebase App instance.",
  "invalid-log-argument": "First argument to `onLog` must be null or a function.",
  "idb-open": "Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.",
  "idb-get": "Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.",
  "idb-set": "Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.",
  "idb-delete": "Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.",
  "finalization-registry-not-supported": "FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.",
  "invalid-server-app-environment": "FirebaseServerApp is not for use in browser environments."
}, je = new xi("app", "Firebase", bh);
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class vh {
  constructor(e, t, r) {
    this._isDeleted = !1, this._options = Object.assign({}, e), this._config = Object.assign({}, t), this._name = t.name, this._automaticDataCollectionEnabled = t.automaticDataCollectionEnabled, this._container = r, this.container.addComponent(new Jt(
      "app",
      () => this,
      "PUBLIC"
      /* ComponentType.PUBLIC */
    ));
  }
  get automaticDataCollectionEnabled() {
    return this.checkDestroyed(), this._automaticDataCollectionEnabled;
  }
  set automaticDataCollectionEnabled(e) {
    this.checkDestroyed(), this._automaticDataCollectionEnabled = e;
  }
  get name() {
    return this.checkDestroyed(), this._name;
  }
  get options() {
    return this.checkDestroyed(), this._options;
  }
  get config() {
    return this.checkDestroyed(), this._config;
  }
  get container() {
    return this._container;
  }
  get isDeleted() {
    return this._isDeleted;
  }
  set isDeleted(e) {
    this._isDeleted = e;
  }
  /**
   * This function will throw an Error if the App has already been deleted -
   * use before performing API actions on the App.
   */
  checkDestroyed() {
    if (this.isDeleted)
      throw je.create("app-deleted", { appName: this._name });
  }
}
function Ch(s, e = {}) {
  let t = s;
  typeof e != "object" && (e = { name: e });
  const r = Object.assign({ name: gh, automaticDataCollectionEnabled: !1 }, e), a = r.name;
  if (typeof a != "string" || !a)
    throw je.create("bad-app-name", {
      appName: String(a)
    });
  if (t || (t = pl()), !t)
    throw je.create(
      "no-options"
      /* AppError.NO_OPTIONS */
    );
  const c = er.get(a);
  if (c) {
    if (Kn(t, c.options) && Kn(r, c.config))
      return c;
    throw je.create("duplicate-app", { appName: a });
  }
  const l = new El(a);
  for (const d of tr.values())
    l.addComponent(d);
  const p = new vh(t, r, l);
  return er.set(a, p), p;
}
function Kt(s, e, t) {
  var r;
  let a = (r = yh[s]) !== null && r !== void 0 ? r : s;
  t && (a += `-${t}`);
  const c = a.match(/\s|\//), l = e.match(/\s|\//);
  if (c || l) {
    const p = [
      `Unable to register library "${a}" with version "${e}":`
    ];
    c && p.push(`library name "${a}" contains illegal characters (whitespace or "/")`), c && l && p.push("and"), l && p.push(`version name "${e}" contains illegal characters (whitespace or "/")`), Se.warn(p.join(" "));
    return;
  }
  nr(new Jt(
    `${a}-version`,
    () => ({ library: a, version: e }),
    "VERSION"
    /* ComponentType.VERSION */
  ));
}
/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const Sh = "firebase-heartbeat-database", Th = 1, At = "firebase-heartbeat-store";
let Vn = null;
function Vi() {
  return Vn || (Vn = Vl(Sh, Th, {
    upgrade: (s, e) => {
      switch (e) {
        case 0:
          try {
            s.createObjectStore(At);
          } catch (t) {
            console.warn(t);
          }
      }
    }
  }).catch((s) => {
    throw je.create("idb-open", {
      originalErrorMessage: s.message
    });
  })), Vn;
}
async function _h(s) {
  try {
    const t = (await Vi()).transaction(At), r = await t.objectStore(At).get(Bi(s));
    return await t.done, r;
  } catch (e) {
    if (e instanceof Nt)
      Se.warn(e.message);
    else {
      const t = je.create("idb-get", {
        originalErrorMessage: e == null ? void 0 : e.message
      });
      Se.warn(t.message);
    }
  }
}
async function si(s, e) {
  try {
    const r = (await Vi()).transaction(At, "readwrite");
    await r.objectStore(At).put(e, Bi(s)), await r.done;
  } catch (t) {
    if (t instanceof Nt)
      Se.warn(t.message);
    else {
      const r = je.create("idb-set", {
        originalErrorMessage: t == null ? void 0 : t.message
      });
      Se.warn(r.message);
    }
  }
}
function Bi(s) {
  return `${s.name}!${s.options.appId}`;
}
/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const Eh = 1024, Ih = 30;
class kh {
  constructor(e) {
    this.container = e, this._heartbeatsCache = null;
    const t = this.container.getProvider("app").getImmediate();
    this._storage = new Oh(t), this._heartbeatsCachePromise = this._storage.read().then((r) => (this._heartbeatsCache = r, r));
  }
  /**
   * Called to report a heartbeat. The function will generate
   * a HeartbeatsByUserAgent object, update heartbeatsCache, and persist it
   * to IndexedDB.
   * Note that we only store one heartbeat per day. So if a heartbeat for today is
   * already logged, subsequent calls to this function in the same day will be ignored.
   */
  async triggerHeartbeat() {
    var e, t;
    try {
      const a = this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(), c = ii();
      if (((e = this._heartbeatsCache) === null || e === void 0 ? void 0 : e.heartbeats) == null && (this._heartbeatsCache = await this._heartbeatsCachePromise, ((t = this._heartbeatsCache) === null || t === void 0 ? void 0 : t.heartbeats) == null) || this._heartbeatsCache.lastSentHeartbeatDate === c || this._heartbeatsCache.heartbeats.some((l) => l.date === c))
        return;
      if (this._heartbeatsCache.heartbeats.push({ date: c, agent: a }), this._heartbeatsCache.heartbeats.length > Ih) {
        const l = Dh(this._heartbeatsCache.heartbeats);
        this._heartbeatsCache.heartbeats.splice(l, 1);
      }
      return this._storage.overwrite(this._heartbeatsCache);
    } catch (r) {
      Se.warn(r);
    }
  }
  /**
   * Returns a base64 encoded string which can be attached to the heartbeat-specific header directly.
   * It also clears all heartbeats from memory as well as in IndexedDB.
   *
   * NOTE: Consuming product SDKs should not send the header if this method
   * returns an empty string.
   */
  async getHeartbeatsHeader() {
    var e;
    try {
      if (this._heartbeatsCache === null && await this._heartbeatsCachePromise, ((e = this._heartbeatsCache) === null || e === void 0 ? void 0 : e.heartbeats) == null || this._heartbeatsCache.heartbeats.length === 0)
        return "";
      const t = ii(), { heartbeatsToSend: r, unsentEntries: a } = Mh(this._heartbeatsCache.heartbeats), c = $i(JSON.stringify({ version: 2, heartbeats: r }));
      return this._heartbeatsCache.lastSentHeartbeatDate = t, a.length > 0 ? (this._heartbeatsCache.heartbeats = a, await this._storage.overwrite(this._heartbeatsCache)) : (this._heartbeatsCache.heartbeats = [], this._storage.overwrite(this._heartbeatsCache)), c;
    } catch (t) {
      return Se.warn(t), "";
    }
  }
}
function ii() {
  return (/* @__PURE__ */ new Date()).toISOString().substring(0, 10);
}
function Mh(s, e = Eh) {
  const t = [];
  let r = s.slice();
  for (const a of s) {
    const c = t.find((l) => l.agent === a.agent);
    if (c) {
      if (c.dates.push(a.date), ai(t) > e) {
        c.dates.pop();
        break;
      }
    } else if (t.push({
      agent: a.agent,
      dates: [a.date]
    }), ai(t) > e) {
      t.pop();
      break;
    }
    r = r.slice(1);
  }
  return {
    heartbeatsToSend: t,
    unsentEntries: r
  };
}
class Oh {
  constructor(e) {
    this.app = e, this._canUseIndexedDBPromise = this.runIndexedDBEnvironmentCheck();
  }
  async runIndexedDBEnvironmentCheck() {
    return yl() ? wl().then(() => !0).catch(() => !1) : !1;
  }
  /**
   * Read all heartbeats.
   */
  async read() {
    if (await this._canUseIndexedDBPromise) {
      const t = await _h(this.app);
      return t != null && t.heartbeats ? t : { heartbeats: [] };
    } else
      return { heartbeats: [] };
  }
  // overwrite the storage with the provided heartbeats
  async overwrite(e) {
    var t;
    if (await this._canUseIndexedDBPromise) {
      const a = await this.read();
      return si(this.app, {
        lastSentHeartbeatDate: (t = e.lastSentHeartbeatDate) !== null && t !== void 0 ? t : a.lastSentHeartbeatDate,
        heartbeats: e.heartbeats
      });
    } else
      return;
  }
  // add heartbeats
  async add(e) {
    var t;
    if (await this._canUseIndexedDBPromise) {
      const a = await this.read();
      return si(this.app, {
        lastSentHeartbeatDate: (t = e.lastSentHeartbeatDate) !== null && t !== void 0 ? t : a.lastSentHeartbeatDate,
        heartbeats: [
          ...a.heartbeats,
          ...e.heartbeats
        ]
      });
    } else
      return;
  }
}
function ai(s) {
  return $i(
    // heartbeatsCache wrapper properties
    JSON.stringify({ version: 2, heartbeats: s })
  ).length;
}
function Dh(s) {
  if (s.length === 0)
    return -1;
  let e = 0, t = s[0].date;
  for (let r = 1; r < s.length; r++)
    s[r].date < t && (t = s[r].date, e = r);
  return e;
}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function Ah(s) {
  nr(new Jt(
    "platform-logger",
    (e) => new Wl(e),
    "PRIVATE"
    /* ComponentType.PRIVATE */
  )), nr(new Jt(
    "heartbeat",
    (e) => new kh(e),
    "PRIVATE"
    /* ComponentType.PRIVATE */
  )), Kt(Xn, ni, s), Kt(Xn, ni, "esm2017"), Kt("fire-js", "");
}
Ah("");
var Nh = "firebase", Fh = "11.6.0";
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
Kt(Nh, Fh, "app");
const Ui = process.env.BOT_TOKEN;
if (!Ui)
  throw new Error("BOT_TOKEN is required in .env file");
const Rh = Ui, Ne = new gc(Rh);
Ne.use(Te);
async function oi(s) {
  const e = s, t = await Qc(e), r = await Zc({
    chunks: t,
    query: e
  });
  return console.log("Completion:", r), r;
}
async function $h() {
  console.log("init ...");
  try {
    console.log("starting ..."), await Ne.start(), console.log("Bot started"), Ne.on("message:text", async (s) => {
      s.reply(await oi(s.message.text));
    }), Ne.hears(/chat *(.+)?/, async (s) => {
      var e;
      console.log(s, "ctx"), console.log(s.message, "ctx.message"), (e = s.message) != null && e.text && s.reply(await oi(s.message.text));
    }), Ne.command("chat", async (s) => {
      await s.reply("Hi! I can only read messages that explicitly reply to me!", {
        // Make Telegram clients automatically show a reply interface to the user.
        reply_markup: { force_reply: !0 }
      });
    }), sl(Ne);
  } catch (s) {
    console.error("Failed to start the bot:", s);
  }
}
const xh = {
  apiKey: "AIzaSyAP4eL6JBVcnPHOeeB7aVX6gL1XqA_Oah4",
  authDomain: "telegram-bot-app-12291.firebaseapp.com",
  projectId: "telegram-bot-app-12291",
  storageBucket: "telegram-bot-app-12291.firebasestorage.app",
  messagingSenderId: "541703448699",
  appId: "1:541703448699:web:d1f5980cb5d9f4e5df5ade"
};
Ch(xh);
const Lh = async () => {
  await $h();
};
Lh();
process.once("SIGINT", () => Ne.stop());
process.once("SIGTERM", () => Ne.stop());
