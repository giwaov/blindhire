'use client'
import React from 'react'
import { useReadContract } from 'wagmi'
import { BLINDHIRE_ABI, BLINDHIRE_ADDRESS } from '@/lib/abi'
import Link from 'next/link'

export default function RoleCard({ roleId }: { roleId: number }) {
    const { data: role } = useReadContract({
        address: BLINDHIRE_ADDRESS,
        abi: BLINDHIRE_ABI,
        functionName: 'roles',
        args: [BigInt(roleId)],
    })

    const employer = role ? (role as any)[0] as string : null
    const active = role ? (role as any)[3] as boolean : true

    return (
        <Link href={`/candidate?roleId=${roleId}`} className="block group">
            <div className="relative rounded-2xl overflow-hidden border border-white/10 cursor-pointer transition-transform duration-200 group-hover:scale-[1.02]"
                style={{
                    backgroundImage: 'url(/card-base-blindhire.png)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    aspectRatio: '3/4',
                    maxWidth: '260px',
                }}>
                <div className="absolute inset-0 bg-black/30" />

                <div className="relative h-full p-5 flex flex-col justify-between">
                    <div className="flex items-start justify-between">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 160" width="32" height="32">
                            <rect width="160" height="160" rx="16" fill="#ffffff15"/>
                            <path d="M20 80 Q80 32 140 80 Q80 128 20 80Z" fill="none" stroke="#ffffff" strokeWidth="4" strokeLinejoin="round"/>
                            <circle cx="80" cy="80" r="16" fill="none" stroke="#ffffff" strokeWidth="4"/>
                            <circle cx="80" cy="80" r="6" fill="#ffffff"/>
                            <line x1="44" y1="112" x2="116" y2="112" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" opacity="0.45"/>
                            <line x1="52" y1="124" x2="108" y2="124" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" opacity="0.25"/>
                        </svg>
                        <span className={`font-mono text-xs px-2 py-1 rounded-full border ${active ? 'border-white/20 text-white/50' : 'border-red-500/30 text-red-400/60'}`}>
                            {active ? 'active' : 'closed'}
                        </span>
                    </div>

                    <div className="space-y-4">
                        <div>
                            <p className="font-mono text-xs text-white/30 uppercase tracking-widest mb-1">Role</p>
                            <p className="font-mono text-3xl font-bold text-white">#{roleId}</p>
                        </div>
                        <div className="space-y-3">
                            <div>
                                <p className="font-mono text-xs text-white/30 uppercase tracking-widest mb-0.5">Employer</p>
                                <p className="font-mono text-xs text-white/70">
                                    {employer ? `${employer.slice(0, 6)}...${employer.slice(-4)}` : '···'}
                                </p>
                            </div>
                            <div>
                                <p className="font-mono text-xs text-white/30 uppercase tracking-widest mb-0.5">Requirements</p>
                                <p className="font-mono text-xs text-white/70">⬛⬛⬛ encrypted</p>
                            </div>
                        </div>
                        <div className="flex items-center justify-between pt-3 border-t border-white/10">
                            <p className="font-mono text-xs text-white/20">FHEVM · Sepolia</p>
                            <p className="font-mono text-xs text-white/40 group-hover:text-white/80 transition-colors">Apply →</p>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    )
}
