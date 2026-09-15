<Slide style={{ width: 1280, height: 720, padding: '20px 60px', fontFamily: 'Inter, PingFang SC, Helvetica Neue, sans-serif', background: '#FFFFFF' }}>
    {/* ===== A 区 标题块 ===== */}
    <Box style={{ height: 100, flexDirection: 'column', justifyContent: 'flex-start' }}>
        <Text style={{ fontSize: 34, fontWeight: 'bold', color: '#202259', lineHeight: 1.3 }}>Member ID：NG + 8 位数字</Text>
        <Text style={{ fontSize: 16, color: '#5C646A', lineHeight: 1.4, marginTop: 6 }}>
            系统生成、字段只读，校验只发生在另外三个地方
        </Text>
    </Box>

    {/* ===== B 区 内容区（巨型数字 + 洞察） ===== */}
    <Box style={{ height: 540, flexDirection: 'column', gap: 20 }}>
        {/* 巨型 ID */}
        <Box style={{ height: 226, background: '#202259', borderRadius: 10, padding: '0 34px', flexDirection: 'row', alignItems: 'center', gap: 30 }}>
            <Text style={{ fontSize: 92, fontWeight: 'bold', color: '#FFFFFF', lineHeight: 1, letterSpacing: -3, fontFamily: 'Menlo, ui-monospace, monospace' }}>
                NG12345678
            </Text>
            <Box style={{ flexDirection: 'column', flex: 1 }}>
                <Box style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                    <Box style={{ padding: '4px 12px', background: '#F287B7', borderRadius: 4 }}>
                        <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#FFFFFF' }}>共 10 位</Text>
                    </Box>
                    <Text style={{ fontSize: 17, color: '#7FD3EC' }}>NG 前缀 + 8 位数字</Text>
                </Box>
                <Text style={{ fontSize: 17, color: '#B9C6E4', lineHeight: 1.55, marginTop: 12 }}>
                    注册页一加载，脚本就生成好并填进这个输入框。它是
                    <span style={{ color: '#FFFFFF', fontWeight: 'bold' }}>只读字段</span>
                    ，注册页本身不做任何 ID 校验 —— 校验发生在登录页、账户页和推荐链接三处。
                </Text>
            </Box>
        </Box>

        {/* 生成与校验 */}
        <Box style={{ flex: 1, flexDirection: 'row', gap: 16 }}>
            <Box style={{ flex: 1, background: '#F4F6F8', borderRadius: 10, padding: '16px 18px', flexDirection: 'column' }}>
                <Box style={{ flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                    <FAIcon name='cog' style={{ fill: '#2AA7CF', width: 20, height: 20 }} />
                    <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#202259' }}>在哪生成</Text>
                </Box>
                <Text style={{ fontSize: 16, color: '#3F4A55', lineHeight: 1.5, flex: 1 }}>
                    注册页加载时调用商品目录里的生成方法，逐位取 0–9 的随机数拼出 8 位，拼上前缀返回。代码里还写了一条兜底：取不到该方法时，改用 1 到 8 位区间内的随机整数补足。
                </Text>
                <Box style={{ marginTop: 10, padding: '10px 12px', background: '#FFFFFF', borderRadius: 6, borderLeft: '3px solid #2AA7CF' }}>
                    <Text style={{ fontSize: 15, color: '#5C646A', lineHeight: 1.45 }}>
                        另外，已登录但档案里缺 ID 时，系统会即时补生成一个并写回登录态。
                    </Text>
                </Box>
            </Box>

            <Box style={{ flex: 1, background: '#F4F6F8', borderRadius: 10, padding: '16px 18px', flexDirection: 'column' }}>
                <Box style={{ flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                    <FAIcon name='shield' style={{ fill: '#F287B7', width: 20, height: 20 }} />
                    <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#202259' }}>在哪校验</Text>
                </Box>
                <Box style={{ flex: 1, flexDirection: 'column', gap: 9 }}>
                    {[
                        { k: 'login.html', v: '登录时校验会员 ID 格式，不合法直接提示' },
                        { k: 'account.html', v: '账户页输入框限长 10 位并按同规则判断' },
                        { k: 'website.js', v: '捕获 ?ref= 推荐参数时，只接受合规的会员 ID' },
                    ].map(function (it, i) {
                        return (
                            <Box key={i} style={{ flexDirection: 'row', gap: 10, alignItems: 'center', background: '#FFFFFF', borderRadius: 6, padding: '9px 12px' }}>
                                <Text style={{ fontSize: 15, color: '#202259', fontFamily: 'Menlo, ui-monospace, monospace', width: 100 }}>{it.k}</Text>
                                <Text style={{ fontSize: 15, color: '#3F4A55', flex: 1, lineHeight: 1.35 }}>{it.v}</Text>
                            </Box>
                        );
                    })}
                </Box>
                <Box style={{ marginTop: 10, padding: '10px 12px', background: 'rgba(242,135,183,0.14)', borderRadius: 6 }}>
                    <Text style={{ fontSize: 15, color: '#7A2F5C', lineHeight: 1.45 }}>
                        三处用的是同一条规则，格式统一，不会出现两套标准。
                    </Text>
                </Box>
            </Box>
        </Box>
    </Box>

    {/* ===== C 区 页脚 ===== */}
    <Box style={{ height: 40, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
            <Box style={{ width: 10, height: 10, background: '#202259', borderRadius: 2 }} />
            <Text style={{ fontSize: 14, color: '#5C646A', letterSpacing: 0.3 }}>AQUALIFE · 前端系统功能讲解</Text>
        </Box>
        <Text style={{ fontSize: 14, color: '#5C646A', letterSpacing: 0.3 }}>16 / 25</Text>
    </Box>
</Slide>
