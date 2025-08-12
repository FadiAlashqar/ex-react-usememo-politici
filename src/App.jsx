import { useState, useEffect } from 'react'


function App() {

  const [politicians, setPoliticians] = useState([]);
  const [query, setQuery] = useState('');
  const [specificPolitician, setSpecificPolitician] = useState([])

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

  const showSpecificPolitician = (element) => {
    const person = politicians.filter((p) => {
      return p.name.toLowerCase().includes(query.trim().toLowerCase()) || p.biography.toLowerCase().includes(query.trim().toLowerCase())

    })
    setSpecificPolitician(person)
    setQuery('')
  }

  useEffect(() => {
    showCards()
  }, [])

  console.log(politicians)
  console.log(specificPolitician)

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-12 d-flex justify-content-center">
            <h1 onClick={() => { setSpecificPolitician([]) }}>Politicians</h1>
          </div>
        </div>
        <div className="row">
          <div className="col-12 d-flex justify-content-center">
            <input type="text"
              placeholder='Search politician...'
              value={query}
              onChange={(e) => { setQuery(e.target.value) }} />
            <button onClick={() => { showSpecificPolitician(query) }}>Search</button>
          </div>
        </div>
        <div className="card-container d-flex flex-wrap p-2n justify-content-center">
          {specificPolitician?.length > 0 ? specificPolitician.map((s) => {
            return <div key={s.id} className="card">
              <div className="card-img-top">
                <img className='img-fluid' src={s.image

                } />
              </div>
              <div className="card-body">
                <div className="card-title">
                  <h3>{s.name}</h3>
                </div>
                <div className="card-text">
                  <p><strong>Position:  </strong>{s.position
                  }</p>
                  <p><strong>Biography:  </strong>{s.biography
                  }</p>
                </div>
              </div>
            </div>
          }) : politicians.map((politician) => {
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
