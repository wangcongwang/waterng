<Slide style={{ width: 1280, height: 720, padding: '20px 60px', fontFamily: 'Inter, PingFang SC, Helvetica Neue, sans-serif', background: '#FFFFFF' }}>
    {/* ===== A 区 ===== */}
    <Box style={{ height: 100, flexDirection: 'column', justifyContent: 'flex-start' }}>
        <Text style={{ fontSize: 34, fontWeight: 'bold', color: '#202259', lineHeight: 1.3 }}>访客下单后的三个真相</Text>
        <Text style={{ fontSize: 16, color: '#5C646A', lineHeight: 1.4, marginTop: 6 }}>
            订单能查、能分享，但它不是账户资产
        </Text>
    </Box>

    {/* ===== B 区（非对称双栏） ===== */}
    <Box style={{ height: 540, flexDirection: 'row', gap: 24 }}>
        {/* 左：为什么必须讲清 */}
        <Box style={{ width: 392, background: '#202259', borderRadius: 10, padding: '26px 24px', flexDirection: 'column' }}>
            <Text style={{ fontSize: 15, color: '#7FD3EC', letterSpacing: 2, fontWeight: 'bold' }}>WHY IT MATTERS</Text>
            <Text style={{ fontSize: 30, fontWeight: 'bold', color: '#FFFFFF', lineHeight: 1.22, marginTop: 12 }}>
                为什么这三条
                <br />
                必须讲清
            </Text>
            <Text style={{ fontSize: 17, color: '#B9C6E4', lineHeight: 1.6, marginTop: 16 }}>
                负责人很容易把"访客能下单"理解成"访客也有账户"。一旦这个理解传下去，后面关于订单查不到、奖金没涨的疑问就会源源不断。
            </Text>

            <Box style={{ marginTop: 'auto', paddingTop: 18, borderTop: '1px solid rgba(127,211,236,0.3)' }}>
                <Text style={{ fontSize: 16, color: '#CFE9F4', lineHeight: 1.55 }}>
                    目前没有"访客订单认领"机制 —— 没有按邮箱或手机号把访客单并进新账户的逻辑。如果业务需要这个转化闭环，它是一个待排期的产品缺口。
                </Text>
            </Box>
        </Box>

        {/* 右：三个真相 */}
        <Box style={{ flex: 1, flexDirection: 'column', gap: 14 }}>
            {[
                { n: '真相一', t: '订单查得到，但进不了账户', d: '下单落地页和订单详情页都不需要登录，凭订单号加本机浏览器就能打开。详情页里会员 ID 一栏会显示 Not registered，订单类型标成 My order。', c: '#202259', icon: 'search' },
                { n: '真相二', t: '一进账户页，访客订单会被剔除删除', d: '账户页加载时会先做一次清理：把所有归属字段为空的订单从订单列表里删掉。而注册成功后的跳转目标正好也是账户页 —— 所以"先访客下单、再注册"这个顺序下，那张访客单会在注册完成的瞬间被静默删除。', c: '#F287B7', icon: 'trash-alt' },
                { n: '真相三', t: '奖金一分都不会进访客自己的账户', d: '会员奖金的计算只认"归属字段等于我自己"的订单。访客订单的 BV 只会出现在推荐人的奖金里，在对方卡片上显示为 From referrals 那一行。', c: '#2AA7CF', icon: 'coins' },
            ].map(function (it, i) {
                return (
                    <Box key={i} style={{ flex: 1, flexDirection: 'row', gap: 16, alignItems: 'flex-start', background: '#F4F6F8', borderLeft: '5px solid ' + it.c, borderRadius: 10, padding: '16px 18px' }}>
                        <Box style={{ width: 44, height: 44, borderRadius: 22, background: it.c, justifyContent: 'center', alignItems: 'center' }}>
                            <FAIcon name={it.icon} style={{ fill: '#FFFFFF', width: 20, height: 20 }} />
                        </Box>
                        <Box style={{ flex: 1, flexDirection: 'column' }}>
                            <Box style={{ flexDirection: 'row', alignItems: 'baseline', gap: 10 }}>
                                <Text style={{ fontSize: 14, fontWeight: 'bold', color: it.c, letterSpacing: 1 }}>{it.n}</Text>
                            </Box>
                            <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#202259', lineHeight: 1.3, marginTop: 3 }}>{it.t}</Text>
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
        <Text style={{ fontSize: 14, color: '#5C646A', letterSpacing: 0.3 }}>09 / 31</Text>
    </Box>
</Slide>
