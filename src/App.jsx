import { useState, useEffect } from 'react'


function App() {

  const [politicians, setPoliticians] = useState([]);

  async function getObj(url) {
    const res = await fetch(url);
    const obj = await res.json();
    return obj
  }

  const showCards = () => {
    return (async () => {
      const p = await getObj('http://localhost:3333/politicians')
      setPoliticians(p)
    })();
  }

  useEffect(() => {
    showCards()
  }, [])

  console.log(politicians)

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-12 d-flex justify-content-center">
            <h1>Politicians</h1>
          </div>
        </div>
        <div className="card-container d-flex flex-wrap p-2n justify-content-center">
          {politicians.map((politician) => {
            return <div key={politician.id} className="card">
              <div className="card-img-top">
                <img className='img-fluid' src={politician.image

                } />
              </div>
              <div className="card-body">
                <div className="card-title">
                  <h3>{politician.name}</h3>
                </div>
                <div className="card-text">
                  <p><strong>Position:  </strong>{politician.position
                  }</p>
                  <p><strong>Biography:  </strong>{politician.biography
                  }</p>
                </div>
              </div>
            </div>
          })}
        </div>
      </div>
    </>
  )
}

export default App
