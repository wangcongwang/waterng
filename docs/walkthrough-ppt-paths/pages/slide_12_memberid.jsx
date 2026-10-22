<Slide style={{ width: 1280, height: 720, padding: '20px 60px', fontFamily: 'Inter, PingFang SC, Helvetica Neue, sans-serif', background: '#FFFFFF' }}>
    {/* ===== A 区 ===== */}
    <Box style={{ height: 100, flexDirection: 'column', justifyContent: 'flex-start' }}>
        <Text style={{ fontSize: 34, fontWeight: 'bold', color: '#202259', lineHeight: 1.3 }}>Member ID 与推荐人默认值</Text>
        <Text style={{ fontSize: 16, color: '#5C646A', lineHeight: 1.4, marginTop: 6 }}>
            一个字段系统生成、不可改；另一个字段有个写死的默认值，这件事必须说清
        </Text>
    </Box>

    {/* ===== B 区（巨型数字 + 洞察） ===== */}
    <Box style={{ height: 540, flexDirection: 'column', gap: 20 }}>
        {/* 巨型 ID */}
        <Box style={{ height: 216, background: '#202259', borderRadius: 10, padding: '0 30px', flexDirection: 'row', alignItems: 'center', gap: 28 }}>
            <Text style={{ fontSize: 84, fontWeight: 'bold', color: '#FFFFFF', lineHeight: 1, letterSpacing: -3, fontFamily: 'Menlo, ui-monospace, monospace' }}>
                NG123456789
            </Text>
            <Box style={{ flexDirection: 'column', flex: 1 }}>
                <Box style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                    <Box style={{ padding: '4px 12px', background: '#2AA7CF', borderRadius: 4 }}>
                        <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#FFFFFF' }}>共 11 位</Text>
                    </Box>
                    <Text style={{ fontSize: 16, color: '#7FD3EC' }}>AE/NG 前缀 + 9 位数字 · 系统生成 · 字段只读</Text>
                </Box>
                <Text style={{ fontSize: 16, color: '#B9C6E4', lineHeight: 1.55, marginTop: 12 }}>
                    注册页一加载就生成好并填进输入框，用户改不了。注册页本身不做校验 —— 校验只发生在登录页、账户页和捕获推荐参数这三处，用的是同一条规则。
                </Text>
            </Box>
        </Box>

        {/* 两处默认值 */}
        <Box style={{ flex: 1, flexDirection: 'row', gap: 18 }}>
            <Box style={{ flex: 1, background: '#F4F6F8', borderRadius: 10, padding: '16px 18px', flexDirection: 'column' }}>
                <Box style={{ flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                    <FAIcon name='cog' style={{ fill: '#2AA7CF', width: 20, height: 20 }} />
                    <Text style={{ fontSize: 19, fontWeight: 'bold', color: '#202259' }}>ID 在哪生成、在哪校验</Text>
                </Box>
                <Box style={{ flex: 1, flexDirection: 'column', gap: 8 }}>
                    <Box style={{ flexDirection: 'row', gap: 10, alignItems: 'center', background: '#FFFFFF', borderRadius: 6, padding: '9px 12px' }}>
                        <Text style={{ fontSize: 15, color: '#202259', fontFamily: 'Menlo, ui-monospace, monospace', width: 62 }}>生成</Text>
                        <Text style={{ fontSize: 15, color: '#3F4A55', flex: 1, lineHeight: 1.35 }}>注册页加载时逐位随机拼出九位数字，前面加 AE/NG 前缀</Text>
                    </Box>
                    {[
                        { k: '登录页', v: '校验会员 ID 格式，不合法直接提示' },
                        { k: '账户页', v: '输入框限长并按同规则判断' },
                        { k: '推荐参数', v: '捕获链接参数时只接受合规会员 ID' },
                    ].map(function (it, i) {
                        return (
                            <Box key={i} style={{ flexDirection: 'row', gap: 10, alignItems: 'center', background: '#FFFFFF', borderRadius: 6, padding: '9px 12px' }}>
                                <Text style={{ fontSize: 15, color: '#202259', fontFamily: 'Menlo, ui-monospace, monospace', width: 62 }}>{it.k}</Text>
                                <Text style={{ fontSize: 15, color: '#3F4A55', flex: 1, lineHeight: 1.35 }}>{it.v}</Text>
                            </Box>
                        );
                    })}
                </Box>
            </Box>

            <Box style={{ flex: 1, background: 'rgba(242,135,183,0.14)', border: '2px solid #F287B7', borderRadius: 10, padding: '16px 18px', flexDirection: 'column' }}>
                <Box style={{ flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                    <FAIcon name='exclamation-triangle' style={{ fill: '#B3528A', width: 20, height: 20 }} />
                    <Text style={{ fontSize: 19, fontWeight: 'bold', color: '#7A2F5C' }}>推荐人字段的默认值</Text>
                </Box>
                <Text style={{ fontSize: 16, color: '#4A3040', lineHeight: 1.55 }}>
                    如果客户不是通过推荐链接进来的，推荐人字段会被预填成一个**写死的会员 ID**：<span style={{ fontFamily: 'Menlo, ui-monospace, monospace', fontWeight: 'bold' }}>NG000000001</span>。
                </Text>
                <Text style={{ fontSize: 16, color: '#4A3040', lineHeight: 1.55, marginTop: 9 }}>
                    提交时只要推荐人不等于新会员自己，就会记账。所以——**每次没有带链接的注册，都会给这个 ID 记一笔推荐 BV。**
                </Text>
                <Text style={{ fontSize: 15, color: '#7A2F5C', lineHeight: 1.5, marginTop: 'auto', paddingTop: 10 }}>
                    这条务必要提前说清，否则被问到"为什么这个账号一直有奖金"会解释不清。
                </Text>
            </Box>
        </Box>
    </Box>

    {/* ===== C 区 ===== */}
    <Box style={{ height: 40, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
            <Box style={{ width: 10, height: 10, background: '#202259', borderRadius: 2 }} />
            <Text style={{ fontSize: 14, color: '#5C646A', letterSpacing: 0.3 }}>AQUALIFE · 三条下单路径讲解</Text>
        </Box>
        <Text style={{ fontSize: 14, color: '#5C646A', letterSpacing: 0.3 }}>12 / 31</Text>
    </Box>
</Slide>
