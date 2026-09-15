<Slide style={{ width: 1280, height: 720, padding: '20px 60px', fontFamily: 'Inter, PingFang SC, Helvetica Neue, sans-serif', background: '#FFFFFF' }}>
    {/* ===== A 区 ===== */}
    <Box style={{ height: 100, flexDirection: 'column', justifyContent: 'flex-start' }}>
        <Text style={{ fontSize: 34, fontWeight: 'bold', color: '#202259', lineHeight: 1.3 }}>提交即下单，并自动登录</Text>
        <Text style={{ fontSize: 16, color: '#5C646A', lineHeight: 1.4, marginTop: 6 }}>
            客户以为在注册，其实订单已经生效了 —— 注册和首购是同一个动作
        </Text>
    </Box>

    {/* ===== B 区（左标题 + 右内容） ===== */}
    <Box style={{ height: 540, flexDirection: 'row', gap: 24 }}>
        {/* 左标题栏 */}
        <Box style={{ width: 340, background: '#202259', borderRadius: 10, padding: '26px 24px', flexDirection: 'column' }}>
            <Text style={{ fontSize: 15, color: '#7FD3EC', letterSpacing: 2, fontWeight: 'bold' }}>SUBMIT</Text>
            <Text style={{ fontSize: 32, fontWeight: 'bold', color: '#FFFFFF', lineHeight: 1.2, marginTop: 12 }}>
                点下 Save
                <br />
                那一刻
            </Text>
            <Text style={{ fontSize: 17, color: '#B9C6E4', lineHeight: 1.6, marginTop: 16 }}>
                这一次点击同时完成五件事：建账户、写购物车、生成订单、记推荐返佣、然后自动登录。客户不需要再去登录页走一遍。
            </Text>

            <Box style={{ marginTop: 'auto', paddingTop: 18, borderTop: '1px solid rgba(127,211,236,0.3)' }}>
                <Box style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                    <FAIcon name='hourglass-half' style={{ fill: '#7FD3EC', width: 20, height: 20 }} />
                    <Text style={{ fontSize: 16, color: '#CFE9F4', lineHeight: 1.45 }}>
                        按钮变成倒计时，三秒后自动进入我的账户页
                    </Text>
                </Box>
            </Box>
        </Box>

        {/* 右侧五处写入 */}
        <Box style={{ flex: 1, flexDirection: 'column', gap: 10 }}>
            {[
                { k: 'al.auth.user', t: '写登录态', d: '把整份表单数据写进本地登录态，同时广播一次登录状态变化 —— 页面头部立刻从"登录"变成会员头像和退出按钮。', c: '#202259' },
                { k: 'al.cart', t: '重建购物车', d: '先清空购物车，再把刚才勾选的商品逐条写进去。注册完直接进结算页，看到的正好是这批货。', c: '#202259' },
                { k: 'al.orders', t: '生成订单', d: '订单状态是 completed，归属人用的是刚刚生成的会员 ID —— 这就是这笔单能在账户里看到的原因。', c: '#2AA7CF' },
                { k: 'al.bvCredits', t: '写推荐返佣', d: '推荐人有效且不是本人时，往 BV 台账记一条流水。这是推荐关系第一次真正产生价值。', c: '#F287B7' },
                { k: '跳转', t: '倒计时进账户页', d: '按钮文案变成"Redirecting in 3s"并逐秒递减，归零后进入我的账户页。', c: '#859EB3' },
            ].map(function (it, i) {
                return (
                    <Box key={i} style={{ flex: 1, flexDirection: 'row', gap: 16, alignItems: 'center', background: '#F4F6F8', borderRadius: 8, padding: '0 18px', borderLeft: '4px solid ' + it.c }}>
                        <Box style={{ width: 128, flexDirection: 'column' }}>
                            <Text style={{ fontSize: 15, color: '#202259', fontFamily: 'Menlo, ui-monospace, monospace' }}>{it.k}</Text>
                            <Text style={{ fontSize: 14, color: '#5C646A', marginTop: 2 }}>{it.t}</Text>
                        </Box>
                        <Text style={{ fontSize: 16, color: '#3F4A55', flex: 1, lineHeight: 1.45 }}>{it.d}</Text>
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
        <Text style={{ fontSize: 14, color: '#5C646A', letterSpacing: 0.3 }}>13 / 31</Text>
    </Box>
</Slide>
