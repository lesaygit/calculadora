document.addEventListener('DOMContentLoaded',()=>{
       //vars
       const btnCalcular = document.getElementById('calcular');
       const btnBorrar = document.getElementById('borrar');

       //events
       btnCalcular.addEventListener('click',()=>{
        //alert('clic calcular')
         const entradaDinero = parseFloat(document.getElementById('entrada').value) || 0;
         const gastoCombustible = parseFloat(document.getElementById('gasto').value) || 0;
         const precioCombustible = parseFloat(document.querySelector('input[name="tipo"]:checked').value) || 0;
         
         //call funtion update IU.
         updateReport(entradaDinero,gastoCombustible,precioCombustible);
       });

       btnBorrar.addEventListener('click',()=>{
        //call funtion clear all UI.
        clearUI();
       });

       function updateReport(e,g,p){
        const calcGasto=g*p;
        if (e<calcGasto) {
          alert('el gasto de dinero en combustible no puede ser mayor al ingreso diario, sorry. YGO dev');
          clearUI();
          return;
        }
        const dineroSinComb=e-calcGasto;
        const salario=dineroSinComb*0.2;
        let restSPs = dineroSinComb - salario - 500;
        let sf = (e - salario) - 500;
        //update dom
        document.getElementById('reportEntrada').textContent = e.toFixed(2);
        document.getElementById('reportDiesel').textContent = calcGasto.toFixed(2);
        document.getElementById('reportRestoSaldo').textContent = dineroSinComb.toFixed(2);
        document.getElementById('repoSalario').textContent = salario.toFixed(2);
        document.getElementById('repoRestoSsp').textContent = restSPs.toFixed(2);
        //document.getElementById('neto').textContent = neto.toFixed(2);
        document.getElementById('saldoFinal').textContent = sf.toFixed(2);

     
       };

       function clearUI(){
        //inputs
        document.getElementById('entrada').value = '';
        document.getElementById('gasto').value = '';
        //reports
        document.getElementById('reportEntrada').textContent ="";
        document.getElementById('reportDiesel').textContent ="";
        document.getElementById('reportRestoSaldo').textContent ="";
        document.getElementById('repoSalario').textContent ="";
        document.getElementById('repoRestoSsp').textContent ="";
        //document.getElementById('neto').textContent = neto.toFixed(2);
        document.getElementById('saldoFinal').textContent ="";

       }

});