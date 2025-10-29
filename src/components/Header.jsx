const Header = () => {
    return (
        <header className="text-center py-6 border-b border-gray-100 bg-white">
            <h1 className="text-2xl font-semibold text-gray-800 flex items-center justify-center gap-2">
                <i className="fa-solid fa-right-left text-indigo-500"></i>
                Currency Converter
            </h1>
            <p className="text-gray-500 text-sm mt-1">Real-time exchange rates</p>
        </header>
    )
}

export default Header;