<Slide style={{ width: 1280, height: 720, padding: '20px 60px', fontFamily: 'Inter, PingFang SC, Helvetica Neue, sans-serif', background: '#FFFFFF' }}>
    {/* ===== A 区 标题块 ===== */}
    <Box style={{ height: 100, flexDirection: 'column', justifyContent: 'flex-start' }}>
        <Text style={{ fontSize: 34, fontWeight: 'bold', color: '#202259', lineHeight: 1.3 }}>提交之后：自动登录与推荐关系</Text>
        <Text style={{ fontSize: 16, color: '#5C646A', lineHeight: 1.4, marginTop: 6 }}>
            注册即登录，不需要再走一遍登录页
        </Text>
    </Box>

    {/* ===== B 区 内容区（非对称双栏 58:42） ===== */}
    <Box style={{ height: 540, flexDirection: 'row', gap: 24 }}>
        {/* 左栏：写入清单 */}
        <Box style={{ flex: 1, flexDirection: 'column' }}>
            <Text style={{ fontSize: 19, fontWeight: 'bold', color: '#202259', marginBottom: 12 }}>
                点下 Save 之后，一共动了五处
            </Text>
            <Box style={{ flex: 1, flexDirection: 'column', gap: 9 }}>
                {[
                    { k: 'al.auth.user', t: '写入登录态', d: '整份表单数据直接写进登录记录并广播登录状态变化，页面头部立刻切成已登录样子。', c: '#202259' },
                    { k: 'al.cart', t: '同步购物车', d: '先清空再逐条写入所选商品与数量，所以注册完直接进结算页就是刚选的那批货。', c: '#2AA7CF' },
                    { k: 'al.orders', t: '追加一条订单', d: '生成一条状态为 completed 的订单，含商品明细、金额、BV、地址与支付方式。', c: '#2AA7CF' },
                    { k: 'al.bvCredits', t: '记推荐返佣', d: '当推荐人有效且不等于本人时，往 BV 台账写一条返佣流水 —— 这是推荐关系第一次真正产生价值。', c: '#F287B7' },
                    { k: 'account.html', t: '倒计时跳转', d: '按钮文字变成 Redirecting in 3s 并逐秒递减，三秒后进入我的账户页。', c: '#202259' },
                ].map(function (it, i) {
                    return (
                        <Box key={i} style={{ flex: 1, flexDirection: 'row', gap: 14, alignItems: 'center', background: '#F4F6F8', borderRadius: 8, padding: '0 16px', borderLeft: '4px solid ' + it.c }}>
                            <Text style={{ fontSize: 15, color: it.c, fontFamily: 'Menlo, ui-monospace, monospace', width: 116 }}>{it.k}</Text>
                            <Box style={{ flex: 1, flexDirection: 'column' }}>
                                <Text style={{ fontSize: 17, fontWeight: 'bold', color: '#202259' }}>{it.t}</Text>
                                <Text style={{ fontSize: 15, color: '#3F4A55', lineHeight: 1.4, marginTop: 2 }}>{it.d}</Text>
                            </Box>
                        </Box>
                    );
                })}
            </Box>
        </Box>

        {/* 右栏：登录链 */}
        <Box style={{ width: 440, flexDirection: 'column', gap: 14 }}>
            <Box style={{ background: '#202259', borderRadius: 10, padding: '20px 22px', flexDirection: 'column' }}>
                <Text style={{ fontSize: 15, color: '#7FD3EC', letterSpacing: 2, fontWeight: 'bold' }}>SIGN IN</Text>
                <Text style={{ fontSize: 22, fontWeight: 'bold', color: '#FFFFFF', marginTop: 8, lineHeight: 1.3 }}>
                    登录只有一种方式：会员 ID + 密码
                </Text>
                <Box style={{ flexDirection: 'column', gap: 8, marginTop: 16 }}>
                    {[
                        '会员 ID 非空，且符合 NG 加 8 位数字',
                        '密码非空，且长度不少于 6 位',
                        '不比对任何已保存的账号或密码',
                        '成功后跳 ?next= 指定页，否则回首页',
                    ].map(function (t, i) {
                        return (
                            <Box key={i} style={{ flexDirection: 'row', gap: 10, alignItems: 'center' }}>
                                <Text style={{ fontSize: 15, color: '#7FD3EC', fontFamily: 'Menlo, ui-monospace, monospace' }}>{'0' + (i + 1)}</Text>
                                <Text style={{ fontSize: 16, color: '#D6E2F5', lineHeight: 1.4, flex: 1 }}>{t}</Text>
                            </Box>
                        );
                    })}
                </Box>
            </Box>

            <Box style={{ flex: 1, background: 'rgba(242,135,183,0.14)', borderRadius: 10, padding: '16px 18px', flexDirection: 'column' }}>
                <Box style={{ flexDirection: 'row', alignItems: 'center', gap: 9, marginBottom: 10 }}>
                    <FAIcon name='exclamation-circle' style={{ fill: '#B3528A', width: 18, height: 18 }} />
                    <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#7A2F5C' }}>演示时要提前说明</Text>
                </Box>
                <Box style={{ flexDirection: 'column', gap: 9, flex: 1 }}>
                    <Text style={{ fontSize: 16, color: '#5C3A4D', lineHeight: 1.5 }}>
                        登录页只要格式对就能进，任何合规的会员 ID 加六位以上密码都算成功 —— 这是演示版的设定，没有真实鉴权。
                    </Text>
                    <Text style={{ fontSize: 16, color: '#5C3A4D', lineHeight: 1.5 }}>
                        页面上的 Remember me 勾选和 Forgot password 链接目前都没有接逻辑，点了不会有反应。
                    </Text>
                </Box>
                <Box style={{ marginTop: 12, padding: '10px 12px', background: '#FFFFFF', borderRadius: 6 }}>
                    <Text style={{ fontSize: 15, color: '#5C646A', lineHeight: 1.45 }}>
                        演示账号已预填：会员 ID 为 <span style={{ fontFamily: 'Menlo, ui-monospace, monospace', color: '#7A2F5C' }}>NG09246375</span>，密码六位。
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
        <Text style={{ fontSize: 14, color: '#5C646A', letterSpacing: 0.3 }}>17 / 25</Text>
    </Box>
</Slide>
