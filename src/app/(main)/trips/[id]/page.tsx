interface TripPageProps {
  params: {
    id: string
  }
}

export default function TripPage({ params }: TripPageProps) {
  return (
    <div>
      <h1>Trip {params.id}</h1>
    </div>
  )
}
