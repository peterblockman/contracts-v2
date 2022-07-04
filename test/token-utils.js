async function expectBalances(env, balances)
{
	for (let name in balances)
		for (let token in balances[name])
			expect(await env[token].balanceOf(env[name].address), `${name} ${token} balance`).to.eq(balances[name][token] + "")
}
async function mintAll(env, balances)
{
	for (let name in balances)
		for (let token in balances[name])
			await env.mint[token](env[name].address, balances[name][token])

	return balances
}
async function approveMany(env, balances)
{
	for (let name in balances)
		for (let token in balances[name])
			await env[token].connect(env[name]).approve(env.dex.address, balances[name][token])
	
	return balances
}

module.exports = {
	expectBalances,
	mintAll,
	approveMany,
}