import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { useEffect, useMemo, useState } from "react";
import axios from 'axios';
import './Home.css'
import billetera from '../images/billetera.png'
const Home = () => {

	const [btc, setBtc] = useState(0);
	const [clp, setClp] = useState(0);
	const [chartData, setChartData] = useState(0);
	const [price, setPrice] = useState(0);
	const [buyQty, setBuyQty] = useState("");
	const [sellQty, setSellQty] = useState("");
	const render = useMemo(() => <LineChart
	width={1800}
	height={500}
	data={chartData}
	margin={{
	  top: 10,
	  right: 50,
	  left: 50,
	  bottom: 10,
	}}
  >
	<CartesianGrid strokeDasharray="3 3" />
	<XAxis dataKey="timestamp" />
	<YAxis />
	<Tooltip />
	<Legend />
	<Line type="monotone" dataKey="price" stroke="#ffbd59" activeDot={{ r: 8 }}/>
  </LineChart>, [chartData])

	useEffect(() => {
		async function getChart(){
			const token = localStorage.getItem('token')
			console.log(token)
			const {data} = await axios.get('http://localhost:8000/chart')
			const {data : priceData} = await axios.get('http://localhost:8000/price')
			console.log(priceData)
			setPrice(priceData.bitcoin.clp)
			setChartData(data.prices.map(e => ({timestamp: e[0], price: e[1]})))
			const {data : walletData} = await axios.get('http://localhost:8000/wallet',{
				headers: {'Authorization': `Bearer ${token}`}
			})
			setBtc(walletData.balance_btc);
			setClp(walletData.balance_clp);
		}
		getChart()
	},[])

	const buyBtc = async () => {
		const token = localStorage.getItem('token')
		const response = await axios.post('http://localhost:8000/buy/' + buyQty, {}, {
		headers: {
		'Authorization': `Bearer ${token}`
		}
		})
		setBtc(response.data.balance_btc)
		setClp(response.data.balance_clp)
		alert('Operación realizada con exito');
	}

	const sellBtc = async () => {
		const token = localStorage.getItem('token')
		const response = await axios.post('http://localhost:8000/sell/' + sellQty, {}, {
		headers: {
		'Authorization': `Bearer ${token}`
		}
		})
		setBtc(response.data.balance_btc)
		setClp(response.data.balance_clp)
		alert('Operación realizada con exito');
	}

	return (
	<>
		<div><h1>Gráfica del Precio de Bitcoin</h1></div>
		
		<div>{render}</div>

		<div className='home-container'>
			<img src={billetera} className="billetera"/>
			<h2>Billetera</h2>
			<p>Saldo total: ${parseFloat((btc*price + clp).toFixed(0))}</p>
			<p>Tienes {btc} BTC (${parseFloat((btc*price).toFixed(0))})</p>
			<p>Tienes ${clp} CLP</p>
		<div className='home-inputs'>
			<p>COMPRAR BTC: <input value={buyQty} onChange={e => setBuyQty(e.target.value)} className='input' placeholder='BTC a comprar'/> 
			<button className='input' disabled={parseFloat((price*buyQty).toFixed(0)) > clp} onClick={buyBtc}>Comprar (-${parseFloat((price*buyQty).toFixed(0))})</button></p>
			<p>VENDER BTC: <input value={sellQty} onChange={e => setSellQty(e.target.value)} className='input' placeholder='BTC a vender'/> 
			<button className='input' disabled={sellQty > btc} onClick={sellBtc}>Vender (+${parseFloat((price*sellQty).toFixed(0))})</button></p>
			<p>PUEDES COMPRAR {parseFloat((clp/price).toFixed(8))} BTC</p>
		</div>
		</div>
	</>
		
	);
};

export default Home;
