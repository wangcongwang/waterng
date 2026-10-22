<Slide style={{ width: 1280, height: 720, padding: '20px 60px', fontFamily: 'Inter, PingFang SC, Helvetica Neue, sans-serif', background: '#FFFFFF' }}>
    {/* ===== A 区 ===== */}
    <Box style={{ height: 100, flexDirection: 'column', justifyContent: 'flex-start' }}>
        <Text style={{ fontSize: 34, fontWeight: 'bold', color: '#202259', lineHeight: 1.3 }}>我的账户：四个 Tab</Text>
        <Text style={{ fontSize: 16, color: '#5C646A', lineHeight: 1.4, marginTop: 6 }}>
            三条路径最终都指向这里 —— 但只有两条能在这里看到自己的订单
        </Text>
    </Box>

    {/* ===== B 区（巨型数字 + 洞察） ===== */}
    <Box style={{ height: 540, flexDirection: 'row', gap: 24 }}>
        {/* 左：巨型数字 + 四个 Tab */}
        <Box style={{ width: 724, flexDirection: 'column', gap: 16 }}>
            <Box style={{ height: 128, background: '#202259', borderRadius: 10, padding: '0 26px', flexDirection: 'row', alignItems: 'center', gap: 20 }}>
                <Text style={{ fontSize: 86, fontWeight: 'bold', color: '#FFFFFF', lineHeight: 1, letterSpacing: -4, fontFamily: 'Menlo, ui-monospace, monospace' }}>4</Text>
                <Box style={{ flexDirection: 'column' }}>
                    <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#7FD3EC' }}>个 Tab</Text>
                    <Text style={{ fontSize: 16, color: '#B9C6E4', lineHeight: 1.45, marginTop: 6 }}>
                        顶部固定显示会员 ID，右上角是退出登录。页面用 URL 锚点决定默认打开哪个 Tab。
                    </Text>
                </Box>
            </Box>

            <Box style={{ flex: 1, flexDirection: 'column', gap: 8 }}>
                {[
                    { n: 'Overview 总览', c: '#2AA7CF', d: '奖金与 Ecoin 两张 KPI 卡、九宫格九个功能入口、推荐链接与推荐返佣列表' },
                    { n: 'Orders 订单', c: '#202259', d: '我的订单与会员订单两段，表格含 BV 与税额，每张单可导出为文档' },
                    { n: 'Profile 资料', c: '#F287B7', d: '六张卡：基础信息、个人信息、登录密码、支付密码、收货地址、通知偏好' },
                    { n: 'Sponsor Network', c: '#859EB3', d: '两种模式，按顶层会员与展开深度查询下级网络树，节点显示等级与个人业绩' },
                ].map(function (it, i) {
                    return (
                        <Box key={i} style={{ flex: 1, flexDirection: 'row', alignItems: 'center', gap: 16, background: '#F4F6F8', borderRadius: 8, padding: '0 18px', borderLeft: '5px solid ' + it.c }}>
                            <Text style={{ fontSize: 19, fontWeight: 'bold', color: '#202259', width: 196 }}>{it.n}</Text>
                            <Text style={{ fontSize: 16, color: '#3F4A55', flex: 1, lineHeight: 1.45 }}>{it.d}</Text>
                        </Box>
                    );
                })}
            </Box>
        </Box>

        {/* 右：说明 */}
        <Box style={{ flex: 1, flexDirection: 'column', gap: 14 }}>
            <Box style={{ background: 'rgba(32,34,89,0.06)', borderRadius: 10, padding: '18px 20px', flexDirection: 'column', flex: 1 }}>
                <Text style={{ fontSize: 19, fontWeight: 'bold', color: '#202259', marginBottom: 12 }}>进账户页的前提</Text>
                <Text style={{ fontSize: 16, color: '#3F4A55', lineHeight: 1.6 }}>
                    这是全站唯一有登录守卫的页面。未登录访问会被强制跳到登录页，并带上回跳参数；登录成功后自动回到账户页。
                </Text>
                <Text style={{ fontSize: 16, color: '#3F4A55', lineHeight: 1.6, marginTop: 12 }}>
                    也就是说 —— <span style={{ fontWeight: 'bold', color: '#202259' }}>路径一的客户永远走不到这个页面</span>，他既没有账号，也没有订单落在这里。
                </Text>
                <Box style={{ marginTop: 'auto', paddingTop: 14, borderTop: '1px solid #E3E6E8' }}>
                    <Text style={{ fontSize: 15, color: '#5C646A', lineHeight: 1.5 }}>
                        演示账号已经预填在登录页：会员 ID NG092463750。
                    </Text>
                </Box>
            </Box>

            <Box style={{ background: '#202259', borderRadius: 8, padding: '15px 18px' }}>
                <Text style={{ fontSize: 16, color: '#D6E2F5', lineHeight: 1.5 }}>
                    九宫格里除了订单和推荐网络，还挂着复购、欢迎包、代客复购、自动维护、会员升级、往期奖金、团队查询、历史累计奖金、充值与转账。
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
        <Text style={{ fontSize: 14, color: '#5C646A', letterSpacing: 0.3 }}>25 / 31</Text>
    </Box>
</Slide>
