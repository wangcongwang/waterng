<Slide style={{ width: 1280, height: 720, padding: '20px 60px', fontFamily: 'Inter, PingFang SC, Helvetica Neue, sans-serif', background: '#FFFFFF' }}>
    {/* ===== A 区 标题块 ===== */}
    <Box style={{ height: 100, flexDirection: 'column', justifyContent: 'flex-start' }}>
        <Text style={{ fontSize: 34, fontWeight: 'bold', color: '#202259', lineHeight: 1.3 }}>注册：一页七个分区</Text>
        <Text style={{ fontSize: 16, color: '#5C646A', lineHeight: 1.4, marginTop: 6 }}>
            不是分步向导，是单页长表单；必填项比看上去少得多
        </Text>
    </Box>

    {/* ===== B 区 内容区（左大图 + 右侧文字） ===== */}
    <Box style={{ height: 540, flexDirection: 'row', gap: 24 }}>
        {/* 左侧：七分区结构 */}
        <Box style={{ flex: 1, flexDirection: 'column' }}>
            <Text style={{ fontSize: 19, fontWeight: 'bold', color: '#202259', marginBottom: 10 }}>
                从上到下的七个区块
            </Text>
            <Box style={{ flex: 1, flexDirection: 'column', gap: 7 }}>
                {[
                    { n: '1', t: 'Basic Information', f: 'Country · Language · Member ID（只读）· Order Level · Reporting Center ID' },
                    { n: '2', t: 'Products', f: '12 个商品可勾选与设数量，至少选 1 件才放行' },
                    { n: '3', t: 'Network Information', f: 'Referrer ID · Actual Referrer ID，两个都会被自动预填' },
                    { n: '4', t: 'Personal Information', f: '会员名 · 手机 · 邮箱 · 登录密码 · 支付密码 · 收货人 · 收货人电话' },
                    { n: '5', t: 'Delivery Method', f: 'Door Delivery（默认）或 Pickup 二选一' },
                    { n: '6', t: 'Address Details', f: '州 · 城市 · 详细地址 · 区域，全部选填；选 Pickup 时整块隐藏' },
                    { n: '7', t: 'Payment Method', f: 'COD（默认）/ Card / USSD / Bank transfer 四选一' },
                ].map(function (it, i) {
                    return (
                        <Box key={i} style={{ flex: 1, flexDirection: 'row', gap: 14, alignItems: 'center', background: '#F4F6F8', borderRadius: 8, padding: '0 16px' }}>
                            <Box style={{ width: 30, height: 30, borderRadius: 15, background: '#202259', justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={{ fontSize: 15, fontWeight: 'bold', color: '#FFFFFF' }}>{it.n}</Text>
                            </Box>
                            <Text style={{ fontSize: 17, fontWeight: 'bold', color: '#202259', width: 190 }}>{it.t}</Text>
                            <Text style={{ fontSize: 15, color: '#3F4A55', flex: 1, lineHeight: 1.35 }}>{it.f}</Text>
                        </Box>
                    );
                })}
            </Box>
        </Box>

        {/* 右侧：必填项与说明 */}
        <Box style={{ width: 386, flexDirection: 'column', gap: 14 }}>
            <Box style={{ flex: 1, background: '#202259', borderRadius: 10, padding: '20px 22px', flexDirection: 'column' }}>
                <Text style={{ fontSize: 15, color: '#7FD3EC', letterSpacing: 2, fontWeight: 'bold' }}>REQUIRED</Text>
                <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#FFFFFF', marginTop: 8 }}>
                    真实必填只有 8 项
                </Text>
                <Box style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 16 }}>
                    {['Reporting Center ID', 'Order Level', '会员名', '手机', '邮箱', '登录密码', '支付密码', '至少 1 件商品'].map(function (t, i) {
                        return (
                            <Box key={i} style={{ padding: '6px 12px', background: 'rgba(42,167,207,0.18)', border: '1px solid rgba(127,211,236,0.4)', borderRadius: 6 }}>
                                <Text style={{ fontSize: 15, color: '#D6E2F5' }}>{t}</Text>
                            </Box>
                        );
                    })}
                </Box>
                <Text style={{ fontSize: 16, color: '#B9C6E4', lineHeight: 1.5, marginTop: 'auto', paddingTop: 14 }}>
                    整张表单关掉了浏览器原生校验，所有检查都由脚本完成，包括提交失败时自动聚焦到第一个出错字段。
                </Text>
            </Box>

            <Box style={{ background: 'rgba(242,135,183,0.14)', borderRadius: 10, padding: '16px 18px', flexDirection: 'column', gap: 8 }}>
                <Box style={{ flexDirection: 'row', alignItems: 'center', gap: 9 }}>
                    <FAIcon name='exclamation-circle' style={{ fill: '#B3528A', width: 18, height: 18 }} />
                    <Text style={{ fontSize: 17, fontWeight: 'bold', color: '#7A2F5C' }}>两个容易讲漏的点</Text>
                </Box>
                <Text style={{ fontSize: 16, color: '#5C3A4D', lineHeight: 1.5 }}>
                    一是注册页没有条款勾选框，也没有验证码环节；二是密码只校验长度不少于 6 位，没有复杂度要求，也没有二次确认。
                </Text>
            </Box>
        </Box>
    </Box>

    {/* ===== C 区 页脚 ===== */}
    <Box style={{ height: 40, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
            <Box style={{ width: 10, height: 10, background: '#202259', borderRadius: 2 }} />
            <Text style={{ fontSize: 14, color: '#5C646A', letterSpacing: 0.3 }}>AQUALIFE · 前端系统功能讲解</Text>
        </Box>
        <Text style={{ fontSize: 14, color: '#5C646A', letterSpacing: 0.3 }}>15 / 25</Text>
    </Box>
</Slide>
