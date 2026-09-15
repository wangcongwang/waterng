<Slide style={{ width: 1280, height: 720, padding: '20px 60px', fontFamily: 'Inter, PingFang SC, Helvetica Neue, sans-serif', background: '#FFFFFF' }}>
    {/* ===== A 区 ===== */}
    <Box style={{ height: 100, flexDirection: 'column', justifyContent: 'flex-start' }}>
        <Text style={{ fontSize: 34, fontWeight: 'bold', color: '#202259', lineHeight: 1.3 }}>今天的讲解路线</Text>
        <Text style={{ fontSize: 16, color: '#5C646A', lineHeight: 1.4, marginTop: 6 }}>
            按客户实际会走的三种路径来讲，最后落到同一个账户
        </Text>
    </Box>

    {/* ===== B 区 ===== */}
    <Box style={{ height: 540, flexDirection: 'row', gap: 26 }}>
        {/* 左侧标题栏 */}
        <Box style={{ width: 330, background: '#202259', borderRadius: 10, padding: '26px 24px', flexDirection: 'column', justifyContent: 'space-between' }}>
            <Box style={{ flexDirection: 'column' }}>
                <Text style={{ fontSize: 15, color: '#7FD3EC', letterSpacing: 2.2, fontWeight: 'bold' }}>AGENDA</Text>
                <Text style={{ fontSize: 38, fontWeight: 'bold', color: '#FFFFFF', lineHeight: 1.15, marginTop: 14 }}>
                    三条路径
                    <br />
                    一个落点
                </Text>
                <Text style={{ fontSize: 17, color: '#B9C6E4', lineHeight: 1.6, marginTop: 18 }}>
                    差别不在怎么点鼠标，而在于下单那一刻"有没有会员身份"。这一点决定了订单归谁、奖金给谁、账户里看不看得到。
                </Text>
            </Box>
            <Box style={{ flexDirection: 'row', alignItems: 'center', gap: 10, paddingTop: 16, borderTop: '1px solid rgba(127,211,236,0.3)', marginTop: 'auto' }}>
                <FAIcon name='layer-group' style={{ fill: '#7FD3EC', width: 18, height: 18 }} />
                <Text style={{ fontSize: 15, color: '#B9C6E4' }}>建议节奏：三个路径各 10 分钟</Text>
            </Box>
        </Box>

        {/* 右侧四板块 */}
        <Box style={{ flex: 1, flexDirection: 'column', gap: 12 }}>
            {[
                { no: '01', c: '#202259', t: '路径一 · 没有账号直接下单', en: 'Guest checkout', d: '访客能走多远？订单算谁的？奖金给了谁？这一章有三个反直觉的答案，也是今天最需要提前对齐的部分。' },
                { no: '02', c: '#2AA7CF', t: '路径二 · 注册账户去购买', en: 'Signup then buy', d: '注册表单里就带选品和支付，点下 Save 的那一刻订单已经生成。要讲清这笔订单和奖金怎么落进新账户。' },
                { no: '03', c: '#F287B7', t: '路径三 · 已有账户去购买', en: 'Member checkout', d: '先登录再下单。要讲清登录解锁了哪几项能力，以及同一笔单在账户里长什么样、和路径二有什么不同。' },
                { no: '04', c: '#202259', t: '共用下单界面与账户落点', en: 'Shared flow & account', d: '不管走哪条路径，选品、配送、支付、下单这套动作是一样的；最后都落到账户里的订单列表和奖金数字上。' },
            ].map(function (it, i) {
                return (
                    <Box key={i} style={{ flex: 1, flexDirection: 'row', gap: 16, padding: '14px 18px', background: '#F4F6F8', borderLeft: '4px solid ' + it.c, borderRadius: 8, alignItems: 'center' }}>
                        <Box style={{ width: 46, height: 46, background: it.c, borderRadius: 8, justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ fontSize: 19, fontWeight: 'bold', color: '#FFFFFF' }}>{it.no}</Text>
                        </Box>
                        <Box style={{ flex: 1, flexDirection: 'column' }}>
                            <Box style={{ flexDirection: 'row', alignItems: 'baseline', gap: 10 }}>
                                <Text style={{ fontSize: 21, fontWeight: 'bold', color: '#202259' }}>{it.t}</Text>
                                <Text style={{ fontSize: 14, color: '#859EB3', letterSpacing: 0.6 }}>{it.en}</Text>
                            </Box>
                            <Text style={{ fontSize: 16, color: '#3F4A55', lineHeight: 1.5, marginTop: 5 }}>{it.d}</Text>
                        </Box>
                    </Box>
                );
            })}
        </Box>
    </Box>

    {/* ===== C 区 ===== */}
    <Box style={{ height: 40, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
            <Box style={{ width: 10, height: 10, background: '#202259', borderRadius: 2 }} />
            <Text style={{ fontSize: 14, color: '#5C646A', letterSpacing: 0.3 }}>AQUALIFE · 三条下单路径讲解</Text>
        </Box>
        <Text style={{ fontSize: 14, color: '#5C646A', letterSpacing: 0.3 }}>02 / 31</Text>
    </Box>
</Slide>
