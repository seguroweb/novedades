export const WelcomeCard = ({ userName }) => (
  <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg p-6 text-white dark:from-blue-700 dark:to-blue-800">
    <h2 className="text-2xl font-bold">Bienvenido, {userName}</h2>
    <p className="mt-2 opacity-90">Aquí tienes un resumen de tu actividad reciente.</p>
  </div>
)