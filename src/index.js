import ReactDOM from 'react-dom/client'

import App from './App'
import './index.css'
import { CommonProvider } from './api/CommonContext'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
    <CommonProvider>
        <App />
    </CommonProvider>
)
