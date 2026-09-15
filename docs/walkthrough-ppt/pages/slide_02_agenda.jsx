<Slide style={{ width: 1280, height: 720, padding: '20px 60px', fontFamily: 'Inter, PingFang SC, Helvetica Neue, sans-serif', background: '#FFFFFF' }}>
    {/* ===== A 区 标题块 ===== */}
    <Box style={{ height: 100, flexDirection: 'column', justifyContent: 'flex-start' }}>
        <Text style={{ fontSize: 34, fontWeight: 'bold', color: '#202259', lineHeight: 1.3 }}>今天讲什么</Text>
        <Text style={{ fontSize: 16, color: '#5C646A', lineHeight: 1.4, marginTop: 6 }}>
            三个章节 + 一条演示动线，每一章都对应客户侧的一段真实操作
        </Text>
    </Box>

    {/* ===== B 区 内容区 ===== */}
    <Box style={{ height: 540, flexDirection: 'row', gap: 28 }}>
        {/* 左侧窄标题栏 */}
        <Box style={{ width: 330, background: '#202259', borderRadius: 10, padding: '28px 26px', flexDirection: 'column', justifyContent: 'space-between' }}>
            <Box style={{ flexDirection: 'column' }}>
                <Text style={{ fontSize: 15, color: '#7FD3EC', letterSpacing: 2.2, fontWeight: 'bold' }}>AGENDA</Text>
                <Text style={{ fontSize: 40, fontWeight: 'bold', color: '#FFFFFF', lineHeight: 1.15, marginTop: 14 }}>
                    讲解
                    <br />
                    路线图
                </Text>
                <Text style={{ fontSize: 17, color: '#B9C6E4', lineHeight: 1.6, marginTop: 18 }}>
                    不讲概念、只讲实现。每一条结论都能在页面上点出来，讲完你可以自己复现一遍。
                </Text>
            </Box>
            <Box style={{ flexDirection: 'row', alignItems: 'center', gap: 10, marginTop: 'auto', paddingTop: 18, borderTop: '1px solid rgba(127,211,236,0.3)' }}>
                <FAIcon name='clock' style={{ fill: '#7FD3EC', width: 18, height: 18 }} />
                <Text style={{ fontSize: 15, color: '#B9C6E4' }}>建议节奏：每章 15 分钟 + 现场演示</Text>
            </Box>
        </Box>

        {/* 右侧条目列表 */}
        <Box style={{ flex: 1, flexDirection: 'column', gap: 14 }}>
            {[
                {
                    no: '01',
                    cn: '下单流程',
                    en: 'Order flow',
                    pages: 'P05 – P13',
                    desc: '从商品页加购一路走到订单落库：六个环节、三格步骤条、五种支付方式，以及最容易被讲错的 BV 归属规则。这一章决定客户能不能顺利把单下下来。',
                },
                {
                    no: '02',
                    cn: '会员注册与登录',
                    en: 'Signup & sign-in',
                    pages: 'P14 – P17',
                    desc: '一页七分区的注册长表单、Member ID 的产生与校验位置、推荐关系是怎么绑上的。这一章决定会员是从哪条路径进来的。',
                },
                {
                    no: '03',
                    cn: '我的账户与奖金后台',
                    en: 'Account & bonus',
                    pages: 'P18 – P24',
                    desc: '账户四个 Tab、奖金双 KPI 的计算口径、九类奖金的周期表、Bonus 与 Ecoin 的资金闭环，以及五条会员业务线。这一章是会员进来之后做什么。',
                },
                {
                    no: '04',
                    cn: '现场演示动线',
                    en: 'Live demo',
                    pages: 'P24',
                    desc: '从注册到奖金看板的完整点击顺序，以及演示前必须做的两项准备，避免现场数据串台。',
                },
            ].map(function (it, i) {
                return (
                    <Box key={i} style={{ flexDirection: 'row', gap: 16, padding: '14px 18px', background: '#F4F6F8', borderLeft: '4px solid ' + (i === 3 ? '#F287B7' : '#2AA7CF'), borderRadius: 8, alignItems: 'flex-start' }}>
                        <Box style={{ width: 46, height: 46, background: i === 3 ? '#F287B7' : '#202259', borderRadius: 8, justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#FFFFFF' }}>{it.no}</Text>
                        </Box>
                        <Box style={{ flex: 1, flexDirection: 'column' }}>
                            <Box style={{ flexDirection: 'row', alignItems: 'baseline', gap: 10 }}>
                                <Text style={{ fontSize: 21, fontWeight: 'bold', color: '#202259' }}>{it.cn}</Text>
                                <Text style={{ fontSize: 14, color: '#859EB3', letterSpacing: 0.6 }}>{it.en}</Text>
                                <Text style={{ fontSize: 14, color: '#2AA7CF', fontFamily: 'Menlo, monospace', marginLeft: 'auto' }}>{it.pages}</Text>
                            </Box>
                            <Text style={{ fontSize: 17, color: '#3F4A55', lineHeight: 1.5, marginTop: 5 }}>{it.desc}</Text>
                        </Box>
                    </Box>
                );
            })}
        </Box>
    </Box>

    {/* ===== C 区 页脚 ===== */}
    <Box style={{ height: 40, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
            <Box style={{ width: 10, height: 10, background: '#202259', borderRadius: 2 }} />
            <Text style={{ fontSize: 14, color: '#5C646A', letterSpacing: 0.3 }}>AQUALIFE · 前端系统功能讲解</Text>
        </Box>
        <Text style={{ fontSize: 14, color: '#5C646A', letterSpacing: 0.3 }}>02 / 25</Text>
    </Box>
</Slide>
