<Slide style={{ width: 1280, height: 720, padding: '20px 60px', fontFamily: 'Inter, PingFang SC, Helvetica Neue, sans-serif', background: '#FFFFFF' }}>
    {/* ===== A 区 ===== */}
    <Box style={{ height: 100, flexDirection: 'column', justifyContent: 'flex-start' }}>
        <Text style={{ fontSize: 34, fontWeight: 'bold', color: '#202259', lineHeight: 1.3 }}>访客态下看不到什么</Text>
        <Text style={{ fontSize: 16, color: '#5C646A', lineHeight: 1.4, marginTop: 6 }}>
            四处被隐藏或禁用，全部集中在"与账户有关"的功能上
        </Text>
    </Box>

    {/* ===== B 区（左大图 + 右侧文字） ===== */}
    <Box style={{ height: 540, flexDirection: 'row', gap: 24 }}>
        {/* 左：四处清单 */}
        <Box style={{ width: 720, flexDirection: 'column', gap: 13 }}>
            {[
                { n: '1', t: '已保存地址选择器整块隐藏', d: '连带里面的"保存此地址到我的账户"勾选框一起消失，因为两者在同一个容器里。', tag: 'display: none' },
                { n: '2', t: '结算摘要的 BV rewards 整行不渲染', d: '访客看不到"本单可得多少 BV"这一行。这是三条路径在结算页最直观的差别。', tag: '条件渲染' },
                { n: '3', t: 'Account Balance 付款方式被禁用', d: '余额取值依赖登录态，访客取到 0，该选项的 radio 直接置灰，默认选中逻辑也会跳过它。注意卡片和金额文案仍在，只是不可选。', tag: 'radio disabled' },
                { n: '4', t: '下单不会把地址回写账户', d: '"保存地址"这个动作对访客直接返回，不会写入地址簿。所以访客下次下单还要重填一遍。', tag: '静默 return' },
            ].map(function (it, i) {
                return (
                    <Box key={i} style={{ flex: 1, flexDirection: 'row', gap: 16, alignItems: 'center', background: '#F4F6F8', borderRadius: 10, padding: '0 18px' }}>
                        <Box style={{ width: 40, height: 40, borderRadius: 20, background: '#202259', justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#FFFFFF' }}>{it.n}</Text>
                        </Box>
                        <Box style={{ flex: 1, flexDirection: 'column' }}>
                            <Text style={{ fontSize: 19, fontWeight: 'bold', color: '#202259', lineHeight: 1.3 }}>{it.t}</Text>
                            <Text style={{ fontSize: 16, color: '#3F4A55', lineHeight: 1.45, marginTop: 4 }}>{it.d}</Text>
                        </Box>
                        <Box style={{ padding: '3px 10px', background: '#FFFFFF', border: '1px solid #E3E6E8', borderRadius: 4 }}>
                            <Text style={{ fontSize: 13, color: '#5C646A', fontFamily: 'Menlo, ui-monospace, monospace' }}>{it.tag}</Text>
                        </Box>
                    </Box>
                );
            })}
        </Box>

        {/* 右：反向不一致 + 提示 */}
        <Box style={{ flex: 1, flexDirection: 'column', gap: 14 }}>
            <Box style={{ background: 'rgba(242,135,183,0.14)', borderLeft: '4px solid #F287B7', borderRadius: 8, padding: '18px 18px', flex: 1 }}>
                <Box style={{ flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                    <FAIcon name='exclamation-circle' style={{ fill: '#B3528A', width: 20, height: 20 }} />
                    <Text style={{ fontSize: 19, fontWeight: 'bold', color: '#7A2F5C' }}>一处反向不一致</Text>
                </Box>
                <Text style={{ fontSize: 16, color: '#4A3040', lineHeight: 1.6 }}>
                    商品详情页的"Earn N BV with this purchase"徽标是**无条件显示**的，代码注释里甚至写着"反正下单要登录"，这跟"访客可下单"的实际行为对不上。
                </Text>
                <Text style={{ fontSize: 16, color: '#4A3040', lineHeight: 1.6, marginTop: 10 }}>
                    更麻烦的是口径：详情页是拿价格现算的，商品列表页读的是商品数据里的字段。同一件商品，在两个页面可能显示不同的 BV 数。
                </Text>
            </Box>

            <Box style={{ background: '#202259', borderRadius: 8, padding: '16px 18px', flexDirection: 'column' }}>
                <Text style={{ fontSize: 17, color: '#CFE9F4', lineHeight: 1.55 }}>
                    上面四处都在展示层，不影响访客把单下完。真正需要讲清的是下一件事 —— 这笔订单算谁的。
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
        <Text style={{ fontSize: 14, color: '#5C646A', letterSpacing: 0.3 }}>07 / 31</Text>
    </Box>
</Slide>
